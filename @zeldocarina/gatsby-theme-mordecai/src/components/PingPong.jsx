import React, { useContext } from "react"
import { Link } from "gatsby"
import styled, { css } from "styled-components"
import respond from "../styles/abstracts/mediaqueries"

import { buildLink, parseMarkdown } from "../helpers/helpers"

import IntroSection from "./IntroSection"
import AppContext from "../context/AppContext"
import { normalButtonCss } from "../styles/utils/components"

const StyledPingPong = styled.section`
  .items-container {
    display: grid;
    gap: var(--big-gutter);
    row-gap: var(--section-gutter);
  }

  .ping-pong-item {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 10rem;
    align-items: center;

    ${({ isTextJustified }) => {
      if (isTextJustified) return "text-align: justify;"
      return "text-align: left;"
    }}

    ${respond(
      1194,
      css`
        display: block;
        text-align: center;
      `
    )}

    &:first-child {
      ${respond(
        500,
        css`
          margin-top: var(--big-gutter);
        `
      )}
    }

    .text-container {
      ${respond(
        1194,
        css`
          text-align: left;
        `
      )}
    }

    .image {
      width: 100%;
      border-radius: 50%;
      border-color: var(--white);
      border-style: solid;
      border-width: 10px;

      ${respond(
        1194,
        css`
          width: 50%;
          text-align: center;
        `
      )}
      ${respond(
        500,
        css`
          width: 70%;
          text-align: center;
        `
      )}
    }

    .intro-section {
      margin: 0;
      padding: 0;
      max-width: 100%;

      .heading {
        font-size: 3rem;
        margin-bottom: var(--big-gutter);
      }

      &::after {
        display: none;
      }
    }

    &--alt {
      grid-template-columns: 1.2fr 1fr;
      text-align: right;

      ul {
        list-style: none;
        text-align: left;
        width: 90%;
        transform: translateX(10%);
        margin-top: var(--gutter);

        ${respond(
          1194,
          css`
            transform: translateX(0);
            width: 100%;
            margin-top: inherit;
          `
        )}

        li {
          &::before {
            content: "• ";
          }
        }
      }

      ${respond(
        1194,
        css`
          display: block;
          grid-template-columns: 1fr;
          gap: 5rem;
          text-align: center;
        `
      )}

      .intro-section {
        .heading {
          text-align: right;

          ${respond(
            1194,
            css`
              text-align: left;
            `
          )}
        }
      }

      .image {
        grid-column: 2 / 3;
      }

      .text-container {
        grid-column: 1 / 2;
        grid-row: 1 / 2;

        ${respond(
          1194,
          css`
            text-align: left;
          `
        )}
      }
    }
  }

  ${normalButtonCss}
`

const PingPong = ({
  heading,
  subheading,
  superheading,
  items,
  backgroundOverride,
  sectionId,
}) => {
  const {
    shortcodesData,
    businessPhoneData,
    appVariables: { isTextJustified },
  } = useContext(AppContext)

  return (
    <StyledPingPong
      id={sectionId}
      backgroundOverride={backgroundOverride}
      isTextJustified={isTextJustified}
    >
      <div className="container">
        <IntroSection
          superheading={superheading}
          subheading={subheading}
          heading={heading}
        />
        <div className="items-container">
          {items.map(({ id, data }, i) => {
            const image = data?.Media?.localFiles[0].publicURL

            return (
              <article
                className={
                  i % 2 !== 0
                    ? "ping-pong-item ping-pong-item--alt"
                    : "ping-pong-item"
                }
                key={id}
              >
                <img src={image} alt={data.AltText} className="image" />
                <div className="text-container">
                  <IntroSection heading={data.Heading} />
                  <div className="text">
                    {parseMarkdown({
                      inputMarkdown: data.Copy,
                      businessName: shortcodesData.business.value,
                      businessAddress: shortcodesData.address.value,
                      zipCode: shortcodesData.zipcode.value,
                      city: shortcodesData.city.value,
                      state: shortcodesData.state.value,
                      phone: businessPhoneData.phone,
                      tel: businessPhoneData.tel,
                      businessEmail: shortcodesData.businessEmail.value,
                      siteUrl: shortcodesData.siteUrl.value,
                    })}
                  </div>
                  {data.ButtonLabel && data.ButtonLink && (
                    <Link
                      className="button"
                      to={buildLink(
                        data.ButtonLink,
                        shortcodesData.cityState.value
                      )}
                    >
                      {data.ButtonLabel}
                    </Link>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </StyledPingPong>
  )
}

export default PingPong
