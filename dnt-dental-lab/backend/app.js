require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Lead = require("./models/lead");
const { sendEmail } = require("./config/emailConfig");
const leadHtml = require("./views/leadEmail");

const SalesJetConnector = require("./helpers/SalesJetConnector");
const MudConnector = require("./helpers/MudConnector");

const app = express();

const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT;
const CorsOriginString = isProduction ? process.env.PRODUCTION_URL : "http://localhost:8000";

app.use(cors({
    origin: CorsOriginString,
}))

app.use(express.json());

app.post("/api/submit-form", async (req, res) => {
    try {
        // Create lead and save it in the database
        const lead = await Lead.create(req.body);

        console.log(lead);

        const servicePromises = [];

        // Send notification on the new lead to the sales team
        const sendEmailPromise = sendEmail({
            to: process.env.FRONT_OFFICE_EMAIL,
            cc: process.env.MONARCHY_RECIPIENT_EMAIL,
            subject: "We have a new appointment request from the website!",
            text: `Contact request incoming.\n\n${JSON.stringify(req.body)}`,
            html: leadHtml(lead)
        });
        servicePromises.push(sendEmailPromise);

        // Connect lead with Sales Jet for marketing purposes
        const salesJetConnector = new SalesJetConnector({
            salesJetApiKey: process.env.SALESJET_API_KEY,
            eventName: process.env.SALESJET_EVENT_NAME,
            lead
        });
        const salesJetConnectorPromise = salesJetConnector.connectLeadWithSalesJet();
        servicePromises.push(salesJetConnectorPromise);

        // Connect lead with the MUD system
        const mudConnector = new MudConnector({
            handshakeKey: process.env.MUD_HANDSHAKE_KEY,
            clientId: process.env.MUD_CLIENT_ID,
            clientName: process.env.MUD_CLIENT_NAME,
            lead: lead
        })

        const mudConnectorPromise = mudConnector.connectLeadWithMud();
        servicePromises.push(mudConnectorPromise);

        try {
            await Promise.all(servicePromises);
            console.log("Email sent successfully");
            console.log("Lead connected with Sales Jet successfully");
            console.log("Lead connected with Mud successfully");
            // Send successful response
            return res.status(201).send("Lead Successfully Created");
        } catch (err) {
            // Send Email to admin if unknown error occurs
            await sendEmail({
                to: "mattia@monarchy.io",
                subject: "One of the services for NU Dentistry Houston failed",
                text: `One of the services for NU Dentistry Houston failed.\n\n${JSON.stringify(err)}`,
            });
            console.error(err);
            return res.status(201).send("Lead Successfully Created");
        }
    } catch (err) {
        console.error(err);
        return res.status(400).send(err.message);
    }
})

app.post("/api/dental-offer", async (req, res) => {
    try {
        const lead = await Lead.create(req.body);

        const servicePromises = [];

        // Send notification on the new lead to the sales team
        const sendEmailPromise = sendEmail({
            to: process.env.FRONT_OFFICE_EMAIL,
            cc: process.env.MONARCHY_RECIPIENT_EMAIL,
            subject: "We have a new dental offer request from the website!",
            text: `Contact request incoming.\n\n${JSON.stringify(req.body)}`,
            html: leadHtml({ first_name: lead.first_name, last_name: lead.last_name, email: lead.email, phone_number: lead.phone_number, service: lead.service, offer: true })
        });
        servicePromises.push(sendEmailPromise);

        // // Connect lead with Sales Jet for marketing purposes
        const salesJetConnector = new SalesJetConnector({
            salesJetApiKey: process.env.SALESJET_API_KEY,
            eventName: process.env.SALESJET_EVENT_NAME,
            lead
        });
        const salesJetConnectorPromise = salesJetConnector.connectLeadWithSalesJet();
        servicePromises.push(salesJetConnectorPromise);

        // Connect lead with the MUD system
        const mudConnector = new MudConnector({
            handshakeKey: process.env.MUD_HANDSHAKE_KEY,
            clientId: process.env.MUD_CLIENT_ID,
            clientName: process.env.MUD_CLIENT_NAME,
            lead: lead
        })
        const mudConnectorPromise = mudConnector.connectLeadWithMud();
        servicePromises.push(mudConnectorPromise);

        try {
            await Promise.all(servicePromises);
            console.log("Email sent successfully");
            console.log("Lead connected with Sales Jet successfully");
            console.log("Lead connected with Mud successfully");
            // Send successful response
            return res.status(201).send("Lead Successfully Created");
        } catch (err) {
            // Send Email to admin if unknown error occurs
            await sendEmail({
                to: process.env.MONARCHY_RECIPIENT_EMAIL,
                subject: `One of the services for ${process.env.BUSINESS_NAME} failed`,
                text: `One of the services for ${process.env.BUSINESS_NAME} failed.\n\n${JSON.stringify(err)}`,
            });
            console.error(err);
            return res.status(201).send("Lead Successfully Created");
        }
    } catch (err) {
        console.error(err);
        res.status(400).send(err.message);
    }
})

mongoose
    .connect(
        `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@adyproduction.5cosb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log("DB Connection successful");
    })
    .catch((err) => {
        console.error(err);
        throw err;
    });

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})