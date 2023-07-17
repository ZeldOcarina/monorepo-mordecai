const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
    email: {
        type: String,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
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
    visit_type: String,
    location: String,
    service: String,
    message: String,
    appointment_date: String,
    appointment_time_period: String,
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
    createdAt: Date
});

leadSchema.pre("save", function (next) {
    this.createdAt = new Date();
    next();
});

module.exports = mongoose.model("Lead", leadSchema);