import React, { useContext } from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import ShortcodesParser from "@zeldocarina/gatsby-theme-mordecai/src/helpers/ShortcodesParser"

import Layout from "@zeldocarina/gatsby-theme-mordecai/src/layout/Layout"
import Seo from "@zeldocarina/gatsby-theme-mordecai/src/components/Seo"
import Form from "@zeldocarina/gatsby-theme-mordecai/src/components/form/Form"
import IntroSection from "@zeldocarina/gatsby-theme-mordecai/src/components/IntroSection"
import TextSection from "@zeldocarina/gatsby-theme-mordecai/src/components/TextSection"
import AppContext from "@zeldocarina/gatsby-theme-mordecai/src/context/AppContext"
import { StyledContactUs } from "@zeldocarina/gatsby-theme-mordecai/src/pages/contact-us"

const StyledNewText = styled.div`
  .text-section {
    margin-top: 0;
    padding-top: 0;
    padding-bottom: 0;
    p {
      color: var(--body-color);
      margin-bottom: var(--gutter);
      text-align: left;
    }

    .intro-section {
      &::after {
        transform: translateX(-50%) translateY(0);
      }
    }
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
        title={`${businessNameData.Value} | ${contactUsSeoData.Page_Title}`}
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
        <StyledNewText>
          <TextSection
            heading={"Lab Policy"}
            subheading={"Transparent Pricing and Payment Policies"}
            copy={`**For California Dr.'s:**

1. Sales Tax will be added to the price list.
2. All prices are subject to change with the inflation rate, typically once a year. You will be notified of any changes to your prices, 30 days in advance.
3. Invoices are due and payable on the date indicated in your monthly statement.
4. Please notify us in advance for any payment arrangements before the statement due date.

**For All Other Dr.'s:**

1. Shipping & Handling charges will apply only when we send you a case.
2. All prices are subject to change with the inflation rate, usually once a year. You will receive advance notification of any price changes, 30 days in advance.
3. Payments for all invoices are due on the date indicated in your monthly statement.
4. Kindly inform us in advance if you require any payment arrangements before the statement due date.

**General Policies:**

1. An interest charge of 15% will apply to all unpaid accounts exceeding 30 days.
2. Filing and collection fees will be added to closed and unpaid accounts.
3. All try-in cases exceeding 45 days will be charged based on the amount of work already completed.
4. We provide a 6-month guarantee on all cases, as long as your account remains active.
5. Cases or services that require rush processing and do not fit our regular time schedule will be subject to surcharges. Refer to the following schedule for rush cases:
    - Rush 25: The price of the provided service + 25% of the same price.
    - Rush 50: The price of the provided service + 50% of the same price.
    - Rush 75: The price of the provided service + 75% of the same price.
6. There will be no charge for Redo cases if our lab is responsible for the mistake.

**Accepted Payment Methods:**

We accept Mastercard and Visa as payment methods.`}
          ></TextSection>
        </StyledNewText>
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
