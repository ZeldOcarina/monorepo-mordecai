import React from "react"
import styled, { css } from "styled-components"
import IntroSection from "./IntroSection"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

import { parseMarkdown } from "../helpers/helpers"
import respond from "../styles/abstracts/mediaqueries"

import { FaQuoteRight } from "react-icons/fa"

const StyledTestimonialsSlider = styled.section`
  background-color: var(--color-secondary);
  --swiper-pagination-color: var(--color-tertiary);
  --swiper-pagination-bullet-opacity: 1;

  padding-bottom: 0;

  .swiper-pagination {
    ${respond(
      926,
      css`
        transform: translateX(0) translateY(5rem);
      `,
    )}
    ${respond(
      834,
      css`
        transform: translateX(-21rem);
      `,
    )}
    ${respond(
      768,
      css`
        transform: translateX(0) translateY(1rem);
      `,
    )}
    ${respond(
      500,
      css`
        transform: translateX(0) translateY(0);
      `,
    )}
  }

  .testimonials-slider {
    ${respond(
      1024,
      css`
        height: auto;
      `,
    )}
  }

  .top-container {
    padding-bottom: 10rem;

    ${respond(
      1366,
      css`
        padding-bottom: 8rem;
      `,
    )}
    ${respond(
      1280,
      css`
        padding-bottom: 5rem;
      `,
    )}
    ${respond(
      926,
      css`
        padding-bottom: 0;
      `,
    )}
  }
  .testimonials-container {
    padding-bottom: 0;

    .container {
      max-width: 70%;

      ${respond(
        1366,
        css`
          max-width: 82%;
        `,
      )}
      ${respond(
        1280,
        css`
          max-width: 90%;
        `,
      )}
      ${respond(
        926,
        css`
          height: 60rem;
          display: flex;
          align-items: center;
        `,
      )}
      ${respond(
        834,
        css`
          height: 50vh;
          display: flex;
          align-items: center;
        `,
      )}
      ${respond(
        768,
        css`
          height: auto;
          display: flex;
          align-items: flex-start;
        `,
      )}
    }
  }

  .right-part {
    ${respond(
      1366,
      css`
        transform: translateY(0);
      `,
    )}
    ${respond(
      1024,
      css`
        transform: translateY(2rem);
      `,
    )}
    ${respond(
      834,
      css`
        transform: translateY(0);
      `,
    )}
  }

  .testimonial {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0;
    align-items: center;
    padding-bottom: 5rem;

    ${respond(
      768,
      css`
        grid-template-columns: 1fr;
        gap: var(--gutter);
      `,
    )}

    strong {
      color: var(--white);
    }

    .quotation-mark {
      color: var(--color-tertiary);
      font-size: 8rem;
      font-weight: 700;
      text-align: center;
    }

    &__image-container {
      position: relative;
      z-index: 500;
    }

    &__image {
      width: 10rem;
      margin-left: 50%;
      margin-top: var(--big-gutter);
      transform: translateX(-50%);

      ${respond(
        768,
        css`
          width: 50%;
        `,
      )}
      ${respond(
        500,
        css`
          width: 30%;
        `,
      )}
    }

    &__pre-heading {
      color: var(--body-color);
      font-size: var(--title-font-size);
      font-style: italic;
      text-align: center;
      margin-bottom: var(--gutter);
      color: var(--white);

      ${respond(
        1366,
        css`
          font-size: 4rem;
        `,
      )}
      ${respond(
        1024,
        css`
          font-size: 3rem;
        `,
      )}
    }

    &__text {
      text-align: center;
      color: var(--white);
      ${respond(
        1024,
        css`
          font-size: 1.6rem;
        `,
      )}
    }
  }

  .swiper {
    transform: translateY(-10rem);

    ${respond(
      1366,
      css`
        transform: translateY(-5rem);
      `,
    )}
    ${respond(
      834,
      css`
        transform: translateY(0);
      `,
    )}
    ${respond(
      768,
      css`
        margin: 5rem auto;
      `,
    )}
    ${respond(
      500,
      css`
        padding-bottom: 5rem;
      `,
    )}
  }

  .intro-section {
    max-width: 100%;

    .superheading,
    .heading {
      text-align: center;
    }

    .heading {
      color: var(--white);
    }

    &::after {
      left: 50%;
      transform: translateX(-50%);
    }

    ${respond(
      500,
      css`
        margin-bottom: 0 !important;
      `,
    )}
  }
`

const TestimonialsSlider = ({
  superheading,
  heading,
  subheading,
  testimonials,
}) => {
  return (
    <StyledTestimonialsSlider>
      <div className="container top-container">
        <IntroSection
          superheading={superheading}
          heading={heading}
          subheading={subheading}
        />
      </div>
      <div className="testimonials-container">
        <div className="container">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            centeredSlides={true}
            className="testimonials-slider"
            initialSlide={0}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: true }}
            loop
            // onSwiper={swiper => handleSwiper(swiper)}
          >
            {testimonials.map(testimonial => {
              return (
                <SwiperSlide key={testimonial.id}>
                  <div className="testimonial">
                    <div className="quotation-mark">
                      <FaQuoteRight color="var(--color-tertiary)" />
                    </div>
                    <div className="right-part">
                      <blockquote className="testimonial__pre-heading">
                        &#8220;{testimonial.data.Heading}&#8221;
                      </blockquote>

                      <div className="testimonial__text">
                        {parseMarkdown({
                          inputMarkdown: testimonial.data.Copy,
                        })}
                      </div>
                      <div className="testimonial__image-container">
                        <img
                          className="testimonial__image"
                          src={
                            testimonial?.data?.Media?.localFiles[0]?.publicURL
                          }
                          alt={testimonial.data.Subheading}
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
    </StyledTestimonialsSlider>
  )
}

export default TestimonialsSlider
