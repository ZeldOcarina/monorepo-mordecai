import React from "react"
import styled from "styled-components"

const StyledCopySection = styled.article`
  column-count: ${({ columns }) => columns || 2};
  column-gap: var(--section-gutter);
  color: var(--body-color);

  p,
  li {
    margin-bottom: 1.3rem;
  }

  a {
    color: var(--body-color);
    text-decoration: underline;
  }
`

const CopySection = ({ children, columns, theme }) => {
  return (
    <StyledCopySection columns={columns} theme={theme} className="copy-section">
      {children}
    </StyledCopySection>
  )
}

export default CopySection
