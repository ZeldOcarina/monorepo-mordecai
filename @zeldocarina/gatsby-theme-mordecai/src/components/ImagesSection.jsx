import React from "react"
import styled, { css } from "styled-components"
import respond from "../styles/abstracts/mediaqueries"

import IntroSection from "./IntroSection"

const StyledImagesSection = styled.section`
  background-color: var(--white);
  padding: var(--section-gutter) 0 15rem 0;

  .intro-section {
  }

  .images-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--big-gutter);
    width: 80%;
    margin: 0 auto;
    justify-content: center;

    ${respond(
      1440,
      css`
        width: 90%;
        gap: var(--gutter);
      `
    )}

    .image-container {
      background-color: var(--white);
      width: 27rem;
      height: 27rem;
      display: flex;
      align-items: center;
      justify-content: center;

      ${respond(
        1440,
        css`
          width: 25rem;
          height: 25rem;
        `
      )}
      ${respond(
        "big-desktop",
        css`
          width: 40rem;
          height: 40rem;
        `
      )}

      img {
        width: 100%;
        padding: 4rem;
      }
    }
  }
`

const ImagesSection = ({ superheading, heading, subheading, images }) => {
  return (
    <StyledImagesSection>
      <div className="container">
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
    </StyledImagesSection>
  )
}

export default ImagesSection
