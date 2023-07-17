import React from "react"
import styled, { css } from "styled-components"
import respond from "../styles/abstracts/mediaqueries"

import IntroSection from "./IntroSection"
import Slider from "./Slider"

const StyledSliderSection = styled.section`
  padding-bottom: 0;
  ${respond(
    500,
    css`
      padding: var(--section-gutter) 0 0 0;
    `
  )}
  .intro-section {
    max-width: 100%;
    padding-top: 0;
    margin-bottom: 10rem;

    &::after {
      left: 50%;
      transform: translateX(-50%);
    }

    h3,
    h2,
    p {
      text-align: center;
    }

    h2,
    p {
      margin: var(--gutter) auto;
    }
  }
`

const SliderSection = ({ superheading, heading, subheading, images }) => {
  return (
    <StyledSliderSection>
      <div className="container">
        <IntroSection
          superheading={superheading}
          heading={heading}
          subheading={subheading}
        />
      </div>
      <Slider images={images} />
    </StyledSliderSection>
  )
}

export default SliderSection
