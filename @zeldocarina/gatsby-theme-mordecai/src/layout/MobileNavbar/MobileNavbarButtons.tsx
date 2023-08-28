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

interface MobileNavbarButtonsProps {
  closeMenu: React.MouseEventHandler<any>
  appointmentButtonUrl: string
  appointmentButtonLabel: string
  dentalOfferButtonUrl: string
  dentalOfferButtonLabel: string
}

interface ButtonProps {
  closeMenu: React.MouseEventHandler<any>
  url: string
  label: string
  isBlack?: boolean
}

const Button: React.FC<ButtonProps> = ({ closeMenu, url, label, isBlack }) => {
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

interface MobileNavbarButtonsProps {
  closeMenu: React.MouseEventHandler<any>
  appointmentButtonUrl: string
  appointmentButtonLabel: string
  dentalOfferButtonUrl: string
  dentalOfferButtonLabel: string
}

const MobileNavbarButtons: React.FC<MobileNavbarButtonsProps> = ({
  closeMenu,
  appointmentButtonUrl,
  appointmentButtonLabel,
  dentalOfferButtonLabel,
  dentalOfferButtonUrl,
}) => {
  console.log(closeMenu)

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
