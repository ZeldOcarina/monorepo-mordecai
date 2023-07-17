import React from "react"
import styled from "styled-components"

import monarchyLogo from "../images/monarchy-logo.svg"

const StyledMonarchyStripe = styled.div`
  background-color: #000000;
  padding: 2rem 0;
  display: grid;
  grid-template-columns: max-content max-content;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`

const MonarchyStripe = () => {
  return (
    <StyledMonarchyStripe>
      SITE BY{" "}
      <a href="https://monarchy.io">
        <img src={monarchyLogo} alt="Monarchy Media LLC" />
      </a>
    </StyledMonarchyStripe>
  )
}

export default MonarchyStripe
