import React, { useContext } from "react"
import styled, { css } from "styled-components"
import { Link } from "gatsby"
import respond from "../styles/abstracts/mediaqueries"

import AppContext from "../context/AppContext"

import IntroSection from "./IntroSection"
import { buildLink, parseMarkdown } from "../helpers/helpers"
import { ctaButton } from "../styles/utils/components"

const StyledCta2 = styled.section`
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  background-color: var(--white);

  ${respond(
    1194,
    css`
      grid-template-columns: 1fr;
      padding: 0;
    `
  )}

  .left-side {
    .image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
    }
  }
  .right-side {
    padding: 10rem;
    text-align: center;
    display: grid;
    grid-auto-rows: max-content;
    align-content: center;
    justify-items: center;

    ${respond(
      500,
      css`
        padding: 5rem;
      `
    )}

    .intro-section {
      max-width: 100%;
      width: 100%;
      margin: 0 auto var(--gutter) auto;

      .superheading,
      .heading,
      .subheading {
        text-align: center;
      }

      &::after {
        display: none;
      }
    }
  }

  ${ctaButton}

  .button {
    margin-top: var(--big-gutter);
  }
`

const Cta2 = ({
  superheading,
  heading,
  subheading,
  copy,
  buttonLabel,
  buttonLink,
  backgroundImage,
  overlay,
  alternativeText,
  logo,
  bgColorOverride,
  image,
}) => {
  const { shortcodesData, businessPhoneData } = useContext(AppContext)
  // console.log({ buttonLabel })

  function buildButton() {
    if (!buttonLabel || !buttonLink) return ""
    if (buttonLink.startsWith("http"))
      return (
        <a href={buttonLink} className="button">
          {buttonLabel}
        </a>
      )
    return (
      <Link
        to={buildLink(buttonLink, shortcodesData.cityState)}
        className="button"
      >
        {buttonLabel}
      </Link>
    )
  }

  return (
    <StyledCta2>
      <div className="left-side">
        <img
          className="image"
          src={image}
          alt={alternativeText || "Featured"}
        />
      </div>

      <div className="right-side">
        <img src={logo} alt="" role="presentation" className="logo" />

        <IntroSection
          superheading={superheading}
          heading={heading}
          subheading={subheading}
        />
        <div>
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
        </div>
        {buildButton()}
      </div>
    </StyledCta2>
  )
}

export default Cta2
