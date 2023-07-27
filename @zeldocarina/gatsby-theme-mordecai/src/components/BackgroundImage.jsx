import React from "react"
import styled from "styled-components"

const StyledBackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  object-fit: cover;
  object-position: top left;

  .overlay {
    ${({ $background, $isCards }) => {
      if ($background) {
        let css = `
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      `

        if (!$isCards) {
          css += `
          background: ${$background};
        `
        } else {
          css += `
        background: linear-gradient(
            -45deg,
            ${$background[0]},
            ${$background[1]}
          );`
        }
        return css
      }
    }}
  }

  .bg-image {
    width: 100%;
    height: 100%;
    z-index: -1;
    position: absolute;
    object-fit: cover;
    object-position: top left;
    /* Blur slightly the image if blur is true */
    filter: ${({ $blur }) => ($blur ? "blur(4px)" : "none")};

    &--has-mobile {
      @media (max-width: 768px) {
        display: none;
      }
    }

    &--mobile {
      display: none;
      object-position: top left;

      @media (max-width: 768px) {
        display: block;
      }
    }
  }
`

const BackgroundImage = ({
  image,
  alt,
  overlay,
  blur,
  isCards,
  mobileImage,
}) => {
  return (
    <StyledBackgroundImage
      $background={overlay}
      $blur={blur}
      $isCards={isCards}
      className="bg-image"
    >
      {overlay && <div className="overlay" />}
      {image && mobileImage ? (
        <img src={image} alt={alt} className="bg-image bg-image--has-mobile" />
      ) : (
        <img src={image} alt={alt} className="bg-image" />
      )}
      {mobileImage && (
        <img
          src={mobileImage}
          alt={alt}
          className="bg-image bg-image--mobile"
        />
      )}
    </StyledBackgroundImage>
  )
}

export default BackgroundImage
