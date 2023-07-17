const EXCLUDED_PATHS = []

const config = {
    siteMetadata: {
        siteUrl: "https://www.dntlab.com",
    },
    "plugins": [
        {
            "resolve": "@zeldocarina/gatsby-theme-mordecai",
            "options": {
                airtableApiKey: process.env.MATTIA_AIRTABLE_KEY,
            }
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
        {
            resolve: `gatsby-plugin-sitemap`,
            options: {
                excludes: EXCLUDED_PATHS,
            },
        },
    ]
}

export default config;