const fs = require("fs");
const path = require("path");

// Read file config/airtable-tables.json and read the JSON content from the file
const airtableTablesPath = path.join(process.cwd(), "config", "airtable-tables.json");
const airtableTables = JSON.parse(fs.readFileSync(airtableTablesPath, "utf8"));

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const EXCLUDED_PATHS = []

const config = {
  siteMetadata: {
    siteUrl: process.env.SITE_URL,
  },
  plugins: [
    // {
    //   resolve: 'gatsby-plugin-ngrok-tunneling', options: {
    //     addr: 8000,
    //     region: 'eu',

    //   }
    // },
    // `gatsby-plugin-fastify`,
    `gatsby-plugin-no-sourcemaps`,
    {
      // We need filesystem source plugin to add publicURL function to File nodes
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `placeholder`,
        // path is required param, so let's just point it to single file to not create
        // much unnecessary work for it
        path: `${__dirname}/gatsby-config.js`,
      },
    },
    {
      resolve: "gatsby-source-airtable",
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        concurrency: 5,
        tables: airtableTables,
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        policy: [
          { userAgent: "Googlebot", allow: "*", disallow: EXCLUDED_PATHS },
          {
            userAgent: "msnbot|BingBot",
            allow: "/",
            disallow: EXCLUDED_PATHS,
          },
          {
            userAgent: "DuckDuckBot",
            allow: "/",
            disallow: EXCLUDED_PATHS,
          },
          {
            userAgent: "*",
            disallow: "*",
          },
        ],
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        excludes: EXCLUDED_PATHS,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require("sass"),
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "{{ GTM_ID }}",
        includeInDevelopment: true,
        defaultDataLayer: { platform: "gatsby" },
        routeChangeEventName: "gatsby-route-change",
        enableWebVitalsTracking: true,
      },
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,

  ]
}

module.exports = config
