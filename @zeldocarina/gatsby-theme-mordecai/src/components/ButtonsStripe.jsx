import React from "react"
import styled, { css } from "styled-components"
import respond from "../styles/abstracts/mediaqueries"

import BlackButton from "./BlackButton"

const StyledButtonsStripe = styled.section`
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--section-gutter) 0;

  ${respond(
    "big-desktop",
    css`
      padding: 12rem 0;
    `
  )}

  .offer-heading {
    margin-bottom: var(--big-gutter);

    ${respond(
      "big-desktop",
      css`
        font-size: 5rem;
      `
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
      `
    )}
  }
`

const ButtonsStripe = ({ label, link, offer }) => {
  return (
    <StyledButtonsStripe>
      <div className="buttons-container">
        <h3 className="offer-heading">
          {offer ? `BOOK ONLINE TO GET A ${offer}` : "BOOK ONLINE TODAY!"}
        </h3>
        <BlackButton>{label || "Request Appointment"}</BlackButton>
      </div>
    </StyledButtonsStripe>
  )
}

export default ButtonsStripe
