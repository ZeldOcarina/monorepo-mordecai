import React from "react"
import styled, { css } from "styled-components"
import respond from "../styles/abstracts/mediaqueries"

import BlackButton from "./BlackButton"
import IntroSection from "./IntroSection"

import { ctaButton, normalButtonCss } from "../styles/utils/components"
import isExternalUrl from "../helpers/isExternalUrl/isExternalUrl"
import { Link } from "gatsby"

const StyledButtonsStripe = styled.section`
  background-color: ${({ $backgroundOverride }) =>
    $backgroundOverride ? $backgroundOverride : "var(--white)"};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--section-gutter) 0;

  ${respond(
    "big-desktop",
    css`
      padding: 12rem 0;
    `,
  )}

  ${ctaButton}

  .button {
    text-transform: uppercase;

    &:hover {
      background: var(--color-secondary);
    }
  }

  .intro-section {
    color: ${({ $textColorOverride }) => {
      console.log($textColorOverride)
      return $textColorOverride || "inherit"
    }};

    .superheading,
    .heading,
    .subheading {
      color: ${({ $textColorOverride }) => $textColorOverride || "inherit"};
    }
    ${respond(
      "big-desktop",
      css`
        font-size: 5rem;
      `,
    )}
  }

  .black-button {
    margin: 0 auto;

    ${respond(
      "big-desktop",
      css`
        font-size: 4rem;
        padding: 2.2rem 4rem;
        border-radius: 60px;
      `,
    )}
  }

  .button {
    margin: 0 auto;
    background: var(--color-primary);
  }
`

const ButtonsStripe = ({
  buttonLabel,
  buttonLink,
  superheading,
  heading,
  subheading,
  backgroundOverride,
  textColorOverride,
}) => {
  return (
    <StyledButtonsStripe
      $backgroundOverride={backgroundOverride}
      $textColorOverride={textColorOverride}
    >
      <IntroSection
        className="offer-heading"
        superheading={superheading}
        heading={heading}
        subheading={subheading}
        hrColor={textColorOverride || undefined}
      />
      {buttonLink ? (
        isExternalUrl(buttonLink) ? (
          <a className="button" href={buttonLink}>
            {buttonLabel}
          </a>
        ) : (
          <Link className="button" to={buttonLink}>
            {buttonLabel}
          </Link>
        )
      ) : (
        <BlackButton>{buttonLabel || "Request Appointment"}</BlackButton>
      )}
    </StyledButtonsStripe>
  )
}

export default ButtonsStripe
