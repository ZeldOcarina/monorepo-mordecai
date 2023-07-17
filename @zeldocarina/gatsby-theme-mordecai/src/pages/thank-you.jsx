import React, { useContext } from "react"
import styled, { css } from "styled-components"

import respond from "../styles/abstracts/mediaqueries"

import Layout from "../layout/Layout"
import Seo from "../components/Seo"

import { hexToRGB } from "../helpers/helpers"
import { graphql } from "gatsby"
import AppContext from "../context/AppContext"

const StyledThankYou = styled.main`
  .thank-you-container {
    background-image: linear-gradient(
      to right,
      ${({ colors }) => hexToRGB(colors.colorPrimary, 0.7)},
      ${({ colors }) => hexToRGB(colors.colorSecondary, 0.7)}
    );

    padding: 0;
    margin: 0;
    background-size: cover;
    background-position: center;

    .container {
      min-height: 88vh;
      display: flex;
      justify-content: center;
      flex-direction: column;

      ${respond(
        "phone-port",
        css`
          padding: var(--section-gutter) 0;
          max-width: 95%;
        `
      )}
    }

    h1 {
      z-index: 10;
      text-transform: uppercase;
      color: var(--white);
      text-align: center;
      font-weight: 300;
    }

    p {
      font-size: 2.3rem;
      text-align: center;
      margin: 0.5rem auto;
      font-weight: 200;
      color: var(--white);
    }
  }
`

const ThankYou = ({
  location,
  data: {
    businessNameData: { businessNameData },
  },
}) => {
  const appContext = useContext(AppContext)
  //console.log(appContext)
  return (
    <Layout>
      <Seo
        title={`${businessNameData.Value} | Thank You`}
        origin={location.origin}
        pathname={location.pathname}
      />
      <StyledThankYou colors={appContext.colors}>
        <div className="thank-you-container">
          <div className="container">
            <h1>
              Thank you for contacting
              <br />
              {businessNameData.Value}
            </h1>
            <p>
              We got your request and we will get back to you as soon as
              possible.
            </p>
          </div>
        </div>
      </StyledThankYou>
    </Layout>
  )
}

export const query = graphql`
  query ThankYou {
    businessNameData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "Business Name" } }
    ) {
      businessNameData: data {
        Value
      }
    }
  }
`

export default ThankYou
