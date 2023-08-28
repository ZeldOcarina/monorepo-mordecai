import { Document } from "mongoose"

interface ILead extends Document {
  email: string
  first_name: string
  last_name: string
  dental_offer: {
    type: boolean
    default: false
  }
  address: string
  city: string
  country: string
  zip_code: string
  license_number: string
  visit_type: string
  location: string
  service: string
  message: string
  mud_campaign_id: number
  current_page: string
  form_conversion: string
  phone_number: string
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_term: string
  utm_content: string
  utm_id: string
  privacy_accepted: {
    type: boolean
    required: true
    enum: [true]
    message: string
  }
  createdAt: Date
}

export default ILead
