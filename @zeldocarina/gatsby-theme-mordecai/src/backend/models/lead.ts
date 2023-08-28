import mongoose from "mongoose"
import ILead from "./lead-interface"

const leadSchema = new mongoose.Schema<ILead>({
  email: {
    type: String,
    validate: {
      validator: function (v: string) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)
      },
      message: "The email provided does not seem to be valid.",
    },
  },
  first_name: {
    type: String,
    required: true,
    message: "Please provide your first name",
  },
  last_name: {
    type: String,
    required: true,
    message: "Please provide your last name",
  },
  dental_offer: {
    type: Boolean,
    default: false,
  },
  address: String,
  city: String,
  country: String,
  zip_code: String,
  license_number: String,
  visit_type: String,
  location: String,
  service: String,
  message: String,
  mud_campaign_id: Number,
  current_page: String,
  form_conversion: String,
  phone_number: String,
  utm_source: String,
  utm_medium: String,
  utm_campaign: String,
  utm_term: String,
  utm_content: String,
  utm_id: String,
  privacy_accepted: {
    type: Boolean,
    required: true,
    enum: [true],
    message: "Please accept the privacy policy.",
  },
  createdAt: Date,
})

leadSchema.pre("save", function (next) {
  this.createdAt = new Date()
  next()
})

export default mongoose.model("Lead", leadSchema)
