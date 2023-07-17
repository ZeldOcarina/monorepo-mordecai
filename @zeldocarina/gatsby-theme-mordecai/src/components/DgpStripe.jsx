import React from "react"
import styled from "styled-components"

import dgpLogo from "../images/dgp-logo.svg"

const StyledMonarchyStripe = styled.div`
  background-color: ${({ bgColorOverride }) =>
    bgColorOverride ? bgColorOverride : "var(--black)"};
  color: #b7b7b7;
  padding: 2rem 0;
  display: grid;
  grid-template-columns: max-content max-content;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  font-size: 1.8rem;

  .logo {
    width: 3.15rem;
    transform: translateY(0.4rem);
  }
`

const MonarchyStripe = ({ text, link, bgColorOverride }) => {
  return (
    <StyledMonarchyStripe bgColorOverride={bgColorOverride}>
      {text}{" "}
      <a href={link} target="_blank" rel="external noreferrer">
        <img src={dgpLogo} alt="Dental Game Plan Logo" className="logo" />
      </a>
    </StyledMonarchyStripe>
  )
}

export default MonarchyStripe
