import sgMail from "@sendgrid/mail"

interface SendEmailProps {
  to: string
  cc?: string
  subject: string
  text: string
  html: string
}

if (!process.env.SENDGRID_API_KEY)
  throw new Error("sendgrid api key is missing")

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = async function ({
  to,
  cc,
  subject,
  text,
  html,
}: SendEmailProps) {
  const msg = {
    to,
    from: process.env.SENDGRID_EMAIL_FROM,
    cc: process.env.NODE_ENV === "production" ? cc : null,
    subject,
    text,
    html,
  }

  // expecting an error as there's an actual bug in the TS from sgMail library.
  // @ts-expect-error
  return sgMail.send(msg)
}

export default sendEmail
