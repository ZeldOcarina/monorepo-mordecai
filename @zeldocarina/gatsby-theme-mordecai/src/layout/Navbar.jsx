import React, { useState, useContext, useEffect } from "react"
import styled, { css } from "styled-components"
import { Link } from "gatsby"
import respond from "../styles/abstracts/mediaqueries"
import { GiHamburgerMenu } from "react-icons/gi"
import FloatingButtons from "./FloatingButtons"

import AppContext from "../context/AppContext"

import CategoryItem from "../components/CategoryItem"
import { LocationContext } from "../context/LocationContext"
import { buildLink } from "../helpers/helpers"

const mobileMenuActivatorStyles = css`
  display: block;
  color: var(--mobile-menu-activator-color);
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
  color: var(--navbar-links-color);
  padding: 2rem 0;

  ${({ $isHomePage }) => {
    if (!$isHomePage) {
      return css`
        background-color: var(--navbar-container-color);
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

    ${({ $mobileNavbarBreakpoint }) => {
      return css`
        @media only screen and (max-width: ${$mobileNavbarBreakpoint}px) {
          display: none;
        }
      `
    }}
  }

  .mobile-logo {
    display: none;
    width: 9rem;

    ${({ $mobileNavbarBreakpoint }) => {
      return css`
        @media only screen and (max-width: ${$mobileNavbarBreakpoint}px) {
          display: block;
        }
      `
    }}
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
    cursor: pointer;
    font-family: var(--heading-font);
    color: var(--navbar-links-color);

    &:hover {
      color: var(--navbar-links-hover-color);
    }
  }

  .mobile-menu-activator {
    display: none;

    ${({ $mobileNavbarBreakpoint }) => {
      return css`
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

            @media only screen and min-width(2500px) {
              width: ${$whiteLogoSize ? `${sizeValue}${sizeUnit}` : "35rem"};
            }
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
  }

  .name {
    text-transform: initial;
    margin: 0;
    padding: 0;
  }
`

const StyledLink = styled(Link)`
  color: var(--navbar-links-color);
  text-transform: uppercase;

  &:hover {
    color: var(--navbar-links-hover-color);
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
  appointmentButtonUrl,
  appointmentButtonLabel,
  dentalOfferButtonUrl,
  dentalOfferButtonLabel,
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

            let navbarItem
            if (categoryItems.length > 1)
              navbarItem = (
                <CategoryItem
                  category={category}
                  categoryItems={categoryItems}
                  isHomePage={isHomePage}
                />
              )
            else if (
              categoryItems[0].data.Child === categoryItems[0].data.Parent
            )
              navbarItem = (
                <StyledLink
                  to={buildLink(
                    categoryItems[0].data.Permalink,
                    shortcodesData.cityState.value,
                  )}
                  className="category-link"
                  role="button"
                  tabIndex="0"
                  $isHomePage={isHomePage}
                >
                  {categoryItems[0].data.Child}
                </StyledLink>
              )
            else
              navbarItem = (
                <CategoryItem
                  category={category}
                  categoryItems={categoryItems}
                  isHomePage={isHomePage}
                />
              )

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
                {navbarItem}
              </React.Fragment>
            )
          })}
        </div>
        <img
          className="mobile-logo"
          src={logo}
          alt={`${shortcodesData.business.value} Logo`}
        />

        <GiHamburgerMenu
          className="mobile-menu-activator"
          onClick={() => {
            setIsMobileMenuOpen(!isMobileMenuOpen)
          }}
        />
      </div>
      <FloatingButtons
        phone={phone}
        tel={tel}
        appointmentButtonUrl={appointmentButtonUrl}
        appointmentButtonLabel={appointmentButtonLabel}
        dentalOfferButtonUrl={dentalOfferButtonUrl}
        dentalOfferButtonLabel={dentalOfferButtonLabel}
      />
    </Wrapper>
  )
}

export default Navbar
