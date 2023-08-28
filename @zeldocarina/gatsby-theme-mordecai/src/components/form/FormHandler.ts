import { PhoneNumberUtil } from "google-libphonenumber"
import axios from "axios"

interface FormItem {
  error: string
  value: string
}

interface ContactFormData {
  first_name: FormItem
  last_name: FormItem
  email: FormItem
  phone_number: { value: string; error: string; country_code: string }
  service: FormItem
}

interface FormHandlerProps {
  formData: ContactFormData
  isContactForm: boolean
  utm_source?: string
  utm_campaign?: string
  utm_medium?: string
  utm_term?: string
  utm_content?: string
  utm_id?: string
}

interface WebhookToBackend {
  first_name: string
  last_name: string
  email: string
  phone_number: string
  service: string
  utm_source?: string
  utm_campaign?: string
  utm_medium?: string
  utm_term?: string
  utm_content?: string
  utm_id?: string
}

export default class FormHandler {
  private formData: ContactFormData
  private utm_source?: string
  private utm_campaign?: string
  private utm_medium?: string
  private utm_term?: string
  private utm_content?: string
  private utm_id?: string
  private errors: {}

  constructor({
    formData,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_term,
    utm_content,
    utm_id,
  }: FormHandlerProps) {
    this.formData = formData
    this.utm_source = utm_source
    this.utm_medium = utm_medium
    this.utm_campaign = utm_campaign
    this.utm_term = utm_term
    this.utm_content = utm_content
    this.utm_id = utm_id
    this.errors = {}
  }

  validateForm() {
    // CHECK THERE IS NO MISSING REQUIRED INPUTS
    if (!this.formData.first_name.value)
      this.errors = { ...this.errors, first_name: "First name is required" }
    if (!this.formData.last_name.value)
      this.errors = { ...this.errors, last_name: "Last name is required" }
    if (!this.formData.email.value)
      this.errors = { ...this.errors, email: "Email is required" }
    if (!this.formData.phone_number.value)
      this.errors = { ...this.errors, phone_number: "Phone number is required" }
    if (!this.formData.service.value)
      this.errors = {
        ...this.errors,
        service: "Please select what service you are interested in.",
      }

    // CHECK EMAIL IS VALID
    if (
      this.formData.email.value &&
      !this.validateEmail(this.formData.email.value)
    )
      this.errors = { ...this.errors, email: "Please enter a valid email" }

    // CHECK PHONE IS VALID
    if (
      this.formData.phone_number.value &&
      !this.validatePhone(this.formData.phone_number)
    )
      this.errors = {
        ...this.errors,
        phone_number: "Please enter a valid phone number",
      }

    return this.errors
  }

  validateEmail(email: string): boolean {
    return !!String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
  }

  validatePhone(phone: ContactFormData["phone_number"]): boolean {
    const phoneUtil = PhoneNumberUtil.getInstance()
    const parsedPhoneNumber = phoneUtil.parse(
      phone.value,
      phone.country_code ? phone.country_code.toUpperCase() : "US",
    )
    const isPhoneValid = phoneUtil.isValidNumber(parsedPhoneNumber)

    return isPhoneValid
  }

  async submitForm(data: ContactFormData) {
    const webhookData: Partial<WebhookToBackend> = {}

    for (const [key, value] of Object.entries(data)) {
      webhookData[
        key as "first_name" | "last_name" | "email" | "phone_number" | "service"
      ] = value.value
    }

    if (!webhookData.first_name) throw new Error("first name is required")
    if (!webhookData.last_name) throw new Error("last name is required")
    if (!webhookData.email) throw new Error("email is required")
    if (!webhookData.phone_number) throw new Error("phone number is required")
    if (!webhookData.service) throw new Error("service is required")

    webhookData.utm_source = this.utm_source
    webhookData.utm_medium = this.utm_medium
    webhookData.utm_campaign = this.utm_campaign
    webhookData.utm_term = this.utm_term
    webhookData.utm_content = this.utm_content
    webhookData.utm_id = this.utm_id

    const completeWebhookData: WebhookToBackend =
      webhookData as WebhookToBackend

    const formEndpoint = "/api/submit-form"

    const response = await axios.post(formEndpoint, completeWebhookData)

    if (response.status === 201) return true
    throw new Error("Form Submission Failed")
  }
}
