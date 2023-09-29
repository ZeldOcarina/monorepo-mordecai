import type { VercelRequest, VercelResponse } from "@vercel/node"
import * as Sentry from "@sentry/node"

import ILead from "../backend/models/lead-interface"

import { connect } from "../backend/helpers/mongo-connect"

import axios from "axios"

import Lead from "../backend/models/lead"
import sendEmail from "../backend/config/emailConfig"

import leadHtml from "../backend/views/leadEmail"

import SalesJetConnector from "../backend/helpers/SalesJetConnector"

const submitForm = async (req: VercelRequest, res: VercelResponse) => {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
  })

  try {
    await connect()

    // Create lead and save it in the database
    const lead: ILead = await Lead.create(req.body)

    console.log(lead)
    if (!lead) throw new Error("No lead has been created")

    // Check if the email is a mailnator.com address
    const isMailnatorEmail =
      lead.email.endsWith("mailinator.com") &&
      process.env.NODE_ENV === "production"
    if (isMailnatorEmail)
      console.log("Mailnator email detected. Skipping sending email.")

    const servicePromises: Promise<any>[] = []

    if (!isMailnatorEmail) {
      if (!process.env.FRONT_OFFICE_EMAIL)
        throw new Error("front office email is missing.")

      const sendEmailPromise = sendEmail({
        to:
          process.env.NODE_ENV === "production"
            ? process.env.FRONT_OFFICE_EMAIL
            : "mattia@monarchy.io",
        cc: process.env.MONARCHY_RECIPIENT_EMAIL,
        subject: "We have a new appointment request from the website!",
        text: `Contact request incoming.\n\n${JSON.stringify(req.body)}`,
        html: leadHtml(
          {
            first_name: lead.first_name,
            last_name: lead.last_name,
            email: lead.email,
            phone_number: lead.phone_number,
            service: lead.service,
            message: lead.message,
            offer: false,
            address: lead.address,
            city: lead.city,
            country: lead.country,
            zip_code: lead.zip_code,
            license_number: lead.license_number,
          },
          req.body.isFreeGift,
        ),
      })
      servicePromises.push(sendEmailPromise)
    }

    if (process.env.SALESJET_API_KEY && process.env.SALESJET_EVENT_NAME) {
      const parsedLeadForSalesJet = {
        email: lead.email,
        first_name: lead.first_name,
        last_name: lead.last_name,
        phone_number: lead.phone_number,
        message: lead.message,
        form_conversion: lead.form_conversion,
        current_page: lead.current_page,
        utm_campaign: lead.utm_campaign,
        utm_content: lead.utm_content,
        utm_id: lead.utm_id,
        utm_medium: lead.utm_medium,
        utm_source: lead.utm_source,
        utm_term: lead.utm_term,
      }

      const salesJetConnector = new SalesJetConnector({
        salesJetApiKey: process.env.SALESJET_API_KEY,
        eventName: process.env.SALESJET_EVENT_NAME,
        lead: parsedLeadForSalesJet,
      })

      const salesJetConnectorPromise =
        salesJetConnector.connectLeadWithSalesJet()
      servicePromises.push(salesJetConnectorPromise)
    }

    if (
      process.env.CUSTOM_BOTTOM_FORM_ENDPOINT &&
      process.env.CUSTOM_BOTTOM_FORM_ENDPOINT !== "undefined"
    ) {
      const connectWithZapier = axios.post(
        process.env.CUSTOM_BOTTOM_FORM_ENDPOINT,
        { ...lead, current_page: req.body.current_page },
      )
      servicePromises.push(connectWithZapier)
    }

    await Promise.all(servicePromises)

    return res.status(201).send("Lead Successfully Created")
  } catch (err: unknown) {
    console.error(err)

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
      scope.setExtra("request form", "submit-form.ts")
      Sentry.captureException(err)
    })
    await Sentry.flush(2000)

    if (err instanceof Error) {
      console.error(err)
      // console.error(err.response.body.errors);
      return res.status(500).send(err.message)
    } else {
      res.status(500).send("internal server error")
    }
  } finally {
    // Close the connection
    // await mongoose.disconnect()
  }
}

export default submitForm
