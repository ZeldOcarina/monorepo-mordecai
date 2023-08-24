import React, { useContext } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet"

import AppContext from "../context/AppContext"

import ShortcodesParser from "../helpers/ShortcodesParser"

const Seo = ({
  title,
  description,
  language,
  mainKeyword,
  relativeKeywords,
  pathname,
}) => {
  const {
    ogImageData: { ogImageData },
    colorPrimaryData: { colorPrimaryData },
    colorSecondaryData: { colorSecondaryData },
    colorTertiaryData: { colorTertiaryData },
    bodyBackgroundData: { bodyBackgroundData },
    bodyColorData: { bodyColorData },
    backgroundDarkData: { backgroundDarkData },
    greyData: { greyData },
    grey500Data: { grey500Data },
    locationBarBgColorData: { locationBarBgColorData },
    superLightGreyData: { superLightGreyData },
    appointmentButtonColorData: { appointmentButtonColorData },
    appointmentButtonHoverColorData: { appointmentButtonHoverColorData },
    dentalOfferButtonColorData: { dentalOfferButtonColorData },
    dentalOfferButtonHoverColorData: { dentalOfferButtonHoverColorData },
    mobileMenuColorData: { mobileMenuColorData },
    mobileMenuCategoryColorData: { mobileMenuCategoryColorData },
    navbarContainerColorData: { navbarContainerColorData },
    navbarLinksColorData: { navbarLinksColorData },
    blackData: { blackData },
    whiteData: { whiteData },
    superheadingFontData: { superheadingFontData },
    headingFontData: { headingFontData },
    subheadingFontData: { subheadingFontData },
    bodyFontData: { bodyFontData },
    bodyFontWeightData: { bodyFontWeightData },
    superheadingFontWeightData: { superheadingFontWeightData },
    headingFontWeightData: { headingFontWeightData },
    subheadingFontWeightData,
  } = useStaticQuery(query)

  const { shortcodesData } = useContext(AppContext)

  console.log(relativeKeywords)

  const parsedRelativeKeywords = relativeKeywords
    ? new ShortcodesParser(relativeKeywords, shortcodesData).parseShortcodes()
    : ""
  const parsedDescription = description
    ? new ShortcodesParser(description, shortcodesData).parseShortcodes()
    : ""
  const parsedTitle = title
    ? new ShortcodesParser(title, shortcodesData).parseShortcodes()
    : ""

  return (
    <Helmet htmlAttributes={{ lang: language || "en" }}>
      <title>{parsedTitle}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href={superheadingFontData.Shortcodes} rel="stylesheet" />
      <link href={headingFontData.Shortcodes} rel="stylesheet" />

      <style type="text/css">{`
        :root {
          --color-primary: ${colorPrimaryData.Value};
          --color-secondary: ${colorSecondaryData.Value};
          --color-tertiary: ${colorTertiaryData.Value};
          --body-background: ${bodyBackgroundData.Value};
          --body-color: ${bodyColorData.Value};
          --background-dark: ${backgroundDarkData.Value};
          --grey: ${greyData.Value};
          --grey500: ${grey500Data.Value};
          --super-light-grey: ${superLightGreyData.Value};
          --navbar-container-color: ${navbarContainerColorData.Value};
          --navbar-links-color: ${navbarLinksColorData.Value};
          --navbar-links-hover-color: ${navbarLinksColorData.Shortcodes};
          --black: ${blackData.Value};
          --white: ${whiteData.Value};
          --superheading-font: ${superheadingFontData.Value};
          --heading-font: ${headingFontData.Value};
          --subheading-font: ${subheadingFontData.Value};
          --body-font: ${bodyFontData.Value};
          --body-font-weight: ${bodyFontWeightData.Value};
          --superheading-font-weight: ${superheadingFontWeightData.Value};
          --heading-font-weight: ${headingFontWeightData.Value};
          --subheading-font-weight: ${
            subheadingFontWeightData?.subheadingFontWeightData?.Value || 400
          };
          --appointment-button-color: ${appointmentButtonColorData.Value};
          --appointment-button-hover-color: ${
            appointmentButtonHoverColorData.Shortcodes
          };
          --dental-offer-button-color: ${dentalOfferButtonColorData.Value};
          --dental-offer-button-hover-color: ${
            dentalOfferButtonHoverColorData.Shortcodes
          };
          --location-bar-bg-bolor: ${locationBarBgColorData.Value};
          --mobile-menu-color: ${mobileMenuColorData.Value};    
          --mobile-menu-category-color: ${mobileMenuCategoryColorData.Value};
        }
      `}</style>
      <meta name="description" content={parsedDescription} />
      <meta
        name="keywords"
        content={`${mainKeyword}, ${parsedRelativeKeywords}`}
      />
      <meta name="webmaster" content="Mattia Rasulo" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={parsedDescription} />
      <meta
        property="og:image"
        content={`${process.env.GATSBY_SITE_URL}${ogImageData?.File?.localFiles[0].publicURL}`}
      />
      <meta
        property="og:url"
        content={`${process.env.GATSBY_SITE_URL}${pathname}`}
      />

      {/* FAVICONS */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/safari-pinned-tab.svg"
        color={colorPrimaryData.Value}
      />
      <meta name="msapplication-TileColor" content={colorSecondaryData.Value} />
      <meta name="theme-color" content={whiteData.Value} />
      {/* END FAVICONS */}
    </Helmet>
  )
}

const query = graphql`
  {
    ogImageData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "ogImage" } }
    ) {
      ogImageData: data {
        File {
          localFiles {
            publicURL
          }
        }
      }
    }
    colorPrimaryData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "colorPrimary" } }
    ) {
      colorPrimaryData: data {
        Value
      }
    }
    colorSecondaryData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "colorSecondary" } }
    ) {
      colorSecondaryData: data {
        Value
      }
    }
    colorTertiaryData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "colorTertiary" } }
    ) {
      colorTertiaryData: data {
        Value
      }
    }
    bodyBackgroundData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "bodyBackground" } }
    ) {
      bodyBackgroundData: data {
        Value
      }
    }
    backgroundDarkData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "backgroundDark" } }
    ) {
      backgroundDarkData: data {
        Value
      }
    }
    bodyColorData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "bodyColor" } }
    ) {
      bodyColorData: data {
        Value
      }
    }
    greyData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "grey" } }
    ) {
      greyData: data {
        Value
      }
    }
    grey500Data: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "grey500" } }
    ) {
      grey500Data: data {
        Value
      }
    }
    superLightGreyData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "superLightGrey" } }
    ) {
      superLightGreyData: data {
        Value
      }
    }
    locationBarBgColorData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "locationBarBgColor" } }
    ) {
      locationBarBgColorData: data {
        Value
      }
    }
    appointmentButtonColorData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "appointmentButtonColor" } }
    ) {
      appointmentButtonColorData: data {
        Value
      }
    }
    appointmentButtonHoverColorData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "appointmentButtonColor" } }
    ) {
      appointmentButtonHoverColorData: data {
        Shortcodes
      }
    }
    dentalOfferButtonColorData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "dentalOfferButtonColor" } }
    ) {
      dentalOfferButtonColorData: data {
        Value
      }
    }
    mobileMenuColorData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "mobileMenuColor" } }
    ) {
      mobileMenuColorData: data {
        Value
      }
    }
    mobileMenuCategoryColorData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "mobileMenuCategoryColor" } }
    ) {
      mobileMenuCategoryColorData: data {
        Value
      }
    }
    dentalOfferButtonHoverColorData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "dentalOfferButtonColor" } }
    ) {
      dentalOfferButtonHoverColorData: data {
        Shortcodes
      }
    }
    navbarContainerColorData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "navbarContainerColor" } }
    ) {
      navbarContainerColorData: data {
        Value
      }
    }
    navbarLinksColorData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "navbarLinksColor" } }
    ) {
      navbarLinksColorData: data {
        Value
        Shortcodes
      }
    }
    blackData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "black" } }
    ) {
      blackData: data {
        Value
      }
    }
    whiteData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "white" } }
    ) {
      whiteData: data {
        Value
      }
    }
    superheadingFontData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "superheadingFont" } }
    ) {
      superheadingFontData: data {
        Value
        Shortcodes
      }
    }
    headingFontData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "headingFont" } }
    ) {
      headingFontData: data {
        Value
        Shortcodes
      }
    }
    subheadingFontData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "subheadingFont" } }
    ) {
      subheadingFontData: data {
        Value
      }
    }
    bodyFontData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "bodyFont" } }
    ) {
      bodyFontData: data {
        Value
      }
    }
    bodyFontWeightData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "bodyFontWeight" } }
    ) {
      bodyFontWeightData: data {
        Value
      }
    }
    superheadingFontWeightData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "superheadingFontWeight" } }
    ) {
      superheadingFontWeightData: data {
        Value
      }
    }
    headingFontWeightData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "headingFontWeight" } }
    ) {
      headingFontWeightData: data {
        Value
      }
    }
    subheadingFontWeightData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "subheadingFontWeight" } }
    ) {
      subheadingFontWeightData: data {
        Value
      }
    }
  }
`

export default Seo
