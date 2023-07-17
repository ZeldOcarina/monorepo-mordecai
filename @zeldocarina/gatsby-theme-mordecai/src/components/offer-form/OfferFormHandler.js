import { PhoneNumberUtil } from "google-libphonenumber";
import axios from "axios";

export default class FormHandler {
    constructor({ formData, isContactForm, utm_source, utm_medium, utm_campaign, utm_term, utm_content, utm_id }) {
        this.isContactForm = isContactForm;
        this.formData = formData;
        this.utm_source = utm_source;
        this.utm_medium = utm_medium;
        this.utm_campaign = utm_campaign;
        this.utm_term = utm_term;
        this.utm_content = utm_content;
        this.utm_id = utm_id;
        this.errors = {};
    }

    validateForm() {
        // CHECK THERE IS NO MISSING REQUIRED INPUTS
        if (!this.formData.first_name.value) this.errors = { ...this.errors, first_name: "First name is required" };
        if (!this.formData.last_name.value) this.errors = { ...this.errors, last_name: "Last name is required" };
        if (!this.formData.email.value) this.errors = { ...this.errors, email: "Email is required" };
        if (!this.formData.phone_number.value) this.errors = { ...this.errors, phone_number: "Phone number is required" };
        if (!this.formData.service.value) this.errors = { ...this.errors, service: "Please select what service you are interested in." };

        // CHECK EMAIL IS VALID
        if (this.formData.email.value && !this.validateEmail(this.formData.email.value)) this.errors = { ...this.errors, email: "Please enter a valid email" };

        // CHECK PHONE IS VALID
        if (this.formData.phone_number.value && !this.validatePhone(this.formData.phone_number)) this.errors = { ...this.errors, phone_number: "Please enter a valid phone number" };

        return this.errors;
    }

    validateEmail(email) {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    }

    validatePhone(phone) {
        const phoneUtil = PhoneNumberUtil.getInstance();
        const parsedPhoneNumber = phoneUtil.parse(phone.value, phone.country_code ? phone.country_code.toUpperCase() : "US");
        const isPhoneValid = phoneUtil.isValidNumber(parsedPhoneNumber);

        return isPhoneValid;
    }

    async submitForm(data) {
        const webhookData = {};

        for (const [key, value] of Object.entries(data)) {
            webhookData[key] = value.value;
        }

        webhookData.dental_offer = true;
        webhookData.utm_source = this.utm_source;
        webhookData.utm_medium = this.utm_medium;
        webhookData.utm_campaign = this.utm_campaign;
        webhookData.utm_term = this.utm_term;
        webhookData.utm_content = this.utm_content;
        webhookData.utm_id = this.utm_id;

        const formEndpoint = process.env.NODE_ENV === "production" ? process.env.GATSBY_OFFER_FORM_PRODUCTION_ENDPOINT : process.env.GATSBY_OFFER_FORM_DEV_ENDPOINT;

        const response = await axios.post(formEndpoint, webhookData);

        if (response.status === 201) return true;
        throw new Error("Form Submission Failed");
    }
}