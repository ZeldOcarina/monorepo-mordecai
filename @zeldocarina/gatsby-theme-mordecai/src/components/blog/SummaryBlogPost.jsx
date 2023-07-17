import React from "react"
import styled, { css } from "styled-components"
import { Link } from "gatsby"
import respond from "../../styles/abstracts/mediaqueries"

import IntroSection from "../IntroSection"

const StyledSummaryBlogPost = styled.div`
  .thumbnail {
    max-width: 100%;
  }
  .intro-section {
    margin: 0;
    padding: 0;
    max-width: 100%;

    &::after {
      display: none;
    }

    .heading {
      font-weight: 500;
      font-size: 4.2rem;

      ${respond(
        500,
        css`
          font-size: 3rem;
        `
      )}
    }
  }

  .blurb {
    color: var(--color-primary);
    font-size: var(--body-font-size);
    font-weight: 300;
  }

  &:not(:last-child) {
    margin-bottom: var(--section-gutter);
  }

  .link {
    display: inline-block;
    color: var(--color-secondary);
    font-weight: 700;
    margin-top: var(--gutter);

    ${respond(
      500,
      css`
        display: block;
        margin: var(--gutter) auto 0 auto;
        max-width: 90%;
      `
    )}
  }

  .intro-section,
  .blurb {
    ${respond(
      500,
      css`
        max-width: 90%;
        margin: 0 auto;
      `
    )}
  }
`

const SummaryBlogPost = ({
  innerRef,
  slug,
  mainImage,
  heading,
  postBlurb,
  altText,
}) => {
  return (
    <StyledSummaryBlogPost ref={innerRef}>
      <Link to={`/dentistry-blog/${slug}`}>
        <img
          src={
            mainImage?.localFiles[0]?.publicURL ||
            "https://via.placeholder.com/1200x800.png?text=Image+is+coming+soon"
          }
          alt={altText || "Main subject"}
          className="thumbnail"
        />
        <IntroSection heading={heading} />
        <div className="blurb">{postBlurb}</div>
      </Link>
      <Link className="link" to={`/dentistry-blog/${slug}`}>
        Read more
      </Link>
    </StyledSummaryBlogPost>
  )
}

export default SummaryBlogPost
