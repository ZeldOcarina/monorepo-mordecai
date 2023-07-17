import React, { useContext } from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { useLocation } from "@reach/router"
import AppContext from "../context/AppContext"

const StyledBlackButton = styled.div`
  border-radius: 40px;
  background-color: var(--appointment-button-color);
  text-transform: uppercase;
  padding: 1.5rem 2rem;
  width: max-content;
  a {
    color: var(--white);
  }

  &:hover {
    background-color: var(--appointment-button-hover-color);
  }
`

function setDestination(businessName) {
  switch (businessName) {
    case "Aviara Centers":
      return "/los-alamitos-ca/screening-form/"
    default:
      return "/dental-offer"
  }
}

const BlackButton = ({ children, onClick }) => {
  const location = useLocation()
  const appContext = useContext(AppContext)

  return (
    <StyledBlackButton className="black-button" onClick={onClick || undefined}>
      <Link
        to={setDestination(appContext.shortcodesData.business.value)}
        className="link"
        state={{ fromPage: location.pathname }}
      >
        {children}
      </Link>
    </StyledBlackButton>
  )
}

export default BlackButton
