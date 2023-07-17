import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { graphql } from "gatsby";

import respond from "@zeldocarina/gatsby-theme-mordecai/src/styles/abstracts/mediaqueries";

import Layout from "@zeldocarina/gatsby-theme-mordecai/src/layout/Layout";
import Seo from "@zeldocarina/gatsby-theme-mordecai/src/components/Seo";

import { hexToRGB } from "@zeldocarina/gatsby-theme-mordecai/src/helpers/helpers";

import AppContext from "@zeldocarina/gatsby-theme-mordecai/src/context/AppContext";

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
      margin-top: 0;
    }

    p {
      font-size: 2.3rem;
      text-align: center;
      margin: 0.5rem auto;
      font-weight: 200;
      color: var(--white);
    }
  }

  .button {
    display: inline-block;
    background-color: var(--white);
    border: 1px solid var(--color-primary);
    border-radius: 30px;
    padding: 1rem rem 2rem;
    text-transform: uppercase;
    margin-top: var(--gutter);
    -webkit-transition: all 0.12s ease-in-out;
    transition: all 0.12s ease-in-out;
    max-width: max-content;
    padding: 2rem 6rem;
    margin: var(--gutter) auto 0 auto;

    &:hover {
      background-color: var(--color-primary);
      color: var(--white);
    }
  }
`;

const ThankYou = ({
  location,
  data: {
    businessNameData: { businessNameData },
  },
}) => {
  const appContext = useContext(AppContext);
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
              <br /> Do you want to schedule an appointment now? Click the
              button below now!
            </p>
            <a
              className="button"
              href="https://book.getweave.com/53d21bae-f24d-4674-b260-5caad823c36b/appointment-requests/select-appt-type">
              Book Now
            </a>
          </div>
        </div>
      </StyledThankYou>
    </Layout>
  );
};

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
`;

export default ThankYou;
