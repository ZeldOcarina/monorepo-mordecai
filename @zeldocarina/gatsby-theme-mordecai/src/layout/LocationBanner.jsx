import React, { useContext } from "react"
import styled, { css } from "styled-components"
import respond from "../styles/abstracts/mediaqueries"
import { buildLink } from "../helpers/helpers"

import AppContext from "../context/AppContext"

const StyledLocationBanner = styled.div`
  position: relative;
  z-index: 1000;
  background-color: var(--location-bar-bg-bolor);
  color: var(--white);
  padding: 0.5rem 0;
  font-size: 1.6rem;

  ${respond(
    1024,
    css`
      font-size: 1.4rem;
    `
  )}
  ${respond(
    926,
    css`
      display: none;
    `
  )}
  ${respond(
    "big-desktop",
    css`
      font-size: 2.2rem;
    `
  )}

  .content-container {
    display: flex;
    justify-content: flex-end;
    font-weight: 500;
    max-width: 97.5%;

    ${respond(
      1500,
      css`
        max-width: 95%;
      `
    )}
  }

  a {
    color: var(--white);
  }
  /* 
  .location {
    margin-right: var(--gutter);
  } */
  .aux-links {
    &::before {
      content: " | ";
      margin: 0 1rem;
    }
  }

  .aux-link {
    &:not(:last-child) {
      &::after {
        content: " | ";
        margin: 0 1rem;
      }
    }
  }
`

const LocationBanner = ({
  phone,
  tel,
  state,
  city,
  address,
  zip,
  auxLinks,
  cityState,
}) => {
  const { locationBarRef } = useContext(AppContext)

  return (
    <StyledLocationBanner ref={locationBarRef}>
      <div className="content-container">
        <p className="location">
          Conveniently Located at {address} {city}, {state} {zip}
        </p>
        {auxLinks && auxLinks.length > 0 && (
          <div className="aux-links">
            {auxLinks.map((link, index) => (
              <span key={link.id} className="aux-link">
                <a href={buildLink(link.data.Permalink, cityState)}>
                  {link.data.Child}
                </a>
              </span>
            ))}
          </div>
        )}
      </div>
    </StyledLocationBanner>
  )
}

export default LocationBanner
