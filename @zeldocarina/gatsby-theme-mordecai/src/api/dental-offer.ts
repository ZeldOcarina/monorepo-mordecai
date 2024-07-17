import type { VercelRequest, VercelResponse } from "@vercel/node"
import * as Sentry from "@sentry/node"

import ILead from "../backend/models/lead-interface"

import { isMongoError } from "../backend/helpers/helpers"

import Lead from "../backend/models/lead"
import sendEmail from "../backend/config/emailConfig"
import leadHtml from "../backend/views/leadEmail"

import { connect } from "../backend/helpers/mongo-connect"

const dentalOfferHandler = async (req: VercelRequest, res: VercelResponse) => {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
  })

  try {
    await connect()

    const lead: ILead = await Lead.create(req.body)

    console.log(lead)
    if (!lead) throw new Error("No lead has been created")

    if (!process.env.FRONT_OFFICE_EMAIL)
      throw new Error("front office email is missing")

    // Check if the email is a mailnator.com address
    const isMailnatorEmail = lead.email.endsWith("mailinator.com")
    if (isMailnatorEmail)
      console.log("Mailnator email detected. Skipping sending email.")

    const servicePromises: Promise<any>[] = []

    if (!isMailnatorEmail) {
      // Send notification on the new lead to the sales team
      const sendEmailPromise = sendEmail({
        to:
          process.env.NODE_ENV === "production"
            ? process.env.FRONT_OFFICE_EMAIL
            : "mattia@monarchy.io",
        cc: [],
        subject: "We have a new dental offer request from the website!",
        text: `Contact request incoming.\n\n${JSON.stringify(req.body)}`,
        html: leadHtml({
          first_name: lead.first_name,
          last_name: lead.last_name,
          email: lead.email,
          phone_number: lead.phone_number,
          service: lead.service,
          offer: true,
        }),
      })
      servicePromises.push(sendEmailPromise)
    }

    await Promise.all(servicePromises)
    console.log("Lead successfully processed")

    // Send successful response
    return res.status(201).send("Lead Successfully Created")
  } catch (err) {
    if (isMongoError(err)) {
      // Check if it's an email error
      if (err.errors.email && err.errors.email.name === "ValidatorError") {
        // Should be "The email provided does not seem to be valid."
        return res.status(400).send(err.errors.email.message)
      }
    }

    console.log("Sending error to Sentry.")
    Sentry.withScope(scope => {
      scope.setLevel("error")
      scope.setExtra("error", err)
      scope.setExtra(
        "error message",
        (err instanceof Error && err.message) || "unknown error",
      )
      scope.setExtra("business", process.env.BUSINESS_NAME)
      scope.setExtra("request body", req.body)
      scope.setExtra("request form", "Dental Offer Form")
      Sentry.captureException(err)
    })
    await Sentry.flush(2000)

    if (err instanceof Error) {
      return res.status(500).send(err.message)
    }

    return res.status(500).send("Internal server error")
  }
}

export default dentalOfferHandler
