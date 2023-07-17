import React, { useState, useLayoutEffect, createRef, useContext } from "react"
import { Link } from "gatsby"
import styled, { css } from "styled-components"
import respond from "../../styles/abstracts/mediaqueries"

import { buildLink } from "../../helpers/helpers"

import AppContext from "../../context/AppContext"
import IntroSection from "../IntroSection"

const StyledRecentPosts = styled.section`
  .posts-container {
    max-width: 90%;
    margin: 0 auto;
  }

  .posts-grid {
    margin-top: var(--big-gutter);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: var(--gutter);

    ${respond(
      500,
      css`
        grid-template-columns: 1fr;
      `
    )}
  }

  .post {
    display: grid;
    gap: var(--gutter);
    align-content: flex-start;
    height: 100%;

    .image {
      width: 100%;
      aspect-ratio: 1 / 1;
      object-fit: cover;
      object-position: top left;
    }

    .intro-section {
      margin: 0;
      padding: 0;
      max-width: 100%;

      .heading {
        font-size: 2.4rem;
      }
    }

    .content {
      background-color: var(--white);
      height: 100%;
      padding: var(--gutter);
      display: flex;
      flex-direction: column;
    }

    .link {
      text-transform: none;
      font-size: 1.8rem;
      font-weight: 700;
      color: var(--color-secondary);
      margin-top: auto;

      ${respond(
        500,
        css`
          margin: var(--gutter) 0;
          display: block;
        `
      )}
    }
  }
`

const RecentPosts = ({ posts }) => {
  const [contentRefs] = useState(
    // Create an array of refs based off the number of posts
    posts.map(() => createRef())
  )

  // Set the height of each content to the height of the tallest content
  useLayoutEffect(() => {
    // If window width is less than 500px, return
    if (window.innerWidth < 500) return
    const heights = contentRefs.map(ref => ref.current.clientHeight)
    const tallest = Math.max(...heights)

    contentRefs.forEach(ref => (ref.current.style.height = `${tallest + 50}px`))
  }, [contentRefs])

  const { shortcodesData } = useContext(AppContext)
  return (
    <StyledRecentPosts>
      <div className="posts-container">
        <IntroSection
          heading={"Recently Posted"}
          subheading="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy."
        />
        <div className="posts-grid">
          {posts.map((post, i) => {
            return (
              <article className="post" key={post.id}>
                {post.data.thumbnail && (
                  <img
                    src={post.data.thumbnail.localFiles[0].publicURL}
                    alt={post.data.AltText || "Recent Post"}
                    className="image"
                  />
                )}
                <div className="content" ref={contentRefs[i]}>
                  <IntroSection heading={post.data.Heading} />
                  <div className="intro">{post.data.postBlurb}</div>
                  <Link
                    className="link"
                    to={buildLink(
                      `/dentistry-blog/${post.data.slug}`,
                      shortcodesData.cityState.value
                    )}
                  >
                    Read More
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </StyledRecentPosts>
  )
}

export default RecentPosts
