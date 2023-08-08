import React, { useContext } from "react"
import styled, { css } from "styled-components"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay, Navigation } from "swiper/modules"
import respond from "../styles/abstracts/mediaqueries"

import Gradient from "./Gradient"
import AppContext from "../context/AppContext"

import { hexToRGB } from "../helpers/helpers"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const StyledSlider = styled.div`
  --swiper-navigation-color: var(--white);
  --swiper-pagination-color: var(--color-secondary);
  --swiper-pagination-bullet-opacity: 1;
  --swiper-pagination-bullet-horizontal-gap: 8px;
  --swiper-pagination-bullet-inactive-color: var(--white);
  --swiper-pagination-bullet-inactive-opacity: 0.8;
  --swiper-pagination-bullet-size: 10px;
  position: relative;

  .swiper-pagination {
    transform: translateY(-2rem);
  }

  .swiper-button-prev,
  .swiper-button-next {
    position: absolute;
    z-index: 100;

    &::after {
      z-index: 100;
    }

    ${respond(
      1024,
      css`
        transform: scale(1.3);
      `,
    )}
    ${respond(
      500,
      css`
        transform: scale(1);
      `,
    )}
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top left;
  }

  .slider {
    height: 80vh !important;
    transition: all 0.2s ease-in-out;

    .image,
    .image img {
      height: 80vh !important;
    }

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 30%;
      background: linear-gradient(
        to bottom,
        ${({ $colors }) => hexToRGB($colors.bodyBackground, 1)} 0%,
        ${({ $colors }) => hexToRGB($colors.bodyBackground, 0)} 100%
      );
      z-index: 1;
    }

    ${respond(
      500,
      css`
        height: auto;
      `,
    )}
  }

  .prev,
  .next {
    color: var(--white);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .next {
    right: 0;
  }
`

const Slider = ({ images }) => {
  console.log(images)
  const { isBigDesktop, colors } = useContext(AppContext)

  // console.log(colors)

  return (
    <>
      <StyledSlider $colors={colors}>
        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          spaceBetween={isBigDesktop ? 20 : 10}
          slidesPerView={1}
          centeredSlides={true}
          className="slider"
          initialSlide={0}
          navigation
          loop={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: true }}
        >
          {images.map(image => {
            if (!image.data.Media) return
            return (
              <SwiperSlide key={image.id}>
                <img
                  src={image?.data?.Media?.localFiles[0]?.publicURL}
                  alt={image.data.AltText}
                  className="image"
                />
              </SwiperSlide>
            )
          })}
        </Swiper>
        <Gradient />
      </StyledSlider>
    </>
  )
}

export default Slider
