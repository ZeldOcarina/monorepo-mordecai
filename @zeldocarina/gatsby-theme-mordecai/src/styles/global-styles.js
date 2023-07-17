import React from "react"

import Abstracts from "./abstracts/abstracts"
import Animations from "./abstracts/animations"
import Base from "./base/base"
import Utils from "./utils/utils"
import Safari from "./utils/safari"

const GlobalStyles = () => {
  return (
    <>
      <Abstracts />
      <Animations />
      <Base />
      <Utils />
      <Safari />
    </>
  )
}

export default GlobalStyles
