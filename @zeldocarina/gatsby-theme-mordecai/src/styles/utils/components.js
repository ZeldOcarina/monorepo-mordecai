import { css } from "styled-components"

export const normalButtonCss = css`
.button {
    display: inline-block;
    background-color: var(--white);
    border: 1px solid var(--color-primary);
    border-radius: 30px;
    padding: 1rem 2rem;
    text-transform: uppercase;
    margin-top: var(--gutter);
    transition: all 0.12s ease-in-out;

    &:hover {
      color: var(--white);
      border: 1px solid var(--white);
      background-color: var(--color-primary);
    }
  }
`

export const ctaButton = css`
.button {
  color: var(--white);
  background-color: var(--appointment-button-color);
  border-radius: 40px;
  padding: 2rem 3rem;
  position: relative;
  z-index: 1500;
  transition: all 0.15s ease-in-out;

  &:hover {
    background-color: var(--appointment-button-hover-color);
  }
}
`
