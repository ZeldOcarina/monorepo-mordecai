import { Link } from "gatsby"
import React, { useContext } from "react"
import styled, { css } from "styled-components"
import AppContext from "../context/AppContext"
import respond from "../styles/abstracts/mediaqueries"

import { parseMarkdown } from "../helpers/helpers"
import { buildLink } from "../helpers/helpers"
import { normalButtonCss } from "../styles/utils/components"

import IntroSection from "./IntroSection"

const StyledCard = styled.article`
  display: grid;
  gap: var(--big-gutter);
  grid-auto-rows: max-content;
  ${({ isTextJustified }) => {
    if (isTextJustified) return "text-align: justify;"
    return "text-align: left;"
  }}

  .title-container {
    display: grid;
    grid-template-columns: 20rem 1fr;
    align-items: center;
    justify-content: center;
    width: max-content;
    margin: 0 auto;
    gap: var(--gutter);

    ${respond(
      500,
      css`
        grid-template-columns: 1fr;
        text-align: center;
      `
    )}
    ${respond(
      "big-desktop",
      css`
        grid-template-columns: 30rem 1fr;
      `
    )}

    .intro-section {
      margin: 0;
      padding: 0;
      max-width: 100%;

      .heading {
        text-align: left;
        font-size: 2rem;
        font-weight: 700;
        margin: 0;

        ${respond(
          500,
          css`
            text-align: center;
          `
        )}
      }

      .subheading {
        font-style: italic;
        padding: 0;
        margin: 0;
        font-weight: 700;

        ${respond(
          500,
          css`
            text-align: center;
          `
        )}
      }

      &::after {
        display: none;
      }
    }
  }

  .image {
    flex: 0.8;
    width: 100%;
    height: auto;

    ${respond(
      500,
      css`
        width: 15rem;
        margin: 0 auto;
      `
    )}
  }

  ${normalButtonCss}

  .text-container {
    ${respond(
      1060,
      css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `
    )}
  }
`

const Card = ({
  Copy,
  Heading,
  Subheading,
  ButtonLabel,
  ButtonLink,
  Media,
  AltText,
}) => {
  const {
    shortcodesData,
    appVariables: { isTextJustified },
  } = useContext(AppContext)

  return (
    <StyledCard isTextJustified={isTextJustified}>
      <div className="title-container">
        <img
          className="image"
          src={Media.localFiles[0].publicURL}
          alt={AltText}
        />
        <IntroSection heading={Heading} subheading={Subheading} />
      </div>
      <div className="text-container">
        <div className="text">{parseMarkdown({ inputMarkdown: Copy })}</div>
        {ButtonLink && (
          <Link
            className="button"
            to={buildLink(ButtonLink, shortcodesData.cityState.value)}
          >
            {ButtonLabel}
          </Link>
        )}
      </div>
    </StyledCard>
  )
}

export default Card
