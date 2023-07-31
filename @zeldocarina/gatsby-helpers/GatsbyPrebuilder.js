import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from 'url';
import axios from "axios";
import chalk from 'chalk';
import slugify from "slugify"

import readline from 'node:readline';
// import { changeEnvInVercel } from "./dist/changeVercelEnv.js";

import changeEnvInDoppler from "./dist/changeDopplerEnv.js";
import { DEFAULT_VALUES } from "./constants/constants.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const fsPromises = fs.promises;

class GatsbyPrebuilder {
    constructor(args) {
        this.project = args?.project || "";
        this.config = args?.config || "";
        this.programmaticBusinessName;
        this.siteUrl;

        if (!process.env.AIRTABLE_BASE_ID) {
            console.error(chalk.red("🧨 critical error: ") + "Airtable base id is required. Exiting process...");
            process.exit(1);
        }
    }

    static async askQuestion(question) {
        const answer = await new Promise((resolve) => {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });

            rl.question(question, (answer) => {
                rl.close();
                resolve(answer);
            });
        });

        return answer;
    }

    async prebuild() {
        try {
            console.log(chalk.blue("info ") + "Starting prebuild");
            if (process.env.CI) {
                console.log(chalk.blue("info ") + "Running in CI environment");
            }
            await this.setPrebuildVariables();

            const promises = [this.fetchAirtableTables(), this.replaceGatsbyConfig()];

            if (process.env.NODE_ENV === "production") {
                // Clean up the static folder
                const staticFolderPath = path.join(process.cwd(), "static");
                if (fs.existsSync(staticFolderPath)) {
                    await fsPromises.rm(staticFolderPath, { recursive: true });
                    await fsPromises.mkdir(staticFolderPath);
                } else await fsPromises.mkdir(staticFolderPath);
                promises.push(this.donwloadAndMoveFavicons());
                promises.push(this.fetchAirTableStaticFiles());
                // Check if we are in a ci environment
                promises.push(this.changeEnvData());
                // promises.push(this.createJsonRedirects());
            }

            await Promise.all(promises);
        } catch (error) {
            console.log(chalk.red("error ") + "error prebuilding");
            console.log(error.message);
            console.log(error.stack);
            process.exit(1);
        }
    }

    async setPrebuildVariables() {
        const configPromises = [this.getProgrammaticBusinessName(), this.fetchSiteUrl()];
        const [programmaticBusinessName, siteUrl] = await Promise.all(configPromises);

        this.programmaticBusinessName = programmaticBusinessName;
        this.siteUrl = siteUrl;
    }

    async fetchSiteUrl() {
        try {
            const { fetchGatsbyNodeDynamicConfigData } = await import(`${__dirname}/helpers/nodeHelpers.js`);
            const siteUrl = await fetchGatsbyNodeDynamicConfigData({
                baseId: process.env.AIRTABLE_BASE_ID,
                fields: "Value",
                labelColumnName: "Label",
                labelValue: "Web URL",
                supposedStartingValue: "http",
                expectedValueName: "Site URL",
            });

            console.log(chalk.green("success ") + `Site URL: ${siteUrl}`);

            return siteUrl;
        } catch (err) {
            console.error(err);
            // Exit process with status 1
            process.exit(1);
        }
    }

    async replaceGatsbyConfig() {
        // Change the siteUrl value in gatsby-config.js
        try {
            const gatsbyConfigPath = path.join(process.cwd(), "gatsby-config.mjs");
            const gatsbyConfig = fs.readFileSync(gatsbyConfigPath, "utf8");
            const newGatsbyConfig = gatsbyConfig.replace(/siteUrl: ".*"/, `siteUrl: "${this.siteUrl}"`);
            fs.writeFileSync(gatsbyConfigPath, newGatsbyConfig, "utf8");
        } catch (err) {
            console.log(chalk.red("error ") + "error replacing gatsby-config.js");
            console.log(err.message);
            console.log(err.stack);
            process.exit(1);
        }
    }

    async getProgrammaticBusinessName() {
        // Fetch the Programmatic Business Name from Airtable Config Table
        const response = await axios({
            baseURL: `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Config?fields%5B%5D=Value&filterByFormula={Label}="Programmatic Business Name"`,
            headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` },
        });

        const programmaticBusinessName = response.data.records[0].fields.Value;

        console.log(chalk.green("success ") + `Programmatic Business Name found: ${programmaticBusinessName}`);

        return programmaticBusinessName;
    }

    async fetchAirtableTables() {
        try {
            const response = await axios({
                baseURL: `https://api.airtable.com/v0/meta/bases/${process.env.AIRTABLE_BASE_ID}/tables`,
                headers: { Authorization: `Bearer ${process.env.MATTIA_AIRTABLE_KEY}` },
            });

            const { createMapping } = await import(`${__dirname}/helpers/helpers.js`);

            const tableArray = response.data.tables.map((table) => {
                return ({
                    baseId: process.env.AIRTABLE_BASE_ID,
                    tableName: table.name,
                    mapping: createMapping(table.name),
                    defaultValues: DEFAULT_VALUES
                });
            });

            // Save table array in config/airtable-tables.json
            const airtableTablesPath = path.join(process.cwd(), "config", "airtable-tables.json");
            fs.writeFileSync(airtableTablesPath, JSON.stringify(tableArray), "utf8");
            console.log(chalk.green("success ") + `Airtable tables successfully fetched and saved in airtable-tables.json`);
        } catch (err) {
            console.error(chalk.red("error " + "Error fetching Airtable tables"));
            console.error(err.message);
            console.error(err.stack);
            process.exit(1);
        }
    }

    static async fetchOgImage() {
        try {
            const response = await axios({
                baseURL: `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Config?fields%5B%5D=File&filterByFormula={Label}="ogImage"`,
                headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` },
            });

            const ogImage = response.data.records[0].fields.File[0];

            console.log(chalk.green("success ") + `ogImage: ${ogImage.url}`);

            return ogImage;
        } catch (err) {
            console.error(err);
            // Exit process with status 1
            process.exit(1);
        }
    }

    async fetchAirTableStaticFiles() {
        try {
            const response = await axios({
                baseURL: `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Config?fields%5B%5D=File&filterByFormula={Label}="staticFiles"`,
                headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` },
            });
            const ogImage = await this.constructor.fetchOgImage();

            if ((!response.data.records.length || !response.data.records[0].fields.File) && !ogImage?.id) {
                throw new Error("No static files to download");
            }

            // Move fetched files to the static folder
            const staticFiles = response.data?.records[0]?.fields?.File || [];
            // Add ogImage to staticFiles
            staticFiles.push({
                filename: slugify(ogImage.filename, {
                    replacement: "-",
                    lower: true,
                    trim: true,
                }), url: ogImage.url
            });

            // Check if a static folder exists and create one if it doesn't
            const staticFolderPath = path.join(process.cwd(), "static");
            if (!fs.existsSync(staticFolderPath)) {
                await fsPromises.mkdir(staticFolderPath);
            }

            for (let file of staticFiles) {
                const filePath = path.join(staticFolderPath, file.filename);
                const fileUrl = file.url;

                // Download file from file.url using axios
                const fileResponse = await axios({
                    url: fileUrl,
                    method: "GET",
                    responseType: "stream",
                });

                // Write file to static folder
                await fsPromises.writeFile(filePath, fileResponse.data);
            }
            console.log(chalk.green("success ") + staticFiles.length + " static files successfully fetched and transferred to the static folder");
        } catch (err) {
            if (err.message === "No static files to download") {
                console.log(chalk.yellow("warn ") + "No static files to download");
            } else {
                console.error(chalk.red("error ") + err);
                process.exit(1);
            }
        }
    }

    async donwloadAndMoveFavicons() {
        // Fetch favicon data from Airtable
        const faviconPromise = axios({
            baseURL: `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Config?fields%5B%5D=File&filterByFormula={Label}="Favicon"`,
            headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` },
        });

        const colorSecondaryPromise = axios({
            baseURL: `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Config?fields%5B%5D=Value&filterByFormula={Label}="colorSecondary"`,
            headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` },
        });

        debugger;

        const [faviconResponse, colorSecondaryResponse] = await Promise.all([faviconPromise, colorSecondaryPromise]);

        const rawFaviconUrl = faviconResponse.data.records[0].fields.File[0].url;
        const colorSecondary = colorSecondaryResponse.data.records[0].fields.Value;

        const fetchFaviconImport = await import(`${__dirname}/helpers/fetchFavicon.js`);
        const fetchFavicon = fetchFaviconImport.default;

        const faviconData = await fetchFavicon({ originalFaviconUrl: rawFaviconUrl, colorSecondary: colorSecondary });

        for (let fileUrl of faviconData.favicon_generation_result.favicon.files_urls) {
            const fileResponse = await axios({
                url: fileUrl,
                method: "GET",
                responseType: "stream",
            });

            const filePath = path.join(process.cwd(), "static", fileUrl.split("/").pop());
            await fsPromises.writeFile(filePath, fileResponse.data);
        }
        console.log(chalk.green("success ") + "Favicons successfully downloaded and transferred to the static folder");
    }

    async changeEnvData() {
        try {
            const backendPromises = []
            backendPromises.push(axios({
                baseURL: `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Config?fields%5B%5D=Value&filterByFormula={Label}="Email"`,
                headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` },
            }));
            backendPromises.push(axios({
                baseURL: `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Config?fields%5B%5D=Value&filterByFormula={Label}="Business Name"`,
                headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` },
            }));
            backendPromises.push(axios({
                baseURL: `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Config?fields%5B%5D=Value&filterByFormula={Label}="Web URL"`,
                headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` },
            }));
            backendPromises.push(axios({
                baseURL: `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Config?fields%5B%5D=Value&filterByFormula={Label}="Bottom Form Endpoint"`,
                headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` },
            }));
            backendPromises.push(axios({
                baseURL: `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Config?fields%5B%5D=Value&filterByFormula={Label}="Mud Client ID"`,
                headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` },
            }));
            backendPromises.push(axios({
                baseURL: `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Config?fields%5B%5D=Value&filterByFormula={Label}="Default Mud Campaign ID"`,
                headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` },
            }));
            const responses = await Promise.all(backendPromises);

            const businessEmail = responses[0].data.records[0].fields.Value;
            const businessName = responses[1].data.records[0].fields.Value;
            const webUrl = responses[2].data.records[0].fields.Value;
            const bottomFormEndpoint = responses[3]?.data?.records[0]?.fields?.Value;
            const mudClientId = responses[4]?.data?.records[0]?.fields?.Value;
            const defaultMudCampaignId = responses[5]?.data?.records[0]?.fields?.Value;

            // const promises = [];

            // if (businessEmail) promises.push(changeEnvInVercel({ env: "FRONT_OFFICE_EMAIL", value: businessEmail }));
            // if (this.programmaticBusinessName) {
            //     promises.push(changeEnvInVercel({ env: "PROGRAMMATIC_BUSINESS_NAME", value: this.programmaticBusinessName }));
            //     promises.push(changeEnvInVercel({ env: "DB_NAME", value: this.programmaticBusinessName }));
            //     promises.push(changeEnvInVercel({ env: "DB_USER", value: this.programmaticBusinessName }));
            // }
            // if (businessName) promises.push(changeEnvInVercel({ env: "BUSINESS_NAME", value: businessName }));
            // if (webUrl) promises.push(changeEnvInVercel({ env: "PRODUCTION_URL", value: webUrl }));
            // if (bottomFormEndpoint) promises.push(changeEnvInVercel({ env: "CUSTOM_BOTTOM_FORM_ENDPOINT", value: bottomFormEndpoint }));
            // if (mudClientId) promises.push(changeEnvInVercel({ env: "MUD_CLIENT_ID", value: mudClientId }));
            // if (defaultMudCampaignId) promises.push(changeEnvInVercel({ env: "DEFAULT_MUD_CAMPAIGN_ID", value: defaultMudCampaignId }));

            // await Promise.all(promises);

            // Change envs in doppler

            try {
                await changeEnvInDoppler({
                    project: this.project,
                    config: this.config,
                    secrets: {
                        FRONT_OFFICE_EMAIL: businessEmail,
                        PROGRAMMATIC_BUSINESS_NAME: this.programmaticBusinessName,
                        DB_NAME: this.programmaticBusinessName,
                        BUSINESS_NAME: businessName,
                        PRODUCTION_URL: webUrl,
                        CUSTOM_BOTTOM_FORM_ENDPOINT: bottomFormEndpoint,
                        MUD_CLIENT_ID: mudClientId,
                        DEFAULT_MUD_CAMPAIGN_ID: defaultMudCampaignId,
                    }
                })
                console.log(chalk.green("success ") + "Production URL, Business Name, Email, DB Name and custom endpoint successfully changed in doppler");
            } catch (err) {
                console.error(chalk.red("error: ") + "Error changing envs in doppler")
                console.error(err);
            }

            // Change backend .env file with the business email and the DB_NAME with the programmaticBusinessName
            //const backendEnvPath = path.join(process.cwd(), "backend", ".env");
            //const backendEnv = fs.readFileSync(backendEnvPath, "utf8");
            // const newBackendEnv = backendEnv
            //     .replace(/FRONT_OFFICE_EMAIL=.*/, `FRONT_OFFICE_EMAIL=${businessEmail}`)
            //     .replace(/DB_NAME=.*/, `DB_NAME=${this.programmaticBusinessName}`)
            //     .replace(/DB_USER=.*/, `DB_USER=${this.programmaticBusinessName}`)
            //     .replace(/BUSINESS_NAME=.*/, `BUSINESS_NAME=${businessName}`)
            //     .replace(/PRODUCTION_URL=.*/, `PRODUCTION_URL=${webUrl}`)
            //     .replace(/CUSTOM_BOTTOM_FORM_ENDPOINT=.*/, `CUSTOM_BOTTOM_FORM_ENDPOINT=${bottomFormEndpoint}`)
            //     .replace(/DEFAULT_MUD_CAMPAIGN_ID=.*/, `DEFAULT_MUD_CAMPAIGN_ID=${defaultMudCampaignId}`)
            //     .replace(/MUD_CLIENT_ID=.*/, `MUD_CLIENT_ID=${mudClientId}`);

            //fs.writeFileSync(backendEnvPath, newBackendEnv, "utf8");

            // Test and make sure the line is changed and now ends with the businessEmail and with the correct DB_NAME
            // const newBackendEnvTest = fs.readFileSync(backendEnvPath, "utf8");
            // if (!newBackendEnvTest.includes(`FRONT_OFFICE_EMAIL=${businessEmail}`)) {
            //     throw new Error("Backend .env FRONT_OFFICE_EMAIL is incorrect");
            // }
            // if (!newBackendEnvTest.includes(`DB_NAME=${this.programmaticBusinessName}`)) {
            //     throw new Error("Backend .env DB_NAME is incorrect");
            // }
            // if (!newBackendEnvTest.includes(`BUSINESS_NAME=${businessName}`)) {
            //     throw new Error("Backend .env BUSINESS_NAME is incorrect");
            // }
            // if (!newBackendEnvTest.includes(`PRODUCTION_URL=${webUrl}`)) {
            //     throw new Error("Backend .env PRODUCTION_URL is incorrect");
            // }
            // console.log(chalk.green("success ") + "Production URL, Business Name, Email, DB Name and custom endpoint successfully changed in backend .env file");
        } catch (err) {
            console.error(chalk.red("error ") + "Error changing env files");
            console.error(chalk.red("error " + err.message));
            console.error(err.stack);
            process.exit(1);
        }
    }

    async createJsonRedirects() {
        try {
            let hasOffset = true;
            let currentOffset = ""
            let redirectsArray = [];

            while (hasOffset) {
                const axiosOptions = {
                    baseURL: `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Redirects`,
                    headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` },
                }

                if (currentOffset) axiosOptions.params = {
                    offset: currentOffset
                }

                const { data: { records, offset } } = await axios(axiosOptions);
                // console.log(records, offset)
                redirectsArray = [...redirectsArray, ...records]

                if (offset) {
                    currentOffset = offset
                    console.log(chalk.blue("info ") + "Redirects offset detected. Looping through...")
                } else {
                    currentOffset = ""
                    hasOffset = false;
                }
            }

            console.log(chalk.blue("info ") + "Found " + redirectsArray.length + " redirects in AirTable.");

            const redirects = redirectsArray.map(record => record.fields);
            const parsedRedirects = redirects.map(redirect => {
                const pathName = redirect.oldUrl.includes("http") ? new URL(redirect.oldUrl).pathname : redirect.oldUrl;

                return ({
                    fromPath: pathName,
                    toPath: redirect.newUrl,
                    isPermanent: redirect.redirectType === "permanent"
                })
            })

            // write new json to vercel.json or replace it with new content if it exists already
            // fs.writeFileSync(path.join(process.cwd(), "redirects.json"), JSON.stringify(parsedRedirects, null, 2), "utf8");

            return parsedRedirects;
            // console.log(chalk.green("success ") + "Redirects correctly saved to redirects.json file")
        } catch (err) {
            if (err instanceof Error && err.message.includes("404")) {
                console.log(chalk.yellow("warn ") + "No redirects found in Airtable. Skipping creating redirects.json")
                return false
            }
            console.error(chalk.red("error ") + "Error creating redirects.json");
            console.error(chalk.red("error " + err.message));
            console.error(err);
            process.exit(1);
        }

    }
}

export default GatsbyPrebuilder;