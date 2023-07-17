const axios = require("axios");

async function fetchFavicon({ originalFaviconUrl, colorSecondary }) {
    // console.log({ originalFaviconUrl, colorSecondary });
    // Download favicons from Real Favicon Generator
    try {
        const response = await axios.post("https://realfavicongenerator.net/api/favicon", {
            "favicon_generation": {
                "api_key": process.env.FAVICON_GENERATOR_API_KEY,
                "master_picture": {
                    "type": "url",
                    "url": originalFaviconUrl
                },
                "favicon_design": {
                    "ios": {
                        "picture_aspect": "no_change",
                        "assets": {
                            "ios6_and_prior_icons": false,
                            "ios7_and_later_icons": false,
                            "precomposed_icons": false,
                            "declare_only_default_icon": true
                        }
                    },
                    "desktop_browser": {
                        "design": "raw"
                    },
                    "windows": {
                        "picture_aspect": "white_silhouette",
                        "background_color": colorSecondary,
                        "on_conflict": "override",
                        "assets": {
                            "windows_80_ie_10_tile": false,
                            "windows_10_ie_11_edge_tiles": {
                                "small": false,
                                "medium": true,
                                "big": false,
                                "rectangle": false
                            }
                        }
                    },
                    "android_chrome": {
                        "picture_aspect": "no_change",
                        "theme_color": colorSecondary,
                        "manifest": {
                            "display": "standalone",
                            "orientation": "not_set",
                            "on_conflict": "override",
                            "declared": true
                        },
                        "assets": {
                            "legacy_icon": false,
                            "low_resolution_icons": false
                        }
                    },
                    "safari_pinned_tab": {
                        "picture_aspect": "silhouette",
                        "theme_color": "#5bbad5"
                    }
                },
                "settings": {
                    "scaling_algorithm": "Mitchell",
                    "error_on_image_too_small": false,
                    "readme_file": false,
                    "html_code_file": false,
                    "use_path_as_is": false
                }
            }
        }
        );
        // console.log(response.data);
        return response.data
    } catch (err) {
        console.error(err.data);
        // Exit process with status 1
        process.exit(1);
    }
}

module.exports = fetchFavicon;