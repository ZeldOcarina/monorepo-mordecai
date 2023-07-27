import React, {
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react"
import styled, { css } from "styled-components"

import BackgroundImage from "./BackgroundImage"
import BackgroundVideo from "./BackgroundVideo"
import respond from "../styles/abstracts/mediaqueries"

import AppContext from "../context/AppContext"
import { LocationContext } from "../context/LocationContext"
import IntroSection from "./IntroSection"

import ShortcodeParser from "../helpers/ShortcodesParser"
import { hexToRGB } from "../helpers/helpers"

const StyledHero = styled.header`
  min-height: ${({ $heroSize }) => $heroSize}px;
  display: grid;
  align-items: center;
  justify-items: center;
  position: ${({ $isHomePage }) => ($isHomePage ? "static" : "relative")};
  background-color: ${({ $backgroundColor }) => $backgroundColor};

  .text-content {
    position: absolute;
    left: 20%;
    bottom: 10rem;
    z-index: 100;
    text-align: center;
    width: 70rem;

    ${respond(
      1024,
      css`
        bottom: 3rem;
        left: 15%;
      `,
    )}
    ${respond(
      500,
      css`
        max-width: 85%;
        left: 10%;
      `,
    )}
  }

  .intro-section {
    max-width: 100%;

    .heading {
    }

    .heading,
    .subheading {
      color: var(--white);
    }
    &::after {
      display: none;
    }
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 101%;
    background-image: ${({ $colors, $isHomePage, $backgroundColor }) => {
      if (!$isHomePage) return "none"
      return css`linear-gradient(
      to bottom,
      ${hexToRGB($colors.colorSecondary, 1)} 0%,
      transparent 25%,
      transparent 70%,
      ${$backgroundColor} 100%
    );`
    }};
  }
`

const Hero = ({
  image,
  mobileImage,
  superheading,
  heading,
  subheading,
  altText,
  overlay,
  isVideo,
  mimeType,
}) => {
  const heroRef = useRef(null)
  const [isHomePage, setIsHomePage] = useState(false)
  const [heroSize, setHeroSize] = useState(770)
  const [heroBackground, setHeroBackground] = useState(null)

  const { path } = useContext(LocationContext)
  const { shortcodesData, colors, locationBarRef, navbarRef, anchorRef } =
    useContext(AppContext)

  // console.log({ locationBarRef, navbarRef })

  useEffect(() => {
    setIsHomePage(path === "/")
  }, [path])

  useLayoutEffect(() => {
    // Make sure this is runned only when the component is completely mounted
    setTimeout(() => {
      const nextSection = document.querySelector("section")
      // Get the background color of nextSection
      const backgroundColor =
        window.getComputedStyle(nextSection).backgroundColor

      // Set hero bg color to the next section bg color
      if (heroRef && heroRef.current) {
        if (backgroundColor === "rgba(0, 0, 0, 0)") {
          setHeroBackground(colors.bodyBackground)
        } else {
          setHeroBackground(backgroundColor)
        }
      }

      if (window.matchMedia("(max-height: 428px)").matches) {
        if (isHomePage) {
          return setHeroSize(
            window.innerHeight - navbarRef.current.offsetHeight,
          )
        }
        return setHeroSize(700)
      }

      if (anchorRef && anchorRef.current) {
        // console.log("WE HAVE AN ANCHOR REF")
        const totalHeight =
          navbarRef.current.offsetHeight +
          locationBarRef.current.offsetHeight +
          anchorRef.current.offsetHeight
        return setHeroSize(window.innerHeight - totalHeight)
      }
      // console.log("NO ANCHOR REF")
      return setHeroSize(window.innerHeight - navbarRef.current.offsetHeight)
    }, 100)
    // Set the hero size based off the total height as 100vh less the navbar and location bar height
  }, [locationBarRef, navbarRef, anchorRef, isHomePage, colors.bodyBackground])

  const parsedAltText = new ShortcodeParser(
    altText,
    shortcodesData,
  ).parseShortcodes()

  return (
    <StyledHero
      $colors={colors}
      $isHomePage={isHomePage}
      $heroSize={heroSize}
      ref={heroRef}
      $backgroundColor={heroBackground}
    >
      <div className="text-content">
        <IntroSection
          superheading={superheading}
          heading={heading}
          subheading={subheading}
          makeHeadingH1
        />
      </div>
      {isVideo ? (
        <BackgroundVideo video={image} mimeType={mimeType} />
      ) : (
        <BackgroundImage
          image={image}
          mobileImage={mobileImage}
          altText={parsedAltText}
          isPlainImg
          overlay={overlay}
        />
      )}
    </StyledHero>
  )
}

export default Hero
