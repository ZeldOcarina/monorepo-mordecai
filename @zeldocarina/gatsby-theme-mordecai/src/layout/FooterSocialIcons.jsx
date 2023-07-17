import React from "react"
import styled, { css } from "styled-components"
import respond from "../styles/abstracts/mediaqueries"

import {
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaPinterest,
  FaYoutube,
  FaYelp,
  FaTwitter,
} from "react-icons/fa"

const StyledFooterSocialIcons = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: var(--section-gutter);
  gap: var(--gutter);

  ${respond(
    1440,
    css`
      justify-content: center;
    `
  )}
  ${respond(
    "big-desktop",
    css`
      margin-top: 8rem;
      gap: 3rem;
    `
  )}

  .icon {
    font-size: 3rem;

    ${respond(
      "big-desktop",
      css`
        font-size: 5rem;
      `
    )}

    &:hover {
      color: var(--color-primary) !important;
    }
  }
`

const FooterSocialIcons = ({ socialLinks }) => {
  const facebookLink = socialLinks.find(
    socialLink => socialLink.data.Label === "Facebook"
  )
  const instagramLink = socialLinks.find(
    socialLink => socialLink.data.Label === "Instagram"
  )
  const twitterLink = socialLinks.find(
    socialLink => socialLink.data.Label === "Twitter"
  )
  const youTubeLink = socialLinks.find(
    socialLink => socialLink.data.Label === "Youtube"
  )
  const linkedInLink = socialLinks.find(
    socialLink => socialLink.data.Label === "LinkedIn"
  )
  const pinterestLink = socialLinks.find(
    socialLink => socialLink.data.Label === "Pinterest"
  )
  const yelpLink = socialLinks.find(
    socialLink => socialLink.data.Label === "Yelp"
  )

  return (
    <StyledFooterSocialIcons>
      {instagramLink?.data.Value && (
        <div role="link" tabIndex={0}>
          <a href={instagramLink.data.Value} target="_blank" rel="noreferrer">
            <FaInstagram color="white" className="icon" />
          </a>
        </div>
      )}
      {facebookLink?.data.Value && (
        <div role="link" tabIndex={0}>
          <a href={facebookLink.data.Value} target="_blank" rel="noreferrer">
            <FaFacebook color="white" className="icon" />
          </a>
        </div>
      )}
      {twitterLink && twitterLink.data.Value && (
        <div>
          <a href={twitterLink.data.Value} target="_blank" rel="noreferrer">
            <FaTwitter color="white" className="icon" />
          </a>
        </div>
      )}
      {youTubeLink?.data.Value && (
        <div>
          <a href={youTubeLink.data.Value} target="_blank" rel="noreferrer">
            <FaYoutube color="white" className="icon" />
          </a>
        </div>
      )}
      {linkedInLink?.data.Value && (
        <div>
          <a href={linkedInLink.data.Value} target="_blank" rel="noreferrer">
            <FaLinkedin color="white" className="icon" />
          </a>
        </div>
      )}
      {pinterestLink?.data.Value && (
        <div>
          <a href={pinterestLink.data.Value} target="_blank" rel="noreferrer">
            <FaPinterest color="white" className="icon" />
          </a>
        </div>
      )}
      {yelpLink?.data.Value && (
        <div>
          <a href={yelpLink.data.Value} target="_blank" rel="noreferrer">
            <FaYelp color="white" className="icon" />
          </a>
        </div>
      )}
    </StyledFooterSocialIcons>
  )
}

export default FooterSocialIcons
