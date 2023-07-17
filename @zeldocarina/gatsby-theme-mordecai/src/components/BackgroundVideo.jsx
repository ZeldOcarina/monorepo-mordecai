import React from "react"
import styled from "styled-components"

const StyledBackgroundVideo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 0;
  overflow: hidden;

  .content {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
`

const BackgroundVideo = ({ video, mimeType }) => {
  return (
    <StyledBackgroundVideo>
      <video className="content" autoPlay muted loop playsInline>
        <source src={video} type={mimeType} />
        Your browser is not supported! Please use Google Chrome or Firefox.
      </video>
    </StyledBackgroundVideo>
  )
}

export default BackgroundVideo
