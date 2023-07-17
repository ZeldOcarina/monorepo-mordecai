import React, { useContext, useRef } from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled, { css } from "styled-components"
import CopySection from "./CopySection"
import IntroSection from "./IntroSection"
import AppContext from "../context/AppContext"

import { parseMarkdown } from "../helpers/helpers"
import respond from "../styles/abstracts/mediaqueries"

function setBackgroundColor({ backgroundOverride }) {
  if (backgroundOverride) return backgroundOverride
  return "var(--body-background)"
}

const StyledTextSection = styled.section`
  min-height: ${({ imageHeight }) => {
    if (imageHeight) return imageHeight + 100 + "px"
    return "max-content"
  }};
  padding: 12rem 0;
  background: ${({ backgroundOverride }) => {
    return setBackgroundColor({ backgroundOverride })
  }};

  ${respond(
    1194,
    css`
      padding: 10rem 0;
    `
  )}
  ${respond(
    500,
    css`
      padding: var(--section-gutter) 0;
    `
  )}
  ${respond(
    "big-desktop",
    css`
      padding: 20rem 0;
    `
  )}

  ul {
    /* Make ul style go inward instead of outwards */
    list-style-position: inside;
    margin: var(--gutter) 0;
  }

  .text-container {
    line-height: 2;

    ${({ isTextJustified }) => {
      if (isTextJustified) return "text-align: justify;"
      return "text-align: left;"
    }}

    .copy-section {
      width: 100%;
      ${({ isTextJustified }) => {
        if (isTextJustified) return "text-align: justify;"
        return "text-align: left;"
      }}
    }

    &--image {
      img {
        float: right;
        width: 50rem;
        margin-left: 6rem;
        margin-bottom: 4rem;

        ${respond(
          1024,
          css`
            float: unset;
            margin-left: 0;
            width: 100%;
          `
        )}
        ${respond(
          "big-desktop",
          css`
            width: 80rem;
            margin-left: 10rem;
          `
        )}
      }

      .copy-section {
        color: var(--body-color);

        ${({ isTextJustified }) => {
          if (isTextJustified) return "text-align: justify;"
          return "text-align: left;"
        }}

        p {
          color: var(--body-color);
        }
      }

      .intro-section {
        margin-bottom: var(--section-gutter);

        width: 100%;
        .heading,
        .subheading {
          color: ${({ whiteBackground }) =>
            whiteBackground ? css`var(--body-color)` : css`var(--white)`};
        }
      }
    }
  }

  .intro-section {
    padding-top: 0;
    margin-top: 0;

    ${respond(
      500,
      css`
        padding: 0;
      `
    )}

    .subheading {
      ${respond(
        500,
        css`
          margin-left: 0;
          padding: 0;
        `
      )}
    }
  }

  .container {
    ${respond(
      500,
      css`
        margin: 0 auto;
        padding: 0;
        //max-width: unset;
      `
    )}
  }

  p,
  ul {
    ${respond(
      500,
      css`
        padding: 0;
      `
    )}
  }

  li {
    list-style-position: inside;
  }
`

const TextSection = ({
  superheading,
  heading,
  subheading,
  copy,
  image,
  alternativeText,
  sectionId,
  backgroundOverride,
}) => {
  const imageRef = useRef(null)
  const {
    phoneData: { phoneData },
    telData: { telData },
    businessNameData: { businessNameData },
    addressData: { addressData },
    zipcodeData: { zipcodeData },
    cityData: { cityData },
    stateData: { stateData },
    businessEmailData: { businessEmailData },
    siteUrlData: { siteUrlData },
  } = useStaticQuery(query)

  const parsedMarkdown = parseMarkdown({
    inputMarkdown: copy,
    businessName: businessNameData.Value,
    businessAddress: addressData.Value,
    zipCode: zipcodeData.Value,
    city: cityData.Value,
    state: stateData.Value,
    businessEmail: businessEmailData.Value,
    tel: telData.Value,
    phone: phoneData.Value,
    siteUrl: siteUrlData.Value,
  })

  const [imageHeight, setImageHeight] = React.useState(0)

  const {
    appVariables: { isTextJustified },
  } = useContext(AppContext)

  React.useLayoutEffect(() => {
    if (imageRef.current) {
      setImageHeight(imageRef.current.clientHeight)
    }
  }, [imageRef])

  // React.useEffect(() => {
  //   console.log({ imageRef, imageHeight })
  // }, [imageRef, imageHeight])

  return (
    <StyledTextSection
      id={sectionId || "text"}
      whiteBackground={!!image}
      className="text-section"
      backgroundOverride={backgroundOverride}
      imageHeight={imageHeight}
      isTextJustified={isTextJustified}
    >
      <div className="container">
        <div
          className={
            image ? "text-container text-container--image" : "text-container"
          }
        >
          {image && (
            <img
              src={image}
              alt={alternativeText || "Featured"}
              ref={imageRef}
            />
          )}
          <IntroSection
            superheading={superheading}
            subheading={subheading}
            heading={heading}
          />
          {image ? (
            <div className="text-container">{parsedMarkdown}</div>
          ) : (
            <CopySection columns={1}>{parsedMarkdown}</CopySection>
          )}
        </div>
      </div>
    </StyledTextSection>
  )
}

const query = graphql`
  query {
    phoneData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "Phone" } }
    ) {
      phoneData: data {
        Value
      }
    }
    telData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "Tel:" } }
    ) {
      telData: data {
        Value
      }
    }
    businessNameData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "Business Name" } }
    ) {
      businessNameData: data {
        Value
      }
    }
    addressData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "Address" } }
    ) {
      addressData: data {
        Value
      }
    }
    zipcodeData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "Zipcode" } }
    ) {
      zipcodeData: data {
        Value
      }
    }
    cityData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "City" } }
    ) {
      cityData: data {
        Value
      }
    }
    stateData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "State" } }
    ) {
      stateData: data {
        Value
      }
    }
    businessEmailData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "Email" } }
    ) {
      businessEmailData: data {
        Value
      }
    }
    siteUrlData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "Web URL" } }
    ) {
      siteUrlData: data {
        Value
      }
    }
  }
`

export default TextSection
