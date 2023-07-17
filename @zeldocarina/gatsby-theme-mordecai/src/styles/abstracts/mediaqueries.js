const BASE_PIXELS = 16

function respond(breakpoint, css) {
  switch (breakpoint) {
    case "iphone-5":
      return `@media only screen and (max-width: ${320 / BASE_PIXELS}em) {
                ${css}
              }` // 365px
    case "small-phone":
      return `@media only screen and (max-width: ${375 / BASE_PIXELS}em) {
                ${css}
              }`
    case "iphone-12-mini":
      return `@media only screen and (max-width: ${360 / BASE_PIXELS}em) {
                ${css}
              }`
    case "iphone-12":
      return `@media only screen and (max-width: ${390 / BASE_PIXELS}em) {
                ${css}
              }`
    case "iphone-8-plus":
      return `@media only screen and (max-width: ${414 / BASE_PIXELS}em) {
                ${css}
              }`
    case "iphone-12-pro-max":
      return `@media only screen and (max-width: ${428 / BASE_PIXELS}em) {
                ${css}
              }`
    case "phone-port":
      return `@media only screen and (max-width: ${450 / BASE_PIXELS}em) {
                ${css}
              }`
    case "iphone-5-land":
      return `@media only screen and (max-width: ${568 / BASE_PIXELS}em) {
                ${css}
              }`
    case "nexus-7":
      return `@media only screen and (max-width: ${600 / BASE_PIXELS}em) {
                ${css}
              }`
    case "iphone-8-land":
      return `@media only screen and (max-width: ${667 / BASE_PIXELS}em) {
                ${css}
              }`
    case "iphone-8-plus-land":
      return `@media only screen and (max-width: ${736 / BASE_PIXELS}em) {
                ${css}
              }`
    case "ipad-port":
      return `@media only screen and (max-width: ${768 / BASE_PIXELS}em) {
                ${css}
              }`
    case "iphone-12-mini-land":
      return `@media only screen and (max-width: ${780 / BASE_PIXELS}em) {
                ${css}
              }`
    case "ipad-pro-10-port":
      return `@media only screen and (max-width: ${834 / BASE_PIXELS}em) {
                ${css}
              }`
    case "ipad-pro-11-port":
      return `@media only screen and (max-width: ${834 / BASE_PIXELS}em) {
                ${css}
              }`
    case "iphone-12-land":
      return `@media only screen and (max-width: ${844 / BASE_PIXELS}em) {
                ${css}
              }`
    case "phone-land":
      return `@media only screen and (max-width: ${900 / BASE_PIXELS}em) {
                ${css}
              }`
    case "tab-port":
      return `@media only screen and (max-width: ${900 / BASE_PIXELS}em) {
                ${css}
              }`
    case "iphone-12-pro-land":
      return `@media only screen and (max-width: ${926 / BASE_PIXELS}em) {
                ${css}
              }`
    case "nexus-7-land":
      return `@media only screen and (max-width: ${960 / BASE_PIXELS}em) {
                ${css}
              }`
    case "tab-land":
      return `@media only screen and (max-width: ${1024 / BASE_PIXELS}em) {
                ${css}
              }`
    case "ipad-pro-12-port":
      return `@media only screen and (max-width: ${1024 / BASE_PIXELS}em) {
                ${css}
              }`
    case "ipad-pro-10.5-land":
      return `@media only screen and (max-width: ${1112 / BASE_PIXELS}em) {
                ${css}
              }`
    case "ipad-pro-11-land":
      return `@media only screen and (max-width: ${1194 / BASE_PIXELS}em) {
                ${css}
              }`
    case "laptop-s":
      return `@media only screen and (max-width: ${1280 / BASE_PIXELS}em) {
                ${css}
              }`
    case "ipad-pro-12.9-land":
      return `@media only screen and (max-width: ${1366 / BASE_PIXELS}em) {
                ${css}
              }`
    case "notebook":
      return `@media only screen and (max-width: ${1366 / BASE_PIXELS}em) {
                ${css}
              }`
    case "macbook-air":
      return `@media only screen and (max-width: ${1440 / BASE_PIXELS}em) {
                ${css}
              }`
    case "laptop":
      return `@media only screen and (max-width: ${1634 / BASE_PIXELS}em) {
                ${css}
              }`
    case "big-laptop":
      return `@media only screen and (max-width: ${1920 / BASE_PIXELS}em) {
                ${css}
              }`
    case "big-desktop":
      return `@media only screen and (min-width: ${2500 / BASE_PIXELS}em) {
                ${css}
              }`
    case "4k-tv":
      return `@media only screen and (min-width: ${3800 / BASE_PIXELS}em) {
                ${css}
              }`
    case "no-hover":
      return `@media (hover: none) and (pointer: coarse) {
                ${css}
              }`
    default:
      return `@media only screen and (max-width: ${breakpoint / BASE_PIXELS}em) {
        ${css}
      }`
  }
}

export default respond
