import React from "react"
import styled, { css } from "styled-components"
import respond from "../styles/abstracts/mediaqueries"

import IntroSection from "./IntroSection"

const StyledSocialFeed = styled.section`
  .text-container {
    width: 80%;
    margin: 0 auto;
  }
  .images-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
    width: 80%;
    margin: 0 auto;
    justify-content: center;
    gap: var(--gutter);

    ${respond(
      1024,
      css`
        width: 100%;
        grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
      `
    )}

    img {
      width: 100%;
    }
  }
`

const SocialFeed = ({ superheading, heading, subheading, images }) => {
  return (
    <StyledSocialFeed>
      <div className="text-container">
        <IntroSection
          superheading={superheading}
          heading={heading}
          subheading={subheading}
        />
      </div>
      <div className="images-container">
        {images.map(image => {
          return (
            <div key={image.id} className="image-container">
              <a href={image.data.ButtonLink}>
                <img
                  src={image?.data?.Media?.localFiles[0]?.publicURL}
                  alt={image.data.AltText}
                />
              </a>
            </div>
          )
        })}
      </div>
    </StyledSocialFeed>
  )
}

export default SocialFeed
