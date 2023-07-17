import { createGlobalStyle, css } from "styled-components"
import respond from "../abstracts/mediaqueries"

export default createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  overflow-x: hidden;
  font-size: 10px;

  ${respond(
  "4k-tv",
  css`
      font-size: 20px;
    `
)}
}

body {
  font-family: var(--body-font);
  color: var(--black);
  font-size: var(--basic-font-size);
  font-weight: var(--body-font-weight);
  letter-spacing: 1px;
  line-height: 1.7;
  background-color: var(--body-background);
  overflow-x: hidden;
  overflow-y: hidden;
  color: var(--body-color);

  ${respond(
  "phone-land",
  css`
      font-size: var(--mobile-font-size);
      overflow-wrap: break-word;
    `
)}
  ${respond(
  "iphone-5",
  css`
      font-size: var(--mobile-font-size);
      overflow-wrap: anywhere;
    `
)}
${respond("big-desktop", css`
    font-size: 2.8rem;`
)}
}

h1 {
  font-size: var(--big-title);
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--heading-font);
  font-weight: var(--heading-font-weight);
  color: var(--body-color);
  letter-spacing: 2px;

  ${respond(
  "tab-land",
  css`
      font-size: 3.5rem;
    `
)}
  ${respond(
  "phone-land",
  css`
      font-size: var(--mobile-title-font-size);
    `
)}
}

h2,
h3,
h4,
h5,
h6 {
  font-size: var(--title-font-size);

  ${respond(
  "tab-land",
  css`
      font-size: 3rem;
    `
)}
  ${respond(
  "phone-port",
  css`
      font-size: 2.5rem;
    `
)}
${respond("big-desktop", css`
    font-size: 4rem;`
)}
}

p {
}

section {
  padding: var(--section-gutter) 0;

  ${respond(500, css`
      padding: var(--mobile-section-gutter) 0;
    `
)}
  
  ${respond(
  "big-desktop",
  css`
        padding: 8rem 0 18rem 0;
      `
)}
}

a {
  color: var(--black);
  text-decoration: none;
}

blockquote {
  color: var(--grey);
}

strong {
  font-weight: 700 !important;
  color: var(--black);
}

i {
  font-style: italic;
}

button {
  letter-spacing: inherit;
}
`
