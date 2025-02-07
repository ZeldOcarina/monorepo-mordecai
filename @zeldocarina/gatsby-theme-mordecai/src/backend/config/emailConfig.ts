import {
  SESClient,
  SendEmailCommand,
  type SendEmailCommandOutput,
} from "@aws-sdk/client-ses"

// Define the interface for email properties
interface SendEmailProps {
  from: string
  to: string
  cc?: string
  subject: string
  text: string
  html: string
}

if (!process.env.AWS_REGION)
  throw new Error("process.env.AWS_REGION is required")
if (!process.env.AWS_ACCESS_KEY_ID)
  throw new Error("process.env.AWS_ACCESS_KEY_ID is required")
if (!process.env.AWS_SECRET_ACCESS_KEY)
  throw new Error("process.env.AWS_SECRET_ACCESS_KEY is required")

// Initialize the SES client with appropriate configuration
const client = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

/**
 * Sends an email using AWS SES.
 *
 * @param {SendEmailProps} params - The email parameters.
 * @returns {Promise<SendEmailCommandOutput>} - The response from SES.
 * @throws {Error} - If required parameters are missing or SES encounters an error.
 */
export const sendEmail = async function ({
  from,
  to,
  cc,
  subject,
  text,
  html,
}: SendEmailProps): Promise<SendEmailCommandOutput> {
  // Validate the 'from' email address
  if (!from) {
    throw new Error("'from' email address must be provided.")
  }

  // Construct the destination object
  const destination: any = {
    ToAddresses: [to],
  }

  // Include CC addresses if provided
  if (cc) {
    destination.CcAddresses = [cc]
  }

  // Construct the message body
  const message = {
    Subject: {
      Data: subject,
      Charset: "UTF-8",
    },
    Body: {
      Text: {
        Data: text,
        Charset: "UTF-8",
      },
      Html: {
        Data: html,
        Charset: "UTF-8",
      },
    },
  }

  const paramsToSend = {
    Destination: destination,
    Message: message,
    Source: from,
  }

  try {
    const command = new SendEmailCommand(paramsToSend)

    const response = await client.send(command)

    console.info("Email sent successfully:", response)

    return response
  } catch (error) {
    console.error("Error sending email:", error)
    throw error
  }
}
