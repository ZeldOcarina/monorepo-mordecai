import React from "react"
import styled, { css } from "styled-components"
import respond from "../styles/abstracts/mediaqueries"

import IntroSection from "./IntroSection"
import CardsContainer from "./CardsContainer"
import Card from "./Card"

const StyledCardsSection = styled.section`
  padding-top: 12rem;
  background: ${({ $backgroundOverride }) => {
    return $backgroundOverride || css`var(--body-background)`
  }};

  h2,
  p {
    color: var(--body-color);
  }

  .container {
    margin-bottom: var(--big-gutter);
    max-width: 81%;

    ${respond(
      1280,
      css`
        max-width: 89%;
      `,
    )}
    ${respond(
      768,
      css`
        max-width: 90%;
      `,
    )}
    ${respond(
      "big-desktop",
      css`
        max-width: 80%;
      `,
    )}

    .intro-section {
      margin-left: 5rem;
      ${respond(
        1366,
        css`
          padding-top: 0;
        `,
      )}
      ${respond(
        500,
        css`
          margin-left: 0;
        `,
      )}
      .heading {
        color: var(--body-color);
      }
    }
  }
`

const CardsSection = ({
  superheading,
  heading,
  subheading,
  cards,
  sectionId,
  backgroundOverride,
}) => {
  return (
    <StyledCardsSection
      id={sectionId || "cards"}
      $backgroundOverride={backgroundOverride}
    >
      <div className="container">
        <IntroSection
          superheading={superheading}
          heading={heading}
          subheading={subheading}
        />
      </div>
      <CardsContainer>
        {cards.map(({ id, data }) => {
          return (
            <Card key={id} {...data} backgroundOverride={backgroundOverride} />
          )
        })}
      </CardsContainer>
    </StyledCardsSection>
  )
}

export default CardsSection
