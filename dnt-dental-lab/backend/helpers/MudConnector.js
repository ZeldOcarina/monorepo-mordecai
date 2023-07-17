const axios = require("axios");
const url = require('url');

/* *************
* MudConnector *
* **************/

class MudConnector {
    constructor({ handshakeKey, clientId, clientName, lead }) {
        this.endpointUrl = "https://mud.dentalgameplan.com/marketing/handlejekyllappointment";
        this.HandshakeKey = handshakeKey;
        this.client_id = clientId;
        this.client_name = clientName;
        this.lead = lead;
        this.createUrlEncodedString();
    }

    createUrlEncodedString() {
        this.params = new url.URLSearchParams({
            formdata: 1,
            HandshakeKey: this.HandshakeKey,
            client_id: this.client_id,
            client_name: this.client_name,
            inputName: `${this.lead.first_name} ${this.lead.last_name}`,
            inputEmail: this.lead.email,
            inputPhone: this.lead.phone_number,
            selectService: this.lead.service,
            message: this.lead.message,
            checkReceiveOffer: this.lead.privacy_accepted ? "Yes" : "No"
        });
    }

    async connectLeadWithMud() {
        const axiosInstance = axios({
            url: this.endpointUrl,
            method: "POST",
            data: this.params,
        });

        return axiosInstance;
    }
}

module.exports = MudConnector