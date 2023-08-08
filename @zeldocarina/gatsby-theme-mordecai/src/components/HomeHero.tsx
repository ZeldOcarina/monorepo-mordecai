import React, {
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react"
import styled, { css } from "styled-components"

// @ts-expect-error
import BackgroundImage from "./BackgroundImage"

// @ts-expect-error
import BackgroundVideo from "./BackgroundVideo"

import respond from "../styles/abstracts/mediaqueries"

// @ts-expect-error
import AppContext from "../context/AppContext"

// @ts-expect-error
import { LocationContext } from "../context/LocationContext"

import IntroSection from "./IntroSection"

import ShortcodesParser from "../helpers/ShortcodesParser"

import { hexToRGB } from "../helpers/helpers"

interface IStyledHomeHeroProps {
  $heroSize?: number
  $isHomePage?: boolean
  $backgroundColor?: string
  $textColorOverride: string
  $colors: any
}

const StyledHomeHero = styled.header<IStyledHomeHeroProps>`
  min-height: ${({ $heroSize }) => $heroSize}px;
  display: grid;
  align-items: center;
  justify-items: center;
  position: ${({ $isHomePage }) => ($isHomePage ? "static" : "relative")};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  display: flex;
  justify-content: center;

  .text-content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-33%);
    z-index: 100;
    text-align: center;
    width: 65%;
    text-align: center;
  }

  .intro-section {
    .heading {
      color: var(--color-secondary) !important;
      text-transform: none;
    }

    .heading,
    .subheading {
      color: ${({ $textColorOverride }) =>
        $textColorOverride || "var(--white)"};
      text-align: center;
      width: 100%;
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

interface IHomeHeroProps {
  image?: string
  mobileImage?: string
  superheading?: string
  heading?: string
  subheading?: string
  altText?: string
  overlay?: string
  isVideo?: boolean
  mimeType?: string
  textColorOverride?: string
}

const HomeHero = ({
  image,
  mobileImage,
  superheading,
  heading,
  subheading,
  altText,
  overlay,
  isVideo,
  mimeType,
  textColorOverride,
}: IHomeHeroProps) => {
  const heroRef = useRef(null)
  const [isHomePage, setIsHomePage] = useState(false)
  const [heroSize, setHeroSize] = useState(770)
  const [heroBackground, setHeroBackground] = useState(null)

  const { path } = useContext<any>(LocationContext)
  const { shortcodesData, colors, locationBarRef, navbarRef, anchorRef } =
    useContext<any>(AppContext)

  // console.log({ locationBarRef, navbarRef })

  useEffect(() => {
    setIsHomePage(path === "/")
  }, [path])

  useLayoutEffect(() => {
    // Make sure this is runned only when the component is completely mounted
    setTimeout(() => {
      const nextSection = document.querySelector("section")
      // Get the background color of nextSection
      const backgroundColor = nextSection
        ? window.getComputedStyle(nextSection).backgroundColor
        : null

      // Set hero bg color to the next section bg color
      if (heroRef && heroRef.current) {
        if (backgroundColor === "rgba(0, 0, 0, 0)") {
          setHeroBackground(colors.bodyBackground)
        } else if (backgroundColor) {
          // @ts-expect-error
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

  const parsedAltText = altText
    ? new ShortcodesParser(altText, shortcodesData).parseShortcodes()
    : ""

  return (
    <StyledHomeHero
      $colors={colors}
      $isHomePage={isHomePage}
      $heroSize={heroSize}
      ref={heroRef}
      $backgroundColor={heroBackground || ""}
      $textColorOverride={textColorOverride || ""}
    >
      <div className="text-content">
        <IntroSection
          superheading={superheading}
          heading={heading || ""}
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
    </StyledHomeHero>
  )
}

export default HomeHero
