import { VercelRequest, VercelResponse } from "@vercel/node"
import submitFormHandler from "@zeldocarina/gatsby-theme-mordecai/src/api/submit-form"

export default async (req: VercelRequest, res: VercelResponse) => {
  req.body.isFreeGift = true
  await submitFormHandler(req, res)
}
