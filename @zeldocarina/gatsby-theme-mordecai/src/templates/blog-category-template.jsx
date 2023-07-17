import React, { useState, useEffect, createRef } from "react"
import styled, { css } from "styled-components"
import { graphql } from "gatsby"
import respond from "../styles/abstracts/mediaqueries"

import Layout from "../layout/Layout"
import Seo from "../components/Seo"
import { createCategoriesArray } from "../helpers/blog-helpers"

import BlogDisplay from "../components/blog/BlogDisplay"
import Categories from "../components/blog/Categories"
import BlogContainer from "../components/blog/BlogContainer"

const StyledBlog = styled.main`
  padding: var(--section-gutter) 0;

  ${respond(
    500,
    css`
      padding: var(--gutter) 0;
    `,
  )}

  .blog-title {
    text-align: center;
    text-transform: uppercase;
    font-size: 5rem;

    ${respond(
      500,
      css`
        font-size: 4rem;
      `,
    )}
  }
`

const Blog = ({
  location,
  data: {
    businessNameData: { businessNameData },
    blogSeoData,
    blogData: { blogData },
    allCategoriesData: { allCategoriesData },
  },
}) => {
  const [currentShownBlogs, setCurrentShownBlogs] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    // Show only the first 3 blogs on page load
    setCurrentShownBlogs(
      blogData
        .map(blog => {
          return {
            ...blog,
            ref: createRef(null),
          }
        })
        .slice(0, 3),
    )

    // Flatten the array and remove duplicates or nullish values
    const uniqueCategories = createCategoriesArray(allCategoriesData)
    console.log(uniqueCategories)
    setCategories(["All Posts", ...uniqueCategories])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // console.log(currentShownBlogs)

    // Add an Intersection Observer on the last shown blog
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log("Loading more blogs")
          // If the last shown blog is in view, add 3 more blogs to the shown blogs
          setCurrentShownBlogs(prev => [
            ...prev,
            ...blogData
              .map(blog => {
                return {
                  ...blog,
                  ref: createRef(null),
                }
              })
              .slice(prev.length, prev.length + 3),
          ])
        }
      },
      { threshold: 1 },
    )

    if (
      currentShownBlogs[currentShownBlogs.length - 1] &&
      currentShownBlogs[currentShownBlogs.length - 1].ref &&
      currentShownBlogs[currentShownBlogs.length - 1].ref.current
    ) {
      observer.observe(
        currentShownBlogs[currentShownBlogs.length - 1].ref.current,
      )
    }

    return () => {
      // Disconnect the observer when the component unmounts
      observer.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentShownBlogs])

  return (
    <Layout>
      <Seo
        title={`${businessNameData.Value} | ${
          blogSeoData?.blogSeoData?.Page_Title || ""
        }`}
        description={blogSeoData?.blogSeoData?.description || ""}
        mainKeyword={blogSeoData?.blogSeoData?.Main_Keyword || ""}
        relativeKeywords={blogSeoData?.blogSeoData?.Relative_Keywords || ""}
        origin={location.origin}
        pathname={location.pathname}
      />
      <StyledBlog>
        <h1 className="blog-title">{businessNameData.Value} blog</h1>
        <BlogContainer>
          <BlogDisplay currentShownBlogs={currentShownBlogs} />
          <Categories categories={categories} />
        </BlogContainer>
      </StyledBlog>
    </Layout>
  )
}

export const query = graphql`
  query CategoryBlogQuery($category: [String]!) {
    businessNameData: airtable(
      table: { eq: "Config" }
      data: { Label: { eq: "Business Name" } }
    ) {
      businessNameData: data {
        Value
      }
    }
    blogSeoData: airtable(
      table: { eq: "Sitemap" }
      data: { Permalink: { eq: "/dentistry-blog/" } }
    ) {
      blogSeoData: data {
        Page_Title
        Main_Keyword
        Relative_Keywords
        Description
      }
    }
    allCategoriesData: allAirtable(filter: { table: { eq: "Blog" } }) {
      allCategoriesData: nodes {
        data {
          Categories
        }
      }
    }
    blogData: allAirtable(
      filter: { table: { eq: "Blog" }, data: { Categories: { in: $category } } }
    ) {
      blogData: nodes {
        id
        data {
          AltText
          Categories
          createdDate
          Publish
          Heading
          Subheading
          Post
          postBlurb
          mainImage {
            localFiles {
              publicURL
            }
          }
          Categories
          slug
        }
      }
    }
  }
`

export default Blog
