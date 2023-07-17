import React from "react"
import styled, { css } from "styled-components"
import respond from "../styles/abstracts/mediaqueries"

import IntroSection from "../components/IntroSection"

const StyledHtmlEmbed = styled.section`
  background-color: ${({ bgColorOverride }) =>
    bgColorOverride ? bgColorOverride : "inherit"};
  justify-content: center;
  margin: 0 auto;
  padding: 13rem 0;

  ${respond(
    "big-desktop",
    css`
      padding: 15rem 0;
    `
  )}

  .intro-section {
    text-align: center;
    margin: 0 auto var(--big-gutter) auto;
    padding: 0;

    ${respond(
      500,
      css`
        max-width: 90%;
      `
    )}

    ${respond(
      "big-desktop",
      css`
        margin-bottom: 6rem;
      `
    )}

    .heading,
    .subheading {
      text-align: center;
    }

    .heading,
    .subheading {
      margin: 0 auto;
    }

    .superheading {
      text-align: center;
      margin: 0 auto;
    }

    &::after {
      display: none;
    }
  }

  .form-container {
    display: flex;
    justify-content: center;

    iframe {
      border: none;
    }
  }
`

const HtmlEmbed = ({
  html,
  heading,
  subheading,
  superheading,
  id,
  bgColorOverride,
}) => {
  return (
    <StyledHtmlEmbed id={id} bgColorOverride={bgColorOverride}>
      <IntroSection
        heading={heading}
        superheading={superheading}
        subheading={subheading}
      />
      <div
        className="form-container"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </StyledHtmlEmbed>
  )
}

export default HtmlEmbed
