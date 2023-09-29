import React, { useContext } from "react"
import styled, { css } from "styled-components"
import { graphql } from "gatsby"
import ShortcodesParser from "../helpers/ShortcodesParser"

import Layout from "../layout/Layout"
import Seo from "../components/Seo"
import Form from "../components/form/Form"
import IntroSection from "../components/IntroSection"
import respond from "../styles/abstracts/mediaqueries"
import AppContext from "../context/AppContext"

const StyledContactUs = styled.main`
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
    max-width: 50%;

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

const ContactUs = ({
  location,
  data: {
    businessNameData: { businessNameData },
    contactUsSeoData: { contactUsSeoData },
    contactUsTitleData: { contactUsTitleData },
    contactUsServicesTitle: { contactUsServicesTitle },
    contactUsServiceItems: { contactUsServiceItems },
  },
}) => {
  const { shortcodesData } = useContext(AppContext)

  const parsedPrivacyLabel = new ShortcodesParser(
    contactUsTitleData.privacyLabel,
    shortcodesData,
  ).parseShortcodes()

  return (
    <Layout>
      <Seo
        title={`${
          businessNameData && businessNameData.businessNameData
            ? businessNameData.businessNameData.Value
            : ""
        } | ${contactUsSeoData.Page_Title}`}
        description={contactUsSeoData.description}
        mainKeyword={contactUsSeoData.Main_Keyword}
        relativeKeywords={contactUsSeoData.Relative_Keywords}
        origin={location.origin}
        pathname={location.pathname}
      />
      <StyledContactUs>
        <div className="container form-container">
          <IntroSection
            superheading={contactUsTitleData.Superheading}
            heading={contactUsTitleData.Heading}
            subheading={contactUsTitleData.Subheading}
          />
          <Form
            cta="Submit"
            servicesTitle={contactUsServicesTitle.dropdownItem}
            services={contactUsServiceItems.map(item => ({
              value: item.data.dropdownItem,
            }))}
            privacyLabel={parsedPrivacyLabel}
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
    contactUsSeoData: airtable(
      table: { eq: "Sitemap" }
      data: { Permalink: { eq: "/contact-us/" } }
    ) {
      contactUsSeoData: data {
        Page_Title
        Main_Keyword
        Relative_Keywords
        Description
      }
    }
    contactUsTitleData: airtable(
      table: { eq: "Contact Us" }
      data: { Block: { eq: "Title" } }
    ) {
      contactUsTitleData: data {
        Superheading
        Heading
        Subheading
        privacyLabel
      }
    }
    contactUsServicesTitle: airtable(
      table: { eq: "Contact Us" }
      data: { Block: { eq: "Services" } }
    ) {
      contactUsServicesTitle: data {
        dropdownItem
      }
    }
    contactUsServiceItems: allAirtable(
      filter: {
        table: { eq: "Contact Us" }
        data: { Block: { eq: "ServiceItem" } }
      }
    ) {
      contactUsServiceItems: nodes {
        data {
          Heading
          dropdownItem
        }
      }
    }
  }
`

export default ContactUs
