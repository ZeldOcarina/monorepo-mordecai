import React from "react"
import styled, { css } from "styled-components"

import Accordion from "@material-ui/core/Accordion"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import AccordionDetails from "@material-ui/core/AccordionDetails"

import openAccordionIcon from "../images/open-accordion.svg"
import closeAccordionIcon from "../images/close-accordion.svg"
import { IoChevronDownOutline, IoChevronForwardOutline } from "react-icons/io5"
import respond from "../styles/abstracts/mediaqueries"

const StyledMultipleAccordion = styled.div`
  .accordion {
    background-color: transparent;
    border: 1px solid transparent;
    box-shadow: none;

    &__summary {
      color: ${({ $textColor }) => $textColor || "var(--body-color)"};
      text-transform: uppercase;
      font-weight: 700;
      transition: all 0.3s ease;

      &--active {
        transform: translateX(15px) scale(1.15);
      }
    }

    &__details {
      font-size: 1.6rem;
      color: ${({ $textColor }) => $textColor || "var(--body-color)"};
      text-align: right;
      display: block;

      ${respond(
        "big-desktop",
        css`
          font-size: 2.6rem;
        `,
      )}
    }
  }

  .icon {
  }

  .close-icon {
  }
`

const StyledChevronDown = styled(IoChevronDownOutline)`
  color: ${({ $textColor }) => $textColor || "var(--body-color)"};
  margin-left: 1rem;
  width: 20px;
  transform: translateY(28%);
`

const StyledChevronForward = styled(IoChevronForwardOutline)`
  color: ${({ $textColor }) => $textColor || "var(--body-color)"};
  margin-left: 1rem;
  width: 20px;
  transform: translateY(30%);
`

const MultipleAccordion = ({
  summary,
  details,
  accordionsState,
  setAccordionsState,
  index,
  textColor,
}) => {
  function handleAccordionChange(_, expanded) {
    setAccordionsState(oldAccordionState => {
      const newState = []
      oldAccordionState.forEach(item => {
        newState.push({ ...item, isOpen: false })
      })
      newState[index].isOpen = expanded
      return newState
    })
  }

  const isOpen =
    typeof window !== "undefined" && (accordionsState[index]?.isOpen || false)

  return (
    <StyledMultipleAccordion
      className="multiple-accordion"
      $textColor={textColor}
    >
      <Accordion
        className="accordion"
        onChange={handleAccordionChange}
        expanded={isOpen}
      >
        <AccordionSummary
          className={
            isOpen
              ? "accordion__summary accordion__summary--active"
              : "accordion__summary"
          }
        >
          {summary}{" "}
          {accordionsState[index]?.isOpen ? (
            <StyledChevronDown
              className="close-icon"
              alt="close"
              $textColor={textColor}
            />
          ) : (
            <StyledChevronForward
              className="icon"
              alt="open"
              $textColor={textColor}
            />
          )}
        </AccordionSummary>
        <AccordionDetails className="accordion__details">
          {details}
        </AccordionDetails>
      </Accordion>
    </StyledMultipleAccordion>
  )
}

export default MultipleAccordion
