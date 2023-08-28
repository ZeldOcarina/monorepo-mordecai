import ILead from "../models/lead-interface"

import axios from "axios"

interface SalesJetWebhook {
  event_name: string
  contact: {
    email: string
    first_name?: string
    last_name?: string
    phone_number?: string
    custom_attributes: {
      [key: string]: string | number | boolean | undefined
    }
  }
}

interface SalesJetLead {
  email: string
  first_name?: string
  last_name?: string
  phone_number?: string
  [key: string]: string | number | boolean | undefined
}

interface SalesJetConnectorProps {
  salesJetApiKey: string
  eventName: string
  lead: SalesJetLead
}

class SalesJetConnector {
  private endpointUrl: "https://sj-api.com/externalapp/track"
  private salesJetApiKey: string
  private eventName: string
  private lead: SalesJetLead
  private webhookData: SalesJetWebhook

  constructor({ salesJetApiKey, eventName, lead }: SalesJetConnectorProps) {
    this.endpointUrl = "https://sj-api.com/externalapp/track" as const
    this.salesJetApiKey = salesJetApiKey
    this.eventName = eventName
    this.lead = lead
    this.webhookData = {
      event_name: this.eventName, // YOUR EVENT NAME GOES HERE,
      contact: {
        email: this.lead.email,
        first_name: this.lead.first_name,
        last_name: this.lead.last_name,
        phone_number: this.lead.phone_number,
        custom_attributes: {
          message: this.lead.message,
          form_conversion: this.lead.form_conversion,
          current_page: this.lead.current_page,
          utm_campaign: this.lead.utm_campaign,
          utm_content: this.lead.utm_content,
          utm_id: this.lead.utm_id,
          utm_medium: this.lead.utm_medium,
          utm_source: this.lead.utm_source,
          utm_term: this.lead.utm_term,
          dental_offer: this.lead.dental_offer as unknown as string,
          service: this.lead.service,
        },
      },
    }
  }

  async connectLeadWithSalesJet() {
    const axiosPromise = axios({
      url: this.endpointUrl,
      headers: {
        "Content-Type": "application/json",
        Authorization: this.salesJetApiKey,
      },
      method: "POST",
      data: this.webhookData,
    })

    return axiosPromise
  }
}

export default SalesJetConnector
