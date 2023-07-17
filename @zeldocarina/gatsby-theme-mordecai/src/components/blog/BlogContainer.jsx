import React from "react"
import styled, { css } from "styled-components"
import respond from "../../styles/abstracts/mediaqueries"

const StyledBlogContainer = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 1fr;
  grid-gap: var(--big-gutter);
  max-width: 90%;
  margin: var(--big-gutter) auto;

  ${respond(
    500,
    css`
      grid-template-columns: 1fr;
      max-width: 100%;
      margin: var(--big-gutter) 0;
    `
  )}
`

const BlogContainer = ({ children }) => {
  return <StyledBlogContainer>{children}</StyledBlogContainer>
}

export default BlogContainer
