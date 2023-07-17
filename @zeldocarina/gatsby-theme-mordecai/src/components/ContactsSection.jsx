import React, { useState, useEffect, useContext } from "react"
import styled, { css } from "styled-components"
import { Link } from "gatsby"
import ShortcodesParser from "../helpers/ShortcodesParser"

import MultipleAccordion from "./MultipleAccordion"

import respond from "../styles/abstracts/mediaqueries"
import AppContext from "../context/AppContext"

const StyledContactsSection = styled.section`
  padding-top: 0;
  padding-bottom: 0;
  position: relative;
  z-index: 1;
  background: ${({ bgImage }) => `url(${bgImage})`};
  background-attachment: fixed;
  background-position: top left;
  background-repeat: no-repeat;
  background-size: cover;
  height: 80vh;

  ${respond(
    1194,
    css`
      height: auto;
      padding: var(--section-gutter) 0;
    `
  )}

  .intro-section {
    position: relative;
    text-align: center;
    margin: 0 auto;
    color: var(--body-color);

    h3,
    h2 {
      text-align: center;
      margin: var(--gutter) auto;
      color: var(--body-color);
    }
  }

  .container {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    height: 100%;

    ${respond(
      1194,
      css`
        max-width: 100%;
      `
    )}
    ${respond(
      500,
      css`
        margin: 0 auto;
        padding: 0;
      `
    )}
    ${respond(
      400,
      css`
        max-width: 95% !important;
      `
    )}
  }

  .cards-container {
    display: grid;
    grid-template-columns: 1fr 1.3fr 1fr;
    grid-template-rows: 1fr 0;
    row-gap: 0;
    column-gap: 50px;

    ${respond(
      1194,
      css`
        grid-template-columns: 1fr;
        margin-top: 0;
        row-gap: 10px;
        grid-template-rows: auto;
        width: 70%;
        margin: 0 auto;
      `
    )}
    ${respond(
      500,
      css`
        width: 100%;
      `
    )}
    ${respond(
      "big-desktop",
      css`
        column-gap: 10rem;
      `
    )}
  }

  .card {
    background-color: var(--white);
    padding: 5rem;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    ${respond(
      400,
      css`
        padding: 2rem;
      `
    )}

    .accordion__details {
      text-align: left;
      ${respond(
        500,
        css`
          text-align: left;
        `
      )}
    }

    .button {
      padding: 2rem 3rem;
      margin: 3rem auto;
    }

    .phone-number {
      display: block;
      color: var(--body-color);
      font-family: var(--heading-font);
      font-size: 3rem;
      font-weight: 300;
      text-align: center;
      margin-top: var(--gutter);
    }

    h4 {
      color: var(--body-color);
      font-weight: 500;
      font-size: 2rem;
      text-align: center;
      text-transform: uppercase;
      font-weight: 700;
    }
    h6 {
      font-weight: 700;
      color: var(--body-color);
      font-size: var(--body-font-size);
      margin-bottom: var(--gutter);
      text-transform: uppercase;
    }
    color: var(--body-color);

    &--center {
      box-sizing: border-box;

      ${respond(
        1194,
        css`
          padding-top: 5rem;
          transform: scale(0) translateY(0);
        `
      )}

      ${respond(
        "big-desktop",
        css`
          /* transform: translateY(-30%);
          padding-top: 16.5rem; */
        `
      )}
    }
  }

  .schedule {
    p {
      display: grid;
      grid-template-columns: 1fr 1.3fr;
      gap: var(--gutter);
      align-items: center;
    }
  }

  .button {
    color: var(--white);
    background-color: var(--color-secondary);
    border-radius: 40px;
    margin: var(--gutter) auto;
    display: block;
    width: max-content;

    ${respond(
      "big-desktop",
      css`
        border-radius: 60px;
      `
    )}
  }

  .big-card {
    transform: scale(1.15);
    position: relative;

    ${respond(
      1194,
      css`
        transform: scale(1);
      `
    )}
    ${respond(
      "big-desktop",
      css`
        transform: scaleX(1.2) scaleY(1.5);
      `
    )}

    &__content {
      ${respond(
        "big-desktop",
        css`
          position: absolute;
          top: 50%;
          left: 50%;
          font-size: 5rem;
          transform: scaleX(0.8333333333) scaleY(0.6666666667)
            translate(-58.3333333333%, -66.66666667%);

          h4,
          p {
            font-size: 4rem;
          }

          .phone-number {
            font-size: 4rem;
          }
        `
      )}
      ${respond(
        500,
        css`
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        `
      )}

      .button {
        ${respond(
          360,
          css`
            margin-bottom: auto;
          `
        )}
      }
    }
  }
`

const ContactsSection = ({
  bigCardHeading,
  officeHours,
  items,
  phone,
  tel,
  bgImage,
}) => {
  const [accordionsState, setAccordionsState] = useState([])

  useEffect(() => {
    const initialAccordionsState = items.map((item, i) => {
      if (i === 0) {
        return { ...item, isOpen: true }
      }
      return { ...item, isOpen: false }
    })
    setAccordionsState(initialAccordionsState)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { isiPad, shortcodesData } = useContext(AppContext)

  return (
    <StyledContactsSection bgImage={bgImage}>
      <div className="container">
        <div className="cards-container">
          <div className="card">
            <h6>OFFICE HOURS</h6>
            <div className="schedule">
              {officeHours.map(({ id, data }) => {
                return (
                  <p key={id}>
                    <span>{data.Label}</span> <span>{data.Value}</span>
                  </p>
                )
              })}
            </div>
          </div>
          <div
            className={isiPad ? "card big-card" : "card big-card card--center"}
          >
            <div className="big-card__content">
              <h4>
                {new ShortcodesParser(
                  bigCardHeading,
                  shortcodesData
                ).parseShortcodes()}
              </h4>
              <p>
                <a className="phone-number" href={`tel:${tel}`}>
                  {phone}
                </a>
                <Link to="/contact-us" className="button">
                  REQUEST APPOINTMENT
                </Link>
              </p>
            </div>
          </div>
          <div className="card">
            <div className="items-container">
              {accordionsState?.map((item, i) => {
                return (
                  <MultipleAccordion
                    key={item.id}
                    summary={item.data.Heading}
                    details={new ShortcodesParser(
                      item.data.Copy,
                      shortcodesData
                    ).parseShortcodes()}
                    accordionsState={accordionsState}
                    setAccordionsState={setAccordionsState}
                    index={i}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </StyledContactsSection>
  )
}

export default ContactsSection
