import React, { useContext } from "react"
import { Link } from "gatsby"
import styled, { css } from "styled-components"
import AppContext from "../context/AppContext"
import { buildLink } from "../helpers/helpers"
import respond from "../styles/abstracts/mediaqueries"

import MenuCategoryItems from "./MenuCategoryItems"

const StyledCategoryItem = styled.div`
  position: relative;
  height: 100%;
  display: grid;
  align-items: center;
  text-transform: uppercase;
  cursor: pointer;
  min-height: 10rem;

  ${respond(
    "no-hover",
    css`
      display: none;
    `,
  )}
  ${({ $mobileNavbarBreakpoint }) => {
    return respond(
      $mobileNavbarBreakpoint,
      css`
        display: none;
      `,
    )
  }}
  

  span {
    color: var(--navbar-links-color);
    font-family: var(--heading-font);

    &:hover {
      //color: var(--navbar-links-hover-color);
    }
  }

  .category-link {
    color: var(--navbar-links-color);

    &:hover {
      color: var(--navbar-links-hover-color);
    }
  }
`

const CategoryItem = ({ category, categoryItems, isHomePage }) => {
  const categoryItemRef = React.useRef(null)
  const {
    hoveredCategory,
    setHoveredCategory,
    shortcodesData,
    navbarRef,
    appVariables,
  } = useContext(AppContext)

  function handleMouseEnter(category) {
    setHoveredCategory(category)
  }
  function handleMouseLeave(category) {
    setHoveredCategory("")
  }
  function handleClick(e) {
    // console.log("clicked")
    setHoveredCategory("")
  }

  //console.log({ category, hoveredCategory, categoryItems })

  return (
    <StyledCategoryItem
      onMouseEnter={() => handleMouseEnter(category)}
      onMouseLeave={() => handleMouseLeave(category)}
      $isHomePage={isHomePage}
      $mobileNavbarBreakpoint={appVariables.mobileNavbarBreakpoint}
      ref={categoryItemRef}
    >
      {category === "Home" ? (
        <Link
          onMouseEnter={() => handleMouseEnter(category)}
          to={"/"}
          className="category-link"
          role="button"
          tabIndex="0"
        >
          {category}
        </Link>
      ) : (
        // Add role to make it focusable and tabbable
        <span
          role="button"
          onMouseEnter={() => handleMouseEnter(category)}
          tabIndex="0"
        >
          {category}
        </span>
      )}

      {hoveredCategory === category && category !== "Home" && (
        <MenuCategoryItems
          category={category}
          navbarRef={navbarRef}
          categoryItemRef={categoryItemRef}
        >
          {categoryItems.map((item, i) => {
            if (item.data.Permalink.startsWith("http")) {
              return (
                <a key={i} href={item.data.Permalink}>
                  {item.data.Child || ""}
                </a>
              )
            }
            return (
              <Link
                to={buildLink(
                  item.data.Permalink,
                  shortcodesData.cityState.value,
                )}
                key={i}
                onClick={handleClick}
              >
                {item.data.Child || ""}
              </Link>
            )
          })}
        </MenuCategoryItems>
      )}
    </StyledCategoryItem>
  )
}

export default CategoryItem
