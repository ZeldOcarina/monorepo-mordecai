import { Script } from "gatsby"
import React from "react"
import styled from "styled-components"

const StyledSharingIcons = styled.div`
  margin-top: 3rem;
  .fb-share-button {
  }
`

const SharingIcons = ({ currentUrl }) => {
  return (
    <StyledSharingIcons>
      {/* <!-- Go to www.addthis.com/dashboard to customize your tools --> */}
      <Script
        type="text/javascript"
        src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-6324b243eb0cdcf8"
      ></Script>

      {/* <!-- Go to www.addthis.com/dashboard to customize your tools --> */}
      <div className="addthis_inline_share_toolbox"></div>
    </StyledSharingIcons>
  )
}

export default SharingIcons
