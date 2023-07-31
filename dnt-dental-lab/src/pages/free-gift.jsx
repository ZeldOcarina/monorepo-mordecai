import React, { useContext, useEffect, useState } from "react"
import { graphql } from "gatsby"
import ShortcodesParser from "@zeldocarina/gatsby-theme-mordecai/src/helpers/ShortcodesParser"

import Layout from "@zeldocarina/gatsby-theme-mordecai/src/layout/Layout"
import Seo from "@zeldocarina/gatsby-theme-mordecai/src/components/Seo"
import FreeGiftForm from "../components/free-gift-form/FreeGiftForm"
import IntroSection from "@zeldocarina/gatsby-theme-mordecai/src/components/IntroSection"
import AppContext from "@zeldocarina/gatsby-theme-mordecai/src/context/AppContext"
import { StyledContactUs } from "@zeldocarina/gatsby-theme-mordecai/src/pages/contact-us"

import { Loader } from "@googlemaps/js-api-loader"

const FreeGift = ({
  location,
  data: {
    businessNameData: { businessNameData },
    freeGiftSeoData,
    freeGiftTitleData: { freeGiftTitleData },
  },
}) => {
  const { shortcodesData } = useContext(AppContext)
  const [isMapLoaded, setIsMapLoaded] = useState(false)

  const parsedPrivacyLabel = new ShortcodesParser(
    freeGiftTitleData.privacyLabel,
    shortcodesData,
  ).parseShortcodes()

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.GATSBY_GOOGLE_MAPS_API_KEY,
      libraries: ["places"],
    })

    loader.load().then(async () => {
      console.log("Maps JS API initialized")
      setIsMapLoaded(true)
    })
  }, [])

  return (
    <Layout>
      <Seo
        title={`${businessNameData.Value} | ${
          freeGiftSeoData?.freeGiftTitleData.Page_Title || ""
        }`}
        description={freeGiftSeoData?.freeGiftTitleData.description || ""}
        mainKeyword={freeGiftSeoData?.freeGiftTitleData.Main_Keyword || ""}
        relativeKeywords={
          freeGiftSeoData?.freeGiftTitleData.Relative_Keywords || ""
        }
        origin={location.origin}
        pathname={location.pathname}
      />
      <StyledContactUs>
        <div className="container form-container">
          <IntroSection
            superheading={freeGiftTitleData.Superheading}
            heading={freeGiftTitleData.Heading}
            subheading={freeGiftTitleData.Subheading}
          />
          <FreeGiftForm
            cta="Submit"
            privacyLabel={parsedPrivacyLabel}
            isMapLoaded={isMapLoaded}
          />
        </div>
      </StyledContactUs>
    </Layout>
  )
}

export const query = graphql`
  {
    businessNameData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "Business Name" } }
    ) {
      businessNameData: data {
        Value
      }
    }
    freeGiftSeoData: airtable(
      table: { eq: "Sitemap" }
      data: { Permalink: { eq: "/free-gift/" } }
    ) {
      freeGiftSeoData: data {
        Page_Title
        Main_Keyword
        Relative_Keywords
        Description
      }
    }
    freeGiftTitleData: airtable(
      table: { eq: "Free Gift" }
      data: { Block: { eq: "Title" } }
    ) {
      freeGiftTitleData: data {
        Superheading
        Heading
        Subheading
        privacyLabel
      }
    }
  }
`

export default FreeGift
