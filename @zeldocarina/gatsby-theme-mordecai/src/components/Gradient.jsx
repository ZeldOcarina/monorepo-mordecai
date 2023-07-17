import React, { useContext } from "react"
import styled from "styled-components"
import AppContext from "../context/AppContext"
import { hexToRGB } from "../helpers/helpers"

const StyledGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: ${({ background }) => background};
  display: none;
`

const Gradient = () => {
  const { colors } = useContext(AppContext)
  const background = `
  linear-gradient(
    to bottom, 
    ${hexToRGB(colors.white, 1)} 0%, 
    ${hexToRGB(colors.colorTertiary, 0)} 40%, 
  ${hexToRGB(colors.bodyBackground, 0)} 100%);
  `
  return <StyledGradient background={background} />
}

export default Gradient
