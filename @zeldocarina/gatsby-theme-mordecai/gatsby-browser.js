/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

import React from "react"
import "./src/scss/index.scss"

import GlobalStyles from "./src/styles/global-styles"
import { ContextProvider } from "./src/context/AppContext"
import { LocationContext } from "./src/context/LocationContext"
import { parseParams } from "./src/utils/utils"

export const wrapRootElement = ({ element }) => {
  return <ContextProvider>{element}</ContextProvider>
}

export const wrapPageElement = ({ element }) => {
  const path = element.props.path;
  const params = parseParams(element.props.location.search)

  return (
    <>
      <GlobalStyles />
      <LocationContext.Provider value={{ params, path }}>
        {element}
      </LocationContext.Provider>
    </>
  )
}
