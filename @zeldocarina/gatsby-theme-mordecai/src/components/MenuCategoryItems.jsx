import React, { useState, useContext, useLayoutEffect } from "react"
import styled, { css } from "styled-components"
import AppContext from "../context/AppContext"
import { hexToRGB } from "../helpers/helpers"
import respond from "../styles/abstracts/mediaqueries"

const StyledMenuCategoryItems = styled.div`
  position: absolute;
  min-width: max-content;
  top: ${({ $top }) => {
    // console.log(top)
    return $top
  }}px;
  left: 50%;
  background-color: ${({ $colors }) => hexToRGB($colors.white, 0.9)};
  z-index: 200;
  padding: 4rem;
  transform: translateX(-50%);
  color: var(--white);
  text-transform: uppercase;
  display: grid;
  gap: var(--gutter);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  min-width: 25rem;

  a {
    font-size: 1.6rem;
    color: var(--color-primary);
    &:hover {
      cursor: pointer;
      color: var(--navbar-links-hover-color);
    }

    ${respond(
      "big-desktop",
      css`
        font-size: 2rem;
      `,
    )}
  }
`

const MenuCategoryItems = ({
  category,
  children,
  navbarRef,
  categoryItemRef,
}) => {
  const [categoryItemTop, setCategoryItemTop] = useState(0)
  const { setHoveredCategory, colors } = useContext(AppContext)

  useLayoutEffect(() => {
    setCategoryItemTop(() => {
      return categoryItemRef?.current?.offsetHeight - 20
    })
  }, [navbarRef, categoryItemRef])

  // useEffect(() => {
  //   console.log(categoryItemTop)
  // }, [categoryItemTop])

  function handleMouseEnter() {
    setHoveredCategory(category)
  }
  function handleMouseLeave() {
    setHoveredCategory("")
  }

  return (
    <StyledMenuCategoryItems
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      $colors={colors}
      $top={categoryItemTop}
      className="category-items"
    >
      {children}
    </StyledMenuCategoryItems>
  )
}

export default MenuCategoryItems
