import React, { useContext } from "react"
import styled, { css } from "styled-components"
import respond from "../styles/abstracts/mediaqueries"
import { LocationContext } from "../context/LocationContext"

import ipsumLogo from "../images/gatsby-logo.svg"
import { Link } from "gatsby"
import { createLinkWithParams } from "../utils/utils"

const StyledNavLogo = styled.nav`
  display: flex;
  justify-content: center;
  padding: 0;

  img {
    width: 35rem;

    ${respond(
      "phone-port",
      css`
        width: 50%;
        margin-left: 50%;
        transform: translateX(-50%);
      `
    )}
  }
`

const NavLogo = () => {
  const { params } = useContext(LocationContext)
  const link = createLinkWithParams("/", params)
  return (
    <StyledNavLogo>
      <Link to={link}>
        <img src={ipsumLogo} alt="Ipsum" />
      </Link>
    </StyledNavLogo>
  )
}

export default NavLogo
