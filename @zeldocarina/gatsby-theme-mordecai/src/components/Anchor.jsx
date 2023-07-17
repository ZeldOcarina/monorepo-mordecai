import React, { useContext } from "react"
import styled, { css } from "styled-components"
import respond from "../styles/abstracts/mediaqueries"

import AppContext from "../context/AppContext"

const StyledAnchor = styled.div`
  background: var(--white);
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: max-content;
  margin: 0 auto;
  transform: translateY(-50%);
  padding: 0 5rem;
  border-radius: 40px;
  border: 1px solid var(--grey);

  ${respond(
    1024,
    css`
      justify-content: center;
    `
  )}
  ${respond(
    926,
    css`
      display: none;
    `
  )}
    ${respond(
    "big-desktop",
    css`
      height: 10rem;
      border-radius: 60px;
    `
  )}
    .anchors {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-width: max-content;

    ${respond(
      1024,
      css`
        margin-right: 0;
      `
    )}
  }

  a {
    color: var(--color-primary);
    text-transform: uppercase;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100%;

    // Target all links except last child
    &:not(:last-child) {
      // Make ::after a bar
      &::after {
        display: inline-block;
        content: "|";
        margin: 0 2rem;
      }
    }
  }
`

const Anchor = ({ items }) => {
  const { anchorRef } = useContext(AppContext)
  return (
    <StyledAnchor ref={anchorRef}>
      <div className="anchors">
        {items.map(item => {
          return (
            <a key={item.id} href={item.data.ButtonTarget}>
              {item.data.ButtonLabel}
            </a>
          )
        })}
      </div>
    </StyledAnchor>
  )
}

export default Anchor
