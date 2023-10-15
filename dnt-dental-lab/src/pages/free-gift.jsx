import React, { useContext, useEffect, useState } from "react"
import { graphql } from "gatsby"
import styled, { css } from "styled-components"

import ShortcodesParser from "@zeldocarina/gatsby-theme-mordecai/src/helpers/ShortcodesParser"
import Layout from "@zeldocarina/gatsby-theme-mordecai/src/layout/Layout"
import Seo from "@zeldocarina/gatsby-theme-mordecai/src/components/Seo"
import FreeGiftForm from "../components/free-gift-form/FreeGiftForm"
import IntroSection from "@zeldocarina/gatsby-theme-mordecai/src/components/IntroSection"
import AppContext from "@zeldocarina/gatsby-theme-mordecai/src/context/AppContext"

import { Loader } from "@googlemaps/js-api-loader"
import respond from "@zeldocarina/gatsby-theme-mordecai/src/styles/abstracts/mediaqueries"

const StyledFreeGift = styled.main`
  .intro-section {
    text-align: center;
    margin: 0 auto;
    padding-top: 0;
    margin-bottom: 5rem;
    max-width: 100%;

    &::after {
      transform: translateX(-50%) translateY(-2rem);
      left: 50%;
    }

    .subheading,
    .heading {
      text-align: center;
      margin: var(--gutter) auto;
    }
  }

  h1 {
    text-align: center;
    font-weight: 700;
    text-transform: uppercase;
    margin: 0;
    color: var(--color-primary);
  }

  p {
    text-align: center;
    margin-bottom: var(--big-gutter);
    color: var(--white);
  }

  .form-container {
    padding-top: 7rem;
    padding-bottom: 10rem;
    max-width: 70%;

    ${respond(
      924,
      css`
        max-width: 80%;
        padding-bottom: 0;
      `,
    )}
    ${respond(
      834,
      css`
        max-width: 70%;
        padding-bottom: 0;
      `,
    )}
  ${respond(
      500,
      css`
        max-width: 95%;
        padding: 13rem 0 4rem 0;
      `,
    )}
  ${respond(
      "big-desktop",
      css`
        max-width: 40%;
      `,
    )}
  }
`

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
      <StyledFreeGift>
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
      </StyledFreeGift>
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
