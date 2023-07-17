import React, { useContext } from "react"
import styled, { css } from "styled-components"
import { graphql } from "gatsby"
import respond from "../styles/abstracts/mediaqueries"

import AppContext from "../context/AppContext"
import { hexToRGB, parseMarkdown } from "../helpers/helpers"

import Seo from "../components/Seo"
import Layout from "../layout/Layout"
import BlogContainer from "../components/blog/BlogContainer"
import IntroSection from "../components/IntroSection"
import Categories from "../components/blog/Categories"
import SharingIcons from "../components/blog/SharingIcons"
import RecentPosts from "../components/blog/RecentPosts"

const StyledBlogPostTemplate = styled.main`
  .main-image {
    width: 100%;
  }

  .blog-post {
    ${respond(
      500,
      css`
        max-width: 90%;
        margin: var(--gutter) auto;
      `
    )}
  }

  .intro-section {
    max-width: 100%;
    margin: 0;
    padding: 0;

    .superheading {
      ${respond(
        500,
        css`
          font-weight: 700;
        `
      )}
    }

    .heading {
      font-size: 4.2rem;
      margin: 1rem 0 1rem 0;

      ${respond(
        500,
        css`
          font-size: 3rem;
        `
      )}
    }

    &::after {
      display: none;
    }
  }

  .post-metadata {
    color: ${({ colors }) => hexToRGB(colors.bodyColor, 0.3)};
    margin: 1rem 0 0 0;
  }

  .copy {
    margin-top: var(--big-gutter);
    ul,
    p {
      margin: 1.5rem 0 1.5rem 0;
    }

    ul,
    ol {
      list-style-position: inside;
    }

    li {
      &:not(:last-child) {
        margin-bottom: 1.5rem;
      }
    }

    h2,
    h3,
    h4,
    h5,
    h6 {
      font-size: 3.5rem;
      margin: 4rem 0 2rem 0;

      ${respond(
        500,
        css`
          font-size: 2.5rem;
          margin: 3rem 0 2rem 0;
        `
      )}
    }
  }
`

const BlogPostTemplate = ({
  location,
  pageContext,
  data: {
    businessNameData: { businessNameData },
    postData: { postData },
    recentBlogsData: { recentBlogsData },
  },
}) => {
  const { colors, shortcodesData, businessPhoneData } = useContext(AppContext)

  const copy = parseMarkdown({
    inputMarkdown: postData.Post,
    businessName: shortcodesData.business.value,
    businessAddress: shortcodesData.address.value,
    zipCode: shortcodesData.zipcode.value,
    city: shortcodesData.city.value,
    state: shortcodesData.state.value,
    businessEmail: shortcodesData.businessEmail.value,
    siteUrl: shortcodesData.siteUrl.value,
    tel: businessPhoneData.tel,
    phone: businessPhoneData.phone,
  })

  return (
    <Layout>
      <Seo
        title={`${businessNameData.Value} | ${postData.SEOTitle}`}
        description={postData.Description}
        mainKeyword={postData.Main_Keyword}
        relativeKeywords={postData.Relative_Keywords}
        pathname={location.pathname}
      />
      <StyledBlogPostTemplate colors={colors}>
        <img
          src={postData.mainImage.localFiles[0].publicURL}
          alt={postData.AltText || "Blog main"}
          className="main-image"
        />
        <BlogContainer>
          <article className="blog-post">
            <IntroSection
              superheading={postData.Categories.join(", ")}
              heading={postData.Heading}
              subheading={postData.Subheading}
            />
            <div className="post-metadata">
              By <span className="author">{postData.Author.name}</span> on{" "}
              <span className="date">
                {new Date(postData.createdDate).toLocaleString("en-US", {
                  dateStyle: "long",
                  timeStyle: "short",
                })}
              </span>
            </div>
            <SharingIcons currentUrl={location.href} />
            <div className="copy">{copy}</div>
          </article>
          <Categories categories={pageContext.categories} />
        </BlogContainer>
        <RecentPosts posts={recentBlogsData} />
      </StyledBlogPostTemplate>
    </Layout>
  )
}

export const query = graphql`
  query ($id: String!) {
    businessNameData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "Business Name" } }
    ) {
      businessNameData: data {
        Value
      }
    }
    postData: airtable(table: { eq: "Blog" }, id: { eq: $id }) {
      postData: data {
        createdDate
        Heading
        Subheading
        Post
        postBlurb
        Author {
          name
        }
        Categories
        mainImage {
          localFiles {
            publicURL
          }
        }
        AltText
        SEOTitle
        Description
        Main_Keyword
        Relative_Keywords
      }
    }
    recentBlogsData: allAirtable(
      filter: { table: { eq: "Blog" }, data: { Publish: { eq: "Published" } } }
      limit: 9
      sort: { data: { createdDate: DESC } }
    ) {
      recentBlogsData: nodes {
        id
        data {
          slug
          thumbnail {
            localFiles {
              publicURL
            }
          }
          Heading
          createdDate
          postBlurb
        }
      }
    }
  }
`

export default BlogPostTemplate
