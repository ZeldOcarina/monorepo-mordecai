import React, { useContext } from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { useLocation } from "@reach/router"
// @ts-expect-error
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

function setDestination(businessName: string) {
  switch (businessName) {
    case "Aviara Centers":
      return "/los-alamitos-ca/screening-form/"
    default:
      return "/dental-offer"
  }
}

interface BlackButtonProps extends React.PropsWithChildren {
  onClick: React.MouseEventHandler<HTMLDivElement>
}

const BlackButton = ({ children, onClick }: BlackButtonProps) => {
  const location = useLocation()

  // TODO: Type the app context
  const appContext = useContext<any>(AppContext)

  return (
    <StyledBlackButton
      className="black-button"
      onClick={onClick || undefined}
      role="button"
    >
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
