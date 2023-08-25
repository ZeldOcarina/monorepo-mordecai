import React from "react"
import styled, { css } from "styled-components"
import { Link } from "gatsby"
import respond from "../styles/abstracts/mediaqueries"
import isExternalUrl from "../helpers/isExternalUrl"

const StyledFloatingButton = styled.div`
  border-top-left-radius: 35px;
  border-bottom-left-radius: 35px;
  text-transform: uppercase;

  ${respond(
    "big-desktop",
    css`
      border-top-left-radius: 60px;
      border-bottom-left-radius: 60px;
    `,
  )}

  .button {
    background-color: ${({ $bgColor }) => $bgColor};
    color: ${({ $color }) => $color};
    padding: 2rem 3rem;
    display: block;
    border-top-left-radius: 35px;
    border-bottom-left-radius: 35px;
    font-size: 1.6rem;
    transition: all 0.15s ease-in-out;

    ${respond(
      "big-desktop",
      css`
        font-size: 3rem;
        border-top-left-radius: 60px;
        border-bottom-left-radius: 60px;
      `,
    )}

    &:hover {
      background-color: ${({ $hoverBgColor }) => $hoverBgColor};
    }
  }
`

const FloatingButton = ({
  children,
  url,
  bgColor,
  color,
  hoverBgColor,
  state,
}) => {
  const isNormalLink = isExternalUrl(url)

  const linkComponent = isNormalLink ? (
    <a href={url} className="button">
      {children}
    </a>
  ) : (
    <Link to={url} className="button" state={state}>
      {children}
    </Link>
  )
  return (
    <StyledFloatingButton
      $bgColor={bgColor}
      $color={color}
      $hoverBgColor={hoverBgColor}
    >
      {linkComponent}
    </StyledFloatingButton>
  )
}

export default FloatingButton
