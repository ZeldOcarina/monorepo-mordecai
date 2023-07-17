import React from "react"
import styled from "styled-components"

const StyledYouTubeEmbed = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  height: 0px;

  iframe {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`

const YouTubeEmbed = ({ id }) => {
  return (
    <StyledYouTubeEmbed>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </StyledYouTubeEmbed>
  )
}

export default YouTubeEmbed
