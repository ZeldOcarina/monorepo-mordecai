import { createGlobalStyle, css } from "styled-components"
import respond from "../abstracts/mediaqueries"

export default createGlobalStyle`
  .image-bw {
    filter: grayscale(100%);
    opacity: 0.6;
  }
  
  .bold {
    font-weight: bold;
  }
  
  .italics {
    font-style: italic;
  }
  
  .disabled-link {
    opacity: 0.5;
    pointer-events: none;
  }
  
  .invisible {
    opacity: 0;
  }
  
  .bold {
    font-weight: 700;
  }
  
  .mb-1 {
    margin-bottom: 1rem !important;
  }
  .mb-2 {
    margin-bottom: 2rem !important;
  }
  .mb-3 {
    margin-bottom: 3rem !important;
  }
  .mb-4 {
    margin-bottom: 4rem !important;
  }
  .mb-5 {
    margin-bottom: 5rem !important;
  }
  .mt-1 {
    margin-top: 1rem !important;
  }
  .mt-2 {
    margin-top: 2rem !important;
  }
  .mt-3 {
    margin-top: 3rem !important;
  }
  .mt-4 {
    margin-top: 4rem !important;
  }
  .mt-5 {
    margin-top: 5rem !important;
  }
  
  .bg-dark {
    background-color: var(--black);
  }

  .text-white {
    color: var(--white);
  }

  .green {
    color: green;
  }
  .red {
    color: red;
  }

  .color-secondary {
    color: var(--color-secondary);
  }

  .underlined {
    text-decoration: underline;
  }

  .small-title {
      color: var(--grey);
      font-weight: 500;
      font-family: var(--body-font);
      font-size: 3rem;
      text-align: center;
      text-transform: uppercase;
      margin-bottom: var(--gutter);
  }

  .container {
    ${respond(500, css`
      max-width: 90% !important;
    `)}
    
  }
  `