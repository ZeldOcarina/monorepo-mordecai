import React, { useState, useContext, useEffect } from "react"
import styled, { css } from "styled-components"
import { Link } from "gatsby"
import respond from "../styles/abstracts/mediaqueries"
import { GiHamburgerMenu } from "react-icons/gi"
import FloatingButtons from "./FloatingButtons"

import AppContext from "../context/AppContext"

import CategoryItem from "../components/CategoryItem"
import { LocationContext } from "../context/LocationContext"

const mobileMenuActivatorStyles = css`
  display: block;
  color: var(--color-tertiary);
  width: 4rem;
  height: auto;
  position: static;
  top: 5rem;
  right: 5rem;
`

const Wrapper = styled.nav`
  transition: all 0.3s ease-in-out;
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  z-index: 150;
  font-size: 2rem;
  transition: all 0.3s ease-in-out;
  background-color: transparent;
  position: relative;
  top: 0;
  color: var(--white);
  padding: 2rem 0;

  ${({ $isHomePage }) => {
    if (!$isHomePage) {
      return css`
        background-color: var(--color-primary);
      `
    }
  }}

  .navbar-container {
    max-width: 95%;
    margin: 0 auto;

    ${respond(
      768,
      css`
        max-width: 100%;
      `,
    )}

    ${({ $mobileNavbarBreakpoint }) => {
      return respond(
        $mobileNavbarBreakpoint,
        css`
          display: grid;
          grid-template-columns: 1fr max-content;
          max-width: 85%;
        `,
      )
    }}
  }

  .navbar-container {
    width: 100%;
    height: 100%;
    display: grid;
    justify-content: space-around;
    align-items: center;
  }

  .links-container {
    display: flex;
    align-items: center;
    height: 100%;
    gap: var(--big-gutter);
  }

  .social-icons {
    ${respond(
      "tab-port",
      css`
        display: none;
      `,
    )}
  }

  .social-icon {
    font-size: 2.3rem;
  }

  .nav-link {
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    color: var(--white);
    cursor: pointer;
    font-family: var(--heading-font);

    &:hover {
      color: ${({ $isHomePage }) =>
        $isHomePage ? `var(--body-color)` : `var(--white)`};
    }

    ${respond(
      "big-desktop",
      css`
        font-size: 2.1rem;
      `,
    )}
  }

  .mobile-menu-activator {
    display: none;

    ${({ $mobileNavbarBreakpoint }) => {
      return css`
        ${respond("no-hover", mobileMenuActivatorStyles)}
        ${respond($mobileNavbarBreakpoint, mobileMenuActivatorStyles)}
      `
    }}
  }

  .logo {
    transition: all 0.3s ease-in-out;
    height: auto;
    ${({ $isHomePage, $whiteLogoSize }) => {
      const sizeValue = $whiteLogoSize ? parseFloat($whiteLogoSize) : null
      const sizeUnit = $whiteLogoSize
        ? $whiteLogoSize.replace(sizeValue, "")
        : null

      return $isHomePage
        ? css`
            width: ${$whiteLogoSize ? $whiteLogoSize : "22rem"};
          `
        : css`
            width: ${$whiteLogoSize
              ? `${sizeValue * (17 / 22)}${sizeUnit}`
              : "17rem"};
          `
    }}

    ${respond(
      850,
      css`
        width: 15rem;
        margin-right: auto;
      `,
    )}
    ${respond(
      "iphone-5",
      css`
        width: 5rem;
      `,
    )}
    ${respond(
      "big-desktop",
      css`
        width: 32rem;
      `,
    )}
  }

  .name {
    text-transform: initial;
    margin: 0;
    padding: 0;
  }
`

const StyledLink = styled(Link)`
  color: var(--white);
  text-transform: uppercase;

  &:hover {
    color: var(--color-primary);
  }
`

const Navbar = ({
  innerPage,
  innerLayout,
  menuData,
  logo,
  phone,
  tel,
  whiteLogoSize,
}) => {
  const [isHomePage, setIsHomePage] = useState(false)

  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    shortcodesData,
    navbarRef,
    appVariables,
  } = useContext(AppContext)

  const { path } = useContext(LocationContext)

  useEffect(() => {
    if (path === "/") setIsHomePage(true)
    else setIsHomePage(false)
  }, [path])

  return (
    <Wrapper
      $innerLayout={innerLayout}
      $isHomePage={isHomePage}
      ref={navbarRef}
      $mobileNavbarBreakpoint={appVariables.mobileNavbarBreakpoint}
      $whiteLogoSize={whiteLogoSize}
    >
      <div className="navbar-container">
        <div
          className={
            innerPage
              ? "links-container links-container--dark"
              : "links-container"
          }
        >
          {menuData.categories.map((category, i) => {
            const categoryItems = menuData.menuData.filter(item => {
              return item.data.Parent === category
            })

            console.log(categoryItems)

            return (
              <React.Fragment key={i}>
                {i === Math.floor(menuData.categories.length / 2) && (
                  <Link to="/">
                    {
                      <img
                        src={logo}
                        alt={`${shortcodesData.business.value} Logo`}
                        className="logo"
                      />
                    }
                  </Link>
                )}
                {categoryItems.length > 1 ||
                categoryItems[0].Child === categoryItems[0].Parent ? (
                  <CategoryItem
                    category={category}
                    categoryItems={categoryItems}
                    isHomePage={isHomePage}
                  />
                ) : (
                  <StyledLink
                    to={categoryItems[0].data.Permalink}
                    className="category-link"
                    role="button"
                    tabIndex="0"
                  >
                    {categoryItems[0].data.Child}
                  </StyledLink>
                )}
              </React.Fragment>
            )
          })}
        </div>
        <GiHamburgerMenu
          className="mobile-menu-activator"
          onClick={() => {
            setIsMobileMenuOpen(!isMobileMenuOpen)
          }}
        />
      </div>
      <FloatingButtons phone={phone} tel={tel} />
    </Wrapper>
  )
}

export default Navbar
