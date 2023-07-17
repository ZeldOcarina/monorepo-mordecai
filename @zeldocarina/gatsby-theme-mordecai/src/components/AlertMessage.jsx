import React from "react"
import styled, { css } from "styled-components"

const Wrapper = styled.span`
  position: fixed;
  top: 5rem;
  right: ${({ shown }) => {
    return shown ? "5rem" : "-200%"
  }};
  font-weight: 700;
  padding: 1.5rem 2rem;
  border-radius: 3px;
  z-index: 500;
  font-size: 2rem;
  ${({ successful }) => {
    return successful
      ? css`
          background-color: #c5e3c3;
          color: darkgreen;
        `
      : css`
          background-color: #e3c3c3;
          color: darkred;
        `
  }}
  transition: all .5s ease-in-out;
`

const AlertMessage = ({ message, successful, shown }) => {
  // useEffect(() => {
  //   console.log(successful)
  // }, [successful])

  return (
    <Wrapper message={message} successful={successful} shown={shown}>
      {message}
    </Wrapper>
  )
}

export default AlertMessage
