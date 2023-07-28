import React, { useContext } from "react"
import { Link } from "gatsby"
import styled, { css } from "styled-components"
import respond from "../styles/abstracts/mediaqueries"

import AppContext from "../context/AppContext"

import IntroSection from "./IntroSection"
import CopySection from "./CopySection"
import BackgroundImage from "./BackgroundImage"

import { hexToRGB, parseMarkdown } from "../helpers/helpers"
import { ctaButton } from "../styles/utils/components"

const StyledCtaSection = styled.section`
  padding: 18rem 0;
  position: relative;
  text-align: center;
  z-index: 100;
  height: 100%;
  margin-top: 0;

  .intro-section {
    margin-bottom: var(--gutter);
    max-width: 80%;
    color: ${({ $textColorOverride }) =>
      $textColorOverride ? `${$textColorOverride} !important` : "inherit"};

    ${respond(
      500,
      css`
        max-width: 100%;
      `,
    )}

    .superheading, .heading, .subheading {
      color: ${({ $textColorOverride }) =>
        $textColorOverride ? `${$textColorOverride} !important` : "inherit"};
    }

    .superheading,
    .heading {
      word-break: break-word;
    }

    .heading,
    .subheading {
      text-align: center;
      color: var(--body-color);
    }

    .heading {
      margin: 0 auto;
    }

    .subheading {
      margin: var(--gutter) auto;
    }

    &::after {
      display: none;
    }
  }

  .buttons-container {
    display: grid;
    grid-template-columns: max-content max-content;
    justify-items: center;
    width: max-content;
    margin: 0 auto;
    gap: var(--gutter);
    margin-top: 7rem;

    ${respond(
      "phone-port",
      css`
        grid-template-columns: 1fr;
      `,
    )}
    ${respond(
      500,
      css`
        margin-top: 4rem;
      `,
    )}
  }

  .bg-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .container {
    position: relative;
    z-index: 100;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    ${respond(
      834,
      css`
        max-width: 100%;
      `,
    )}
  }

  .cta-container {
    width: 100%;
    height: 100%;
  }

  h2 {
    text-align: center;
    margin: 0 auto;
  }

  .logo {
    margin-bottom: var(--big-gutter);
    width: 20rem;

    ${respond(
      500,
      css`
        width: 15rem;
      `,
    )}
  }

  .copy-section {
    color: ${({ $textColorOverride }) =>
      $textColorOverride
        ? `${$textColorOverride} !important`
        : "var(--body-color)"};
    line-height: 2;

    h2,
    p {
      color: ${({ $textColorOverride }) =>
        $textColorOverride ? `${$textColorOverride} !important` : "inherit"};
    }

    ${respond(
      834,
      css`
        max-width: 90%;
      `,
    )}

    ul {
      /* list-style: "> "; */
      text-align: left;
      width: max-content;
      margin: 0 auto;
    }
  }

  ${ctaButton}
`

const CtaSection = ({
  superheading,
  heading,
  subheading,
  copy,
  buttonLabel,
  buttonLink,
  backgroundImage,
  alternativeText,
  overlay,
  logo,
  logoAlt,
  bgColorOverride,
  textColorOverride,
  image,
}) => {
  const { colors, shortcodesData, businessPhoneData } = useContext(AppContext)

  function setBackgroundColor() {
    if (bgColorOverride) {
      return `linear-gradient(to right, ${hexToRGB(
        bgColorOverride.split(",")[0],
        1,
      )}, ${hexToRGB(bgColorOverride.split(", ")[1], 0.5)});`
    } else {
      return `
      linear-gradient(
        to bottom, 
        ${hexToRGB(colors.bodyBackground, 1)} 0%, 
        ${hexToRGB(colors.colorTertiary, 0.7)} 30%, 
        ${hexToRGB(colors.colorTertiary, 0.7)} 90%, 
      ${hexToRGB(colors.bodyBackground, 1)} 100%);
      `
    }
  }

  return (
    <>
      <StyledCtaSection id="cta" $textColorOverride={textColorOverride}>
        <div className="container cta-container">
          <img src={logo} alt={logoAlt} className="logo" />
          <IntroSection
            superheading={superheading}
            heading={heading}
            subheading={subheading}
            theme={backgroundImage ? "light" : "dark"}
            noPaddingTop={!!backgroundImage}
          />
          <CopySection columns={1} theme={backgroundImage ? "light" : "dark"}>
            {parseMarkdown({
              inputMarkdown: copy,
              businessName: shortcodesData.business.value,
              businessAddress: shortcodesData.address.value,
              zipCode: shortcodesData.zipcode.value,
              city: shortcodesData.city.value,
              state: shortcodesData.state.value,
              phone: businessPhoneData.phone,
              tel: businessPhoneData.tel,
              businessEmail: shortcodesData.businessEmail.value,
              siteUrl: shortcodesData.siteUrl.value,
            })}
          </CopySection>
          <div className="buttons-container">
            <Link className="button" to={buttonLink || "/contact-us"}>
              {buttonLabel || "Schedule Now"}
            </Link>
          </div>
        </div>
        <BackgroundImage
          image={backgroundImage}
          alt={alternativeText}
          overlay={setBackgroundColor()}
        />
      </StyledCtaSection>
    </>
  )
}

export default CtaSection
