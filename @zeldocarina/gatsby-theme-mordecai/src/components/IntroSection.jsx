import React, { useContext } from "react"
import styled, { css } from "styled-components"
import respond from "../styles/abstracts/mediaqueries"
import PropTypes from "prop-types"

import AppContext from "../context/AppContext"
import ShortcodesParser from "../helpers/ShortcodesParser"

const StyledIntroSection = styled.div`
  position: relative;
  text-align: left;
  margin: 0 0 10rem 0;
  padding-bottom: ${({ padding }) => {
    return padding || padding === 0 ? `${padding}rem` : `var(--gutter)`
  }};
  ${({ noPaddingTop }) => noPaddingTop && "padding-top: 0;"}
  max-width: ${({ isText100wide }) => (isText100wide ? "100%" : "65%")};

  ${(respond(500),
  css`
    max-width: 100%;
  `)}

  ${respond(
    "iphone-12-mini-land",
    css`
      margin-bottom: 3rem;
    `
  )}
  ${respond(
    500,
    css`
      margin-bottom: 5rem;
    `
  )}

  .superheading {
    font-family: var(--superheading-font);
    font-weight: var(--superheading-font-weight);
    color: var(--color-tertiary);
    text-transform: uppercase;
    text-align: left;
    font-size: var(--supertitle-font-size);
    margin: 0;

    ${respond(
      "iphone-8-plus-land",
      css`
        font-size: 1.8rem;
      `
    )}
    ${respond(
      "phone-port",
      css`
        font-size: 1.6rem;
      `
    )}
    ${respond(
      "big-desktop",
      css`
        font-size: 3rem;
      `
    )}
  }

  .heading {
    font-family: var(--heading-font);
    text-transform: uppercase;
    font-weight: var(--heading-font-weight);
    line-height: 1.5;
    font-size: var(--title-font-size);
    margin: var(--gutter) 0;
    width: 100%;
    color: var(--body-color);
    text-align: left;
    font-weight: 700;

    ${respond(
      "iphone-8-plus-land",
      css`
        font-size: 3rem;
      `
    )}
    ${respond(
      "iphone-12-mini-land",
      css`
        width: 95%;
        font-size: 2.8rem;
      `
    )}
    ${respond(
      "phone-port",
      css`
        width: 100%;
        font-size: 2.5rem;
        margin-top: 1rem;
      `
    )}
    ${respond(
      "big-desktop",
      css`
        font-size: 6rem;
      `
    )}
  }

  .subheading {
    font-family: var(--subheading-font);
    font-weight: var(--subheading-font-weight);
    font-size: 2.2rem;
    margin: 0;
    text-align: left;
    width: ${({ isText100wide }) => (isText100wide ? "80%" : "85%")};
    line-height: 1.5;
    color: var(--light-grey);
    font-style: italic;

    ${respond(
      "iphone-12-mini-land",
      css`
        width: 90%;
        font-size: 1.4rem;
      `
    )}
    ${respond(
      "phone-port",
      css`
        font-size: 1.3rem;
      `
    )}
      ${respond(
      "big-desktop",
      css`
        font-size: 2.5rem;
      `
    )};
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -2rem;
    left: 0;
    height: 10px;
    width: 100px;
    background-color: var(--color-tertiary);
  }
`

function setIsText100Wide(businessName) {
  switch (businessName) {
    case "Aviara Centers":
      return true
    default:
      return false
  }
}

const IntroSection = ({
  superheading,
  heading,
  subheading,
  padding,
  theme,
  noPaddingTop,
  makeHeadingH1,
}) => {
  const { shortcodesData } = useContext(AppContext)

  const {
    business: { value: businessName },
  } = shortcodesData

  const parsedSuperheading = new ShortcodesParser(
    superheading,
    shortcodesData
  ).parseShortcodes()
  const parsedHeading = new ShortcodesParser(
    heading,
    shortcodesData
  ).parseShortcodes()
  const parsedSubheading = new ShortcodesParser(
    subheading,
    shortcodesData
  ).parseShortcodes()

  return (
    <StyledIntroSection
      padding={padding}
      theme={theme}
      noPaddingTop={noPaddingTop}
      className="intro-section"
      isText100wide={setIsText100Wide(businessName)}
    >
      {superheading && <h3 className="superheading">{parsedSuperheading}</h3>}
      {makeHeadingH1 ? (
        <h1 className="heading">{parsedHeading}</h1>
      ) : (
        <h2 className="heading">{parsedHeading}</h2>
      )}
      {subheading && <p className="subheading">{parsedSubheading}</p>}
    </StyledIntroSection>
  )
}

IntroSection.propTypes = {
  superheading: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  padding: PropTypes.number,
  theme: PropTypes.string,
  makeHeadingH1: PropTypes.bool,
}

export default IntroSection
