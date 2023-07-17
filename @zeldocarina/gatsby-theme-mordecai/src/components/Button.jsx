import { Link } from "gatsby"
import React from "react"
import styled, { css } from "styled-components"
import PropTypes from "prop-types"

const buttonCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary);
  border-radius: 50px;
  border: none;
  outline: none;
  font-weight: 300;
  display: block;
  color: var(--white);
  border: none;
  text-transform: uppercase;
  text-align: center;
  padding: 1.5rem 1.8rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  .inner-button {
    height: 100%;
    display: flex;
    align-items: center;
  }
`

const navButtonCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--appointment-button-color);
  border-radius: 50px;
  border: none;
  outline: none;
  font-weight: 300;
  padding: 1.5rem 1.8rem;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
  }
`

const mobileNavButtonCss = css`
  min-width: max-content;
  margin: 0 auto;
  height: 5rem;
  width: 20rem;
  font-size: 1.6rem;
`

const StyledButton = styled.button`
  ${buttonCss}
  background-color: ${({ color }) =>
    css`
      ${color}
    `};
  ${({ navButton }) => navButton && navButtonCss};
  ${({ mobileNavButton }) => mobileNavButton && mobileNavButtonCss};

  .inner-button {
    color: var(--white);
  }
`

function setAs(type) {
  switch (type) {
    case "button":
      return "button"
    case "link":
      return "a"
    case "internal":
      return "div"
    default:
      return "button"
  }
}

/*************************
 * @param {string} type
 * @param {string} useImperativeHandle(
 * @param {function} children,
 * @param {string} color,
 * @param {string} width,
 ***********************/

const Button = ({
  type,
  url,
  children,
  color,
  className,
  navButton,
  mobileNavButton,
}) => {
  return (
    <StyledButton
      as={setAs(type)}
      href={type !== "internal" ? url : undefined}
      color={color}
      navButton={navButton}
      mobileNavButton={mobileNavButton}
      className={className ? `button ${className}` : "button"}
    >
      {type === "internal" ? (
        <Link to={url} className="inner-button">
          {children}
        </Link>
      ) : (
        children
      )}
    </StyledButton>
  )
}

Button.propTypes = {
  type: PropTypes.oneOf(["button", "link", "internal"]).isRequired,
  url: PropTypes.string,
  children: PropTypes.node,
  color: PropTypes.string,
  width: PropTypes.string,
}

export default Button
