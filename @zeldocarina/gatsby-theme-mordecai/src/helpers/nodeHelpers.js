const axios = require('axios');
const slugify = require("slugify");

require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`,
})

exports.fetchGatsbyNodeDynamicConfigData = async function ({ reporter, baseId, fields, labelColumnName, labelValue, supposedStartingValue = "", expectedValueName }) {
    try {
        // Add Authorization header to axios request
        const response = await axios({
            baseURL: `https://api.airtable.com/v0/${baseId}/Config?fields%5B%5D=${fields}&filterByFormula={${labelColumnName}}="${labelValue}"`,
            headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` },
        });
        if (response.data.records[0].fields[fields].startsWith(supposedStartingValue)) {
            if (reporter) reporter.info(`Retrieved ${expectedValueName} is ${response.data.records[0].fields[fields]}`);
            return response.data.records[0].fields.Value;
        }
        throw new Error(`${expectedValueName} not available or malformed`);
    } catch (err) {
        console.error(err);
        if (reporter) {
            reporter.panicOnBuild(err.message);
        } else {
            console.error(err.message);
        }
        return false;
    }
};

exports.buildLink = (originalLink, cityState) => {
    // console.log(originalLink);
    // console.log(cityState);
    return originalLink.replaceAll("{{ city-state }}", slugify(cityState.toLowerCase()));
}