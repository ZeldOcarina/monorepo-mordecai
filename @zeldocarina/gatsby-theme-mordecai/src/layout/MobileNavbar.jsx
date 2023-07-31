import React, { useState, useEffect, useContext, useLayoutEffect } from "react"
import styled, { css } from "styled-components"
import { MdClose } from "react-icons/md"
import { Link } from "gatsby"
import { buildLink, hexToRGB } from "../helpers/helpers"
import BlackButton from "../components/BlackButton"

import MultipleAccordion from "../components/MultipleAccordion"

import respond from "../styles/abstracts/mediaqueries"
import AppContext from "../context/AppContext"

const StyledMobileNavbar = styled.div`
  width: 100%;
  position: fixed;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 200;
  background-color: ${({ $colors }) => hexToRGB($colors.mobileMenuColor, 0.9)};
  backdrop-filter: blur(10px);
  transform: translateX(200vw);
  transition: all 0.3s ease-in-out;
  overflow-y: scroll;
  padding: 0;
  padding-bottom: 5rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;

  ${({ $open }) => {
    //console.log(open);

    return (
      $open &&
      css`
        transform: translateX(0);
      `
    )
  }}

  .accordion__details {
    text-align: left;
  }

  .close-menu-icon {
    position: absolute;
    right: 3rem;
    top: 6rem;
    width: 5rem;
    height: auto;
    color: var(--color-secondary);
    cursor: pointer;

    ${respond(
      768,
      css`
        right: 6rem;
      `,
    )}
    ${respond(
      "phone-land",
      css`
        width: 5%;
      `,
    )}
    ${respond(
      "phone-port",
      css`
        width: 3rem;
      `,
    )}
    ${respond(
      "iphone-12-mini",
      css`
        top: 3rem;
        right: 3rem;
      `,
    )}
  }

  .mobile-navbar {
    color: var(--white);
    font-weight: 500;
    text-transform: uppercase;
    font-family: var(--body-font);
    font-size: 3.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6rem;
    /* overflow-y: scroll; */
    margin: 5rem 0;
    padding: 0;

    ${respond(
      834,
      css`
        margin: 15rem 0 5rem 0;
      `,
    )}
    ${respond(
      768,
      css`
        margin: 5rem 0 5rem 0;
      `,
    )}
    ${respond(
      "phone-land",
      css`
        font-size: 2.5rem;
        gap: 4rem;
      `,
    )}
    ${respond(
      "phone-port",
      css`
        font-size: 2.3rem;
        width: 85%;
        gap: var(--gutter);
        margin: 4rem auto;
      `,
    )}

    &__top-ul {
      list-style: none;
    }
    &__top-li {
      &:not(:last-child) {
        margin-bottom: 0;
      }
    }
    &__top-link {
      color: var(--white);
      font-family: var(--alternative-font);
      font-weight: 400;
    }
  }

  .categories-subitems {
    list-style: none;
    color: var(--white);
    margin-left: 2rem;

    li {
      color: var(--white);
    }

    &__link {
      color: #ffffff;
      font-size: 2.5rem;

      ${respond(
        "phone-port",
        css`
          font-size: 2rem;
        `,
      )}
    }
  }

  .multiple-accordion {
    background-color: transparent;
    color: var(--white);

    .MuiAccordionSummary-content {
      color: var(--mobile-menu-category-color);
      margin: 6px 0;

      .icon {
        color: var(--white);
      }
    }

    .MuiPaper-root {
      background-color: transparent;
      box-shadow: unset;
    }
  }

  .logo {
    width: 30rem;

    img {
      width: 100%;
    }
  }

  .phone {
    color: var(--white);
    display: block;
  }

  .buttons {
    display: grid;
    grid-template-columns: max-content max-content;
    gap: 1rem;
    justify-content: center;
    justify-items: center;
    align-items: center;
    height: max-content;
  }

  .button {
    background-color: var(--color-primary);
    color: var(--white);
    padding: 1.5rem 2rem;
    border-radius: 50px;
    display: flex;
    align-items: center;
    height: max-content;
    border: 1px solid var(--color-primary);

    ${respond(
      450,
      css`
        padding: 1.3rem 1.5rem;
        font-size: 1.4rem;
      `,
    )}
  }

  .black-button {
    ${respond(
      450,
      css`
        font-size: 1.4rem;
      `,
    )}
  }

  .special-link {
    font-size: 2.3rem;
    color: var(--white);
    font-weight: 700;
  }
`

const MobileNavbar = ({
  menuData: { categories, menuData },
  logo,
  tel,
  phone,
}) => {
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    colors,
    shortcodesData: { cityState },
  } = useContext(AppContext)
  const [accordionsState, setAccordionsState] = useState([])

  useEffect(() => {
    const initialAccordionsState = categories.map((item, i) => {
      // if (i === 0) {
      //   return { ...item, isOpen: true }
      // }
      return { ...item, isOpen: false }
    })
    setAccordionsState(initialAccordionsState)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useLayoutEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  const closeMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <StyledMobileNavbar $open={isMobileMenuOpen} $colors={colors}>
      <nav className="mobile-navbar">
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src={logo} alt="logo" />
        </Link>
        <div className="buttons">
          <BlackButton onClick={closeMenu}>Dental Offer</BlackButton>
          <Link to="/contact-us" className="button" onClick={closeMenu}>
            Appointments
          </Link>
        </div>
        <a href={`tel:${tel}`} className="phone">
          {phone}
        </a>
        <ul className="mobile-navbar__top-ul">
          {categories.map((category, i) => {
            const categoryItems = menuData.filter(
              item => item.data.Parent === category,
            )

            const isSingleItem = categoryItems.length === 1

            if (isSingleItem)
              return (
                <li className="categories-subitems" key={i}>
                  {categoryItems[0]?.data?.Permalink?.startsWith("/") ? (
                    <Link
                      to={buildLink(
                        categoryItems[0].data.Permalink,
                        cityState.value,
                      )}
                      onClick={closeMenu}
                      className="special-link"
                    >
                      {categoryItems[0].data.Child}
                    </Link>
                  ) : (
                    <a
                      className="special-link"
                      href={categoryItems[0].data.Permalink}
                      onClick={closeMenu}
                    >
                      {categoryItems[0].data.Child}
                    </a>
                  )}
                </li>
              )

            return (
              <li className="mobile-navbar__top-li" key={i}>
                <MultipleAccordion
                  key={i}
                  summary={category}
                  details={
                    <ul className="categories-subitems">
                      {categoryItems.map((item, i) => {
                        return (
                          <li className="categories-subitems__item" key={i}>
                            {item?.data?.Permalink?.startsWith("/") ? (
                              <Link
                                className="categories-subitems__link"
                                to={buildLink(
                                  item.data.Permalink,
                                  cityState.value,
                                )}
                                onClick={closeMenu}
                              >
                                {item.data.Child}
                              </Link>
                            ) : (
                              <a
                                className="categories-subitems__link"
                                href={item.data.Permalink}
                                onClick={closeMenu}
                              >
                                {item.data.Child}
                              </a>
                            )}
                          </li>
                        )
                      })}
                    </ul>
                  }
                  accordionsState={accordionsState}
                  setAccordionsState={setAccordionsState}
                  index={i}
                />
              </li>
            )
          })}
        </ul>
      </nav>
      <MdClose
        className="close-menu-icon"
        onClick={() => {
          setIsMobileMenuOpen(!isMobileMenuOpen)
        }}
      />
    </StyledMobileNavbar>
  )
}

export default MobileNavbar
