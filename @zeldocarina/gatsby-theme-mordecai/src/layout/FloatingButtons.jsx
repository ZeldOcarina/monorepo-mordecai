import React, { useState, useContext } from "react"
import styled, { css } from "styled-components"
import respond from "../styles/abstracts/mediaqueries"
import { useLocation } from "@reach/router"

import { hexToRGB } from "../helpers/helpers"

import AppContext from "../context/AppContext"

import FloatingButton from "../components/FloatingButton"
import { BsPhoneFill } from "react-icons/bs"
import { useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"

const mobileStyles = css`
  top: initial;
  bottom: 15rem;
  transform: translateY(50%);
`
const StyledFloatingButtons = styled.div`
  position: fixed;
  top: ${({ $isWindowScrolled }) => ($isWindowScrolled ? "15rem" : "30rem")};
  right: 0;
  transform: translateY(-50%);
  display: grid;
  gap: 1rem;
  z-index: 1000;
  transition: top 0.3s ease-in-out;

  ${respond("no-hover", mobileStyles)}
  ${({ $mobileNavbarBreakpoint }) => {
    return respond($mobileNavbarBreakpoint, mobileStyles)
  }}
  
  ${respond(
    768,
    css`
      right: 5rem;
      bottom: 20rem;
    `,
  )}
  ${respond(
    844,
    css`
      display: none;
    `,
  )}

  ${respond(
    "big-desktop",
    css`
      top: 25rem;
    `,
  )}

  .phone-link {
    font-size: 2rem;
    display: flex;
    align-items: center;
    color: var(--color-primary);

    ${respond(
      "big-desktop",
      css`
        font-size: 3rem;
      `,
    )}
  }
`

const FloatingButtons = ({ phone, tel }) => {
  const {
    appointmentButtonLabelData,
    appointmentButtonUrlData,
    dentalOfferButtonLabelData,
    dentalOfferButtonUrlData,
  } = useStaticQuery(query)
  const [isWindowScrolled, setIsWindowScrolled] = useState(false)

  const { colors, appVariables } = useContext(AppContext)

  const location = useLocation()

  useEffect(() => {
    // If it's the home page return
    if (
      location.pathname === "/" &&
      window.matchMedia("(min-width: 1650px)").matches
    )
      return setIsWindowScrolled(true)
    function handleScroll() {
      window.scrollY === 0
        ? setIsWindowScrolled(false)
        : setIsWindowScrolled(true)
    }
    // Make navbar fixed on scroll
    document.addEventListener("scroll", handleScroll)
    // Clean up event listener
    return () => {
      document.removeEventListener("scroll", handleScroll)
    }
  })

  return (
    <StyledFloatingButtons
      $mobileNavbarBreakpoint={appVariables.mobileNavbarBreakpoint}
      $isWindowScrolled={isWindowScrolled}
    >
      <FloatingButton
        bgColor={hexToRGB(colors.appointmentButtonColor, 0.8)}
        hoverBgColor={hexToRGB(colors.appointmentButtonHoverColor, 0.8)}
        color="var(--white)"
        url={
          appointmentButtonUrlData?.appointmentButtonUrlData.Value ||
          "/contact-us"
        }
      >
        {appointmentButtonLabelData?.appointmentButtonLabelData.Value ||
          "APPOINTMENTS"}
      </FloatingButton>
      <FloatingButton
        url={
          dentalOfferButtonUrlData?.dentalOfferButtonUrlData.Value ||
          "/dental-offer"
        }
        bgColor={hexToRGB(colors.dentalOfferButtonColor, 0.8)}
        hoverBgColor={hexToRGB(colors.dentalOfferButtonHoverColor, 0.8)}
        color="var(--white)"
        state={
          dentalOfferButtonUrlData &&
          dentalOfferButtonUrlData.dentalOfferButtonUrlData.Value
            ? null
            : { fromPage: location.pathname }
        }
      >
        {dentalOfferButtonLabelData?.dentalOfferButtonLabelData.Value ||
          "DENTAL OFFER"}
      </FloatingButton>
      <a className="phone-link" href={`tel:${tel}`}>
        <BsPhoneFill />
        &nbsp;{phone}
      </a>{" "}
    </StyledFloatingButtons>
  )
}

const query = graphql`
  query FloatingButtons {
    appointmentButtonLabelData: airtable(
      table: { eq: "Config" }
      data: {
        Category: { eq: "Floating Buttons" }
        Label: { eq: "appointmentButtonLabel" }
      }
    ) {
      appointmentButtonLabelData: data {
        Value
      }
    }
    appointmentButtonUrlData: airtable(
      table: { eq: "Config" }
      data: {
        Category: { eq: "Floating Buttons" }
        Label: { eq: "appointmentButtonUrl" }
      }
    ) {
      appointmentButtonUrlData: data {
        Value
      }
    }
    dentalOfferButtonLabelData: airtable(
      table: { eq: "Config" }
      data: {
        Category: { eq: "Floating Buttons" }
        Label: { eq: "dentalOfferButtonLabel" }
      }
    ) {
      dentalOfferButtonLabelData: data {
        Value
      }
    }
    dentalOfferButtonUrlData: airtable(
      table: { eq: "Config" }
      data: {
        Category: { eq: "Floating Buttons" }
        Label: { eq: "dentalOfferButtonUrl" }
      }
    ) {
      dentalOfferButtonUrlData: data {
        Value
      }
    }
  }
`

export default FloatingButtons
