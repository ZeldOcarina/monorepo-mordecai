import React from "react"
import styled from "styled-components"
import FaqItem from "./FaqItem"
import IntroSection from "./IntroSection"

const StyledFaqs = styled.section`
  background-color: var(--background-color);
  ${({ $noPaddingTop }) => {
    return $noPaddingTop && "padding-top: 0;"
  }}
`

function Faqs({ faqs, superheading, heading, subheading, noPaddingTop, id }) {
  return (
    <StyledFaqs $noPaddingTop={noPaddingTop} id={id}>
      <div className="container">
        <IntroSection
          superheading={superheading}
          heading={heading}
          subheading={subheading}
          noPaddingTop={noPaddingTop}
        ></IntroSection>
        {faqs.map(({ id, data }) => {
          // console.log(data)
          return (
            <FaqItem
              {...{ question: data.Heading, answer: data.Copy }}
              key={id}
            />
          )
        })}
      </div>
    </StyledFaqs>
  )
}

export default Faqs
