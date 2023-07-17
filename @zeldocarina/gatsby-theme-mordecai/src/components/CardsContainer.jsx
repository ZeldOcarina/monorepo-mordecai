import React from "react"
import styled from "styled-components"
import respond from "../styles/abstracts/mediaqueries"
import { css } from "styled-components"

const StyledCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 500px);
  max-width: 90%;
  margin: 0 auto;
  justify-content: center;
  gap: var(--big-gutter);

  ${respond(
    1680,
    css`
      grid-template-columns: repeat(auto-fit, 500px);
    `
  )}

  ${respond(
    1194,
    css`
      grid-template-columns: repeat(auto-fit, 450px);
    `
  )}
  ${respond(
    834,
    css`
      grid-template-columns: repeat(auto-fit, 620px);
    `
  )}
  ${respond(
    500,
    css`
      grid-template-columns: 100%;
      max-width: 90%;
      margin: 0 auto;
      padding: 0;
    `
  )}
  ${respond(
    "big-desktop",
    css`
      grid-template-columns: repeat(auto-fit, 655px);
    `
  )}
`

const CardsContainer = ({ children }) => {
  return <StyledCardsContainer>{children}</StyledCardsContainer>
}

export default CardsContainer
