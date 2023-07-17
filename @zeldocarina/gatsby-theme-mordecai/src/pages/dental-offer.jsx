import React, { useEffect, useState, useContext } from "react"
import styled, { css } from "styled-components"
import { graphql } from "gatsby"

import Layout from "../layout/Layout"
import Seo from "../components/Seo"
import OfferForm from "../components/offer-form/OfferForm"
import IntroSection from "../components/IntroSection"
import respond from "../styles/abstracts/mediaqueries"

import AppContext from "../context/AppContext"
import { buildLink } from "../helpers/helpers"

import ShortcodesParser from "../helpers/ShortcodesParser"

const StyledDentalOffer = styled.main`
  .intro-section {
    text-align: center;
    margin: 0 auto;
    padding-top: 0;
    margin-bottom: 5rem;

    &::after {
      transform: translateX(-50%) translateY(-2rem);
      left: 50%;
    }

    .subheading,
    .heading {
      text-align: center;
      margin: var(--gutter) auto;
    }

    .heading {
      ${respond(
        924,
        css`
          margin-top: 0;
        `,
      )}
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
    max-width: 40%;

    ${respond(
      924,
      css`
        max-width: 80%;
        padding-top: 15rem;
        padding-bottom: var(--section-gutter);
      `,
    )}
    ${respond(
      834,
      css`
        max-width: 70%;
      `,
    )}
    ${respond(
      500,
      css`
        max-width: 95%;
      `,
    )}
    ${respond(
      "big-desktop",
      css`
        max-width: 45%;
      `,
    )}
  }
`

const DentalOffer = ({
  location,
  data: {
    businessNameData: { businessNameData },
    dentalOfferSeoData,
    dentalOfferTitleData: { dentalOfferTitleData },
    dentalOfferServicesTitle: { dentalOfferServicesTitle },
    dentalOfferServiceItems: { dentalOfferServiceItems },
    sitemapOffersData: { sitemapOffersData },
  },
}) => {
  const [offersData, setOffersData] = useState({
    heading: "",
    subheading: "",
    service: "",
  })

  const { shortcodesData } = useContext(AppContext)

  useEffect(() => {
    // Find the item in sitemapOffersData array whose data.Permalink matches the current page's from location.state.fromPage
    // Match both pathnames without the trailing slash and with the trailing slash
    const correctItem = sitemapOffersData.find(item => {
      const parsedUrl = buildLink(
        item.data.Permalink,
        shortcodesData.cityState.value,
      )
      return parsedUrl === location.state?.fromPage.replace(/(\/?\s*)$/, "/")
    })

    if (correctItem) {
      // Check is item is found, if not, return default values
      return setOffersData({
        heading: correctItem.data.offerHeading
          ? correctItem.data.offerHeading
          : dentalOfferTitleData.Heading,
        subheading: correctItem.data.offerSubheading
          ? correctItem.data.offerSubheading
          : dentalOfferTitleData.Subheading,
        service: correctItem.data.offerDefaultItem
          ? correctItem.data.offerDefaultItem
          : dentalOfferServiceItems[0].data.dropdownItem,
      })
    }

    // Set the offersData state to the correctItem's data
    setOffersData({
      heading: dentalOfferTitleData.Heading,
      subheading: dentalOfferTitleData.Subheading,
    })
  }, [
    dentalOfferTitleData.Heading,
    dentalOfferTitleData.Subheading,
    location?.state?.fromPage,
    sitemapOffersData,
  ])
  return (
    <Layout>
      <Seo
        title={`${businessNameData.Value} | ${
          dentalOfferSeoData?.dentalOfferSeoData?.Page_Title || ""
        }`}
        description={dentalOfferSeoData?.dentalOfferSeoData?.description || ""}
        mainKeyword={dentalOfferSeoData?.dentalOfferSeoData?.Main_Keyword || ""}
        relativeKeywords={
          dentalOfferSeoData?.dentalOfferSeoData?.Relative_Keywords || ""
        }
        origin={location.origin}
        pathname={location.pathname}
      />
      <StyledDentalOffer>
        <div className="container form-container">
          <IntroSection
            superheading={dentalOfferTitleData.Superheading}
            heading={offersData.heading}
            subheading={offersData.subheading}
          />
          <OfferForm
            cta="Submit"
            servicesTitle={dentalOfferServicesTitle.dropdownItem}
            services={dentalOfferServiceItems.map(item => ({
              description: item.data.dropdownItem,
            }))}
            defaultService={offersData.service}
            privacyLabel={new ShortcodesParser(
              dentalOfferTitleData.privacyLabel,
              shortcodesData,
            ).parseShortcodes()}
          />
        </div>
      </StyledDentalOffer>
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
    dentalOfferSeoData: airtable(
      table: { eq: "Sitemap" }
      data: { Permalink: { eq: "/dental-offer/" } }
    ) {
      dentalOfferSeoData: data {
        Page_Title
        Main_Keyword
        Relative_Keywords
        Description
      }
    }
    dentalOfferTitleData: airtable(
      table: { eq: "Dental Offer" }
      data: { Block: { eq: "Title" } }
    ) {
      dentalOfferTitleData: data {
        Heading
        Subheading
        privacyLabel
      }
    }
    dentalOfferServicesTitle: airtable(
      table: { eq: "Dental Offer" }
      data: { Block: { eq: "Services" } }
    ) {
      dentalOfferServicesTitle: data {
        dropdownItem
      }
    }
    dentalOfferServiceItems: allAirtable(
      filter: {
        table: { eq: "Contact Us" }
        data: { Block: { eq: "ServiceItem" } }
      }
    ) {
      dentalOfferServiceItems: nodes {
        data {
          dropdownItem
        }
      }
    }
    sitemapOffersData: allAirtable(filter: { table: { eq: "Sitemap" } }) {
      sitemapOffersData: nodes {
        data {
          offerDefaultItem
          offerDisclaimer
          offerHeading
          offerSubheading
          Permalink
        }
      }
    }
  }
`

export default DentalOffer
