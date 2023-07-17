import axios from "axios";

export const fetchColors = async function (colorString) {
    try {
        // Add Authorization header to axios request
        const response = await axios({
            baseURL: `https://api.airtable.com/v0/appmpLllhoorYYsbn/Config?fields%5B%5D=Value&filterByFormula={Label}="${colorString}"`,
            headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` },
        });
        if (!response.data.records[0].fields.Value.startsWith("#")) {
            throw new Error(`Color ${colorString} not available or malformed`);
        }
        //console.log(response.data.records[0].fields.Value);
        return response.data.records[0].fields.Value;
    } catch (err) {
        console.error(err);
        return false;
    }
}