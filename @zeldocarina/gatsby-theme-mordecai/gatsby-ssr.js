/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

// gatsby-ssr.js
const React = require("react")
require("./src/scss/index.scss")
const GlobalStyles = require("./src/styles/global-styles").default
const { ContextProvider } = require("./src/context/AppContext")

// exports.wrapRootElement = ({ element }) => {
//   return {element}</ContextProvider>
// }

exports.wrapPageElement = ({ element }) => {
  return (
    <>
      <GlobalStyles />
      <ContextProvider>
        {element}
      </ContextProvider>
    </>
  )
}
