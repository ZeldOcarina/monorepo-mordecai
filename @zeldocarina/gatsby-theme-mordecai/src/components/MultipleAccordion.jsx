import React from "react"
import styled, { css } from "styled-components"

import Accordion from "@material-ui/core/Accordion"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import AccordionDetails from "@material-ui/core/AccordionDetails"

import openAccordionIcon from "../images/open-accordion.svg"
import closeAccordionIcon from "../images/close-accordion.svg"
import respond from "../styles/abstracts/mediaqueries"

const StyledMultipleAccordion = styled.div`
  .accordion {
    background-color: transparent;
    border: 1px solid transparent;
    box-shadow: none;

    &__summary {
      color: var(--body-color);
      text-transform: uppercase;
      font-weight: 700;
      transition: all 0.3s ease;

      &--active {
        transform: translateX(15px) scale(1.15);
      }
    }

    &__details {
      font-size: 1.6rem;
      color: var(--body-color);
      text-align: right;
      display: block;

      ${respond(
        "big-desktop",
        css`
          font-size: 2.6rem;
        `
      )}
    }
  }

  .icon {
    margin-left: 1rem;
    width: 7px;
  }

  .close-icon {
    margin-left: 1rem;
    width: 10px;
    filter: brightness(0);
  }
`

const MultipleAccordion = ({
  summary,
  details,
  accordionsState,
  setAccordionsState,
  index,
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
    <StyledMultipleAccordion className="multiple-accordion">
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
            <img src={closeAccordionIcon} className="close-icon" alt="close" />
          ) : (
            <img src={openAccordionIcon} className="icon" alt="open" />
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
