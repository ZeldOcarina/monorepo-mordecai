import React, { useContext } from "react"

import styled from "styled-components"
import { parseMarkdown } from "../../helpers/helpers"

import AppContext from "../../context/AppContext"
import SummaryBlogPost from "./SummaryBlogPost"

const StyledBlogDisplay = styled.section`
  display: grid;
  gap: 0;
  padding: 0;
`

const BlogDisplay = ({ currentShownBlogs, isSingleBlog, postData }) => {
  const { shortcodesData } = useContext(AppContext)

  console.log(postData)

  if (isSingleBlog)
    return (
      <SummaryBlogPost
        isSingleBlog
        heading={postData.Heading}
        mainImage={postData.mainImage}
        altText={postData.AltText}
        postBlurb={postData.parsedBlurb}
        slug={postData.slug}
        copy={parseMarkdown({ inputMarkdown: postData.Post })}
      />
    )

  return (
    <StyledBlogDisplay id="blog-summary">
      {currentShownBlogs.map(
        ({
          data: { Heading, mainImage, AltText, postBlurb, slug },
          id,
          ref,
        }) => {
          const parsedBlurb = parseMarkdown({
            inputMarkdown: postBlurb,
            businessName: shortcodesData.business.value,
            businessAddress: shortcodesData.address.value,
            zipCode: shortcodesData.zipcode.value,
            city: shortcodesData.city.value,
            state: shortcodesData.state.value,
            //phone: shortcodesData.businessPhoneData.phone,
            //tel: businessPhoneData.tel,
            businessEmail: shortcodesData.businessEmail.value,
            siteUrl: shortcodesData.siteUrl.value,
          })
          return (
            <SummaryBlogPost
              key={id}
              heading={Heading}
              mainImage={mainImage}
              altText={AltText}
              postBlurb={parsedBlurb}
              slug={slug}
              innerRef={ref}
            />
          )
        }
      )}
    </StyledBlogDisplay>
  )
}

export default BlogDisplay
