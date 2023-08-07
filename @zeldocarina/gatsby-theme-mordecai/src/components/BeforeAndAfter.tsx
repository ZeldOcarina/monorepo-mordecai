import React from "react"
import styled, { css } from "styled-components"

import IntroSection from "./IntroSection"
import { ImgComparisonSlider } from "@img-comparison-slider/react"

// @ts-expect-error
import respond from "../styles/abstracts/mediaqueries"

// @ts-expect-error
import MarkdownParser from "../helpers/MarkdownParser"

// @ts-expect-error
import useShortcodes from "../hooks/useShortcodes"
import { IShortcode } from "../helpers/ShortcodesParser"

//import handle from "../images/icons/handle.svg"

const StyledBeforeAndAfter = styled.section<{
  $backgroundOverride?: string
}>`
  background: ${({ $backgroundOverride }) => {
    return $backgroundOverride || "var(--white)"
  }};

  .intro-section {
    ${respond(
      1366,
      css`
        margin-bottom: var(--gutter);
      `,
    )}
    ${respond(
      834,
      css`
        margin-bottom: var(--big-gutter);
      `,
    )}
  }

  h2,
  .heading {
    ${respond(
      1024,
      css`
        margin: var(--gutter) 0;
        margin-right: 0;
        width: 100%;
      `,
    )}
  }

  h2,
  p {
    color: var(--background-dark);
  }

  .slider {
    --divider-color: var(--color-secondary);
    --default-handle-color: var(--color-secondary);
    --divider-width: 3px;
    --default-handle-width: 100px;
    --default-handle-thi: 100px;

    cursor: col-resize;
    width: 100%;
  }

  .slider,
  .image {
    height: 515px !important;

    ${respond(
      1366,
      css`
        height: 370px !important;
      `,
    )}
    ${respond(
      1194,
      css`
        height: 450px !important;
      `,
    )}
    ${respond(
      834,
      css`
        height: 550px !important;
      `,
    )}
    ${respond(
      500,
      css`
        height: 400px !important;
        aspect-ratio: 1/1;
        object-fit: cover;
        object-position: center;
      `,
    )}
    ${respond(
      "big-desktop",
      css`
        height: 655px !important;
      `,
    )}
  }

  .image {
    width: 100%;
    object-fit: cover;
    object-position: top left;
  }

  .second {
    height: 102%;
  }

  .slider-container {
    transform: scaleY(1.016);
  }

  .images-container {
    max-width: 90%;
    display: grid;
    grid-template-columns: repeat(auto-fit, 470px);
    gap: 1px;
    justify-content: center;
    justify-items: center;

    ${respond(
      1366,
      css`
        max-width: 90%;
        grid-template-columns: repeat(auto-fit, 370px);
      `,
    )}
    ${respond(
      1194,
      css`
        grid-template-columns: repeat(auto-fit, 450px);
      `,
    )}
    ${respond(
      834,
      css`
        grid-template-columns: repeat(auto-fit, 550px);
      `,
    )}
    ${respond(
      500,
      css`
        grid-template-columns: 1fr;
      `,
    )}
    ${respond(
      "big-desktop",
      css`
        grid-template-columns: repeat(auto-fit, 655px);
        gap: 4rem;
      `,
    )}
  }

  .card-title {
    text-transform: uppercase;
    font-size: 3rem;
    text-align: center;
    padding: var(--gutter) 0;
  }
`

export interface IBeforeAndAfterImage {
  id: string
  data: {
    AltText: string | null
    Heading: string | null
    Media: {
      localFiles: {
        publicURL: string
      }[]
    }
    rowNumber: number
  }
}

export interface IBeforeAndAfterProps {
  superheading?: string
  heading?: string
  subheading?: string
  backgroundOverride?: string
  images: IBeforeAndAfterImage[]
}

const BeforeAndAfter = ({
  superheading,
  heading,
  subheading,
  backgroundOverride,
  images,
}: IBeforeAndAfterProps) => {
  return (
    <StyledBeforeAndAfter
      id="before-and-after"
      $backgroundOverride={backgroundOverride}
    >
      <div className="container">
        <IntroSection
          superheading={superheading}
          heading={heading || ""}
          subheading={subheading}
        />
      </div>

      <div className="images-container container">
        {images.map(({ id, data }) => {
          const beforeImage = data?.Media?.localFiles[0]?.publicURL
          const afterImage = data?.Media?.localFiles[1]?.publicURL

          //console.log(data)
          return (
            <article className="slider-container" key={id}>
              <ImgComparisonSlider className="slider">
                <img
                  alt={data.AltText || "mouth with teeth"}
                  slot="first"
                  className="image first"
                  src={beforeImage}
                />
                <img
                  alt={data.AltText || "mouth with teeth"}
                  slot="second"
                  className="image second"
                  src={afterImage}
                />
                {/* <img slot="handle" src={handle} alt="handle" /> */}
              </ImgComparisonSlider>
              {data.Heading && <h5 className="card-title">{data.Heading}</h5>}
            </article>
          )
        })}
      </div>
    </StyledBeforeAndAfter>
  )
}

export default BeforeAndAfter
