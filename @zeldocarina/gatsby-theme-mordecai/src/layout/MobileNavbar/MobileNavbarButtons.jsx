import React from "react"
import styled, { css } from "styled-components"
import respond from "../../styles/abstracts/mediaqueries"

import { Link } from "gatsby"
import isExternalUrl from "../../helpers/isExternalUrl"

const StyledMobileNavbarButtons = styled.div`
  display: grid;
  grid-template-columns: max-content max-content;
  gap: 1rem;
  justify-content: center;
  justify-items: center;
  align-items: center;
  height: max-content;

  .button {
    background-color: var(--appointment-button-color);
    color: var(--appointment-button-text-color);
    border-radius: 50px;
    display: flex;
    align-items: center;
    height: max-content;
    border: none;
    padding: 1.5rem 2rem;

    ${respond(
      450,
      css`
        font-size: 1.4rem;
      `,
    )}
  }

  .black-button {
    background-color: var(--dental-offer-button-color);
    color: var(--dental-offer-button-text-color);

    ${respond(
      450,
      css`
        font-size: 1.4rem;
      `,
    )}

    a {
      color: var(--dental-offer-button-text-color);
    }
  }
`

/**
 * Button component
 * ----------------
 * @param {Object} props - The properties for the Button component.
 * @param {React.MouseEventHandler<any>} props.closeMenu - Function that closes the menu.
 * @param {string} props.url - The URL for the button.
 * @param {string} props.label - The label text for the button.
 * @param {boolean} [props.isBlack] - Whether the button should be black or not. Optional.
 */

const Button = ({ closeMenu, url, label, isBlack }) => {
  const isExternal = isExternalUrl(url)

  const commonProps = {
    className: `button${isBlack ? " black-button" : ""}`,
  }

  return isExternal ? (
    <a href={url} {...commonProps} onClick={closeMenu}>
      {label}
    </a>
  ) : (
    <Link to={url} {...commonProps} onClick={closeMenu}>
      {label}
    </Link>
  )
}

/**
 * MobileNavbarButtons
 * -------------------
 * @param {Object} props
 * @param {React.MouseEventHandler<any>} props.closeMenu
 * @param {string} props.appointmentButtonUrl
 * @param {string} props.appointmentButtonLabel
 * @param {string} props.dentalOfferButtonUrl
 * @param {string} props.dentalOfferButtonLabel
 */

const MobileNavbarButtons = ({
  closeMenu,
  appointmentButtonUrl,
  appointmentButtonLabel,
  dentalOfferButtonLabel,
  dentalOfferButtonUrl,
}) => {
  return (
    <StyledMobileNavbarButtons>
      <Button
        closeMenu={closeMenu}
        url={appointmentButtonUrl}
        label={appointmentButtonLabel}
      />
      <Button
        closeMenu={closeMenu}
        url={dentalOfferButtonUrl}
        label={dentalOfferButtonLabel}
        isBlack
      />
    </StyledMobileNavbarButtons>
  )
}

export default MobileNavbarButtons
