import React, { useContext } from "react"
import styled, { css } from "styled-components"
import { Link } from "gatsby"

import FooterSocialIcons from "./FooterSocialIcons"
import respond from "../styles/abstracts/mediaqueries"
import { hexToRGB } from "../helpers/helpers"
import { buildLink } from "../helpers/helpers"

import AppContext from "../context/AppContext"

const StyledFooter = styled.footer`
  background-image: ${({ $colors }) => {
    return `linear-gradient(to bottom, ${hexToRGB(
      $colors.colorSecondary,
      1,
    )} 0%, ${hexToRGB($colors.colorSecondary, 0.4)} 100%)`
  }};

  padding: var(--section-gutter) 0;
  color: var(--white);
  font-size: 2rem;

  ${respond(
    1440,
    css`
      font-size: 2.5rem;
    `,
  )}
  ${respond(
    500,
    css`
      font-size: 2rem;
    `,
  )}

  a {
    color: var(--white);
    font-weight: 500;
  }

  .container {
    margin-top: var(--big-gutter);
    display: grid;
    grid-template-columns: 1fr 1px 1fr;
    gap: 8rem;
    max-width: 75%;
    justify-content: center;
    justify-items: center;

    ${respond(
      1440,
      css`
        display: block;
      `,
    )}
  }

  .column {
    /* background-color: var(--color-tertiary); */
    padding: 3rem;

    &--quick-links {
      justify-self: flex-end;

      ul {
      }

      .small-title {
        text-align: right;

        ${respond(
          1440,
          css`
            text-align: center;
          `,
        )}
      }
    }

    &--hr {
      align-self: center;
      width: 1px;
      height: 70%;
      background-color: var(--white);
      border: none;
    }

    &--location {
      justify-self: flex-start;

      .small-title {
        text-align: left;

        ${respond(
          1440,
          css`
            text-align: center;
          `,
        )}
      }
    }
  }

  ${respond(
    412,
    css`
      padding: 3rem 0;
    `,
  )}

  &--location {
    p {
      text-align: left;
    }
  }

  .logo {
    margin-left: 50%;
    margin-bottom: var(--big-gutter);
    transform: translateX(-50%);
    width: ${({ $whiteLogoSize }) => {
      return $whiteLogoSize ? `${$whiteLogoSize} !important` : "35rem"
    }};

    ${respond(
      1440,
      css`
        width: 30rem;
      `,
    )}
  }

  .privacy-container {
    margin: 1.5rem auto;
    text-align: center;

    .privacy-link {
      &::after {
        content: "|";
        margin: 0 var(--gutter);
      }
    }
  }
  .copyright {
    text-align: center;
    color: var(--white);

    ${respond(
      1440,
      css`
        text-align: center;
        max-width: 90%;
        margin: 0 auto;
      `,
    )}
  }

  .small-title {
    color: var(--white);

    ${respond(
      1440,
      css`
        font-size: 4rem;
      `,
    )}
    ${respond(
      500,
      css`
        font-size: 3rem;
      `,
    )}
  }

  .quick-links {
    text-align: right;
    ${respond(
      1440,
      css`
        text-align: center;
      `,
    )}
    ${respond(
      500,
      css`
        padding-left: 0;
      `,
    )}

    ul {
      list-style: none;
    }

    .quick-link {
      a {
        text-transform: uppercase;
        transition: color 0.2s ease-in-out;

        &:hover {
          color: var(--color-primary);
        }
      }
    }
  }

  .call {
    text-align: center;
  }

  .location-item {
    text-align: left;
    color: var(--white);

    ${respond(
      1440,
      css`
        text-align: center;
      `,
    )}
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`

const Footer = ({
  logo,
  whiteLogoSize,
  socialLinks,
  businessName,
  quickLinks,
  mainAddress,
  addresses,
  city,
  zip,
  state,
  phoneNumber,
  tel,
}) => {
  const { colors, shortcodesData } = useContext(AppContext)
  return (
    <StyledFooter $colors={colors} $whiteLogoSize={whiteLogoSize}>
      <Link to="/">
        <img className="logo" src={logo} alt={`${businessName} logo`} />
      </Link>
      <p className="copyright">
        &copy; {new Date().getFullYear()} {businessName} - {city}, {state}.
        <br />
        All Rights Reserved.{" "}
      </p>
      <p className="privacy-container">
        <Link className="privacy-link" to="/privacy-policy">
          Privacy Policy
        </Link>
        <Link to="/terms-of-use">Terms of Use</Link>
      </p>
      <p className="call">
        <a href={"tel:" + tel}>{phoneNumber}</a>
      </p>
      <div className="container">
        <div className="column column--quick-links">
          <h6 className="small-title">QUICK LINKS</h6>
          <nav className="quick-links">
            <ul>
              {quickLinks.map(quickLink => {
                const link = buildLink(
                  quickLink.data.Permalink,
                  shortcodesData.cityState.value,
                )
                const linkTitle = quickLink.data.Child
                const isExternalLink = link.startsWith("http")

                return (
                  <li className="quick-link" key={quickLink.id}>
                    {isExternalLink ? (
                      <a href={link}>{linkTitle}</a>
                    ) : (
                      <Link to={link}>{linkTitle}</Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
        <hr className="column--hr" />
        <div className="column column--location">
          <h6 className="small-title">LOCATION INFO</h6>
          <p className="location-item">
            {mainAddress}, {city}, {state}, {zip}
          </p>
          {addresses.map(address => {
            return (
              <p className="location-item" key={address.id}>
                {address.data.Value}
              </p>
            )
          })}
          <FooterSocialIcons socialLinks={socialLinks} />
        </div>
      </div>
    </StyledFooter>
  )
}

export default Footer
