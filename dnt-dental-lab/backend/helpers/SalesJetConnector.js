const axios = require("axios");

class SalesJetConnector {
    constructor({ salesJetApiKey, eventName, lead }) {
        this.endpointUrl = "https://sj-api.com/externalapp/track";
        this.salesJetApiKey = salesJetApiKey;
        this.eventName = eventName;
        this.lead = lead;
        this.createWebhook();
    }

    createWebhook() {
        this.webhookData = {
            event_name: this.eventName, // YOUR EVENT NAME GOES HERE,
            contact: {
                email: this.lead.email,
                first_name: this.lead.first_name,
                last_name: this.lead.last_name,
                phone_number: this.lead.phone_number,
                custom_attributes: {
                    "37b5676f-2952-ed11-a9ab-ff1d79b08822": this.lead.message,
                    "0d2f6460-2952-ed11-a9ab-ff1d79b08822": this.lead.service,
                    "08efc766-2952-ed11-a9ab-ff1d79b08822": this.lead.appointment_date,
                    "09efc766-2952-ed11-a9ab-ff1d79b08822": this.lead.appointment_time_period,
                    "688207be-2952-ed11-a9ab-ff1d79b08822": this.lead.utm_campaign,
                    "529977c6-2952-ed11-a9ab-ff1d79b08822": this.lead.utm_content,
                    "fb5188ce-2952-ed11-a9ab-ff1d79b08822": this.lead.utm_id,
                    "db3e2fd7-2952-ed11-a9ab-ff1d79b08822": this.lead.utm_medium,
                    "1af115de-2952-ed11-a9ab-ff1d79b08822": this.lead.utm_source,
                    "69c017e4-2952-ed11-a9ab-ff1d79b08822": this.lead.utm_term,

                }
            }
        };
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
        });

        return axiosPromise;
    }
}

module.exports = SalesJetConnector