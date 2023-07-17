import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import slugify from "slugify"

const StyledCategories = styled.aside`
  .title {
    text-align: center;
    text-transform: uppercase;
    font-size: 2.5rem;
    margin-bottom: var(--gutter);
  }

  .category-link {
    display: block;
    text-align: center;
    text-transform: uppercase;
    font-size: 1.8rem;
    padding: 0.8rem;
    color: var(--color-secondary);
    text-decoration: none;
    transition: all 0.3s ease-in-out;

    &:hover {
      color: var(--color-tertiary);
    }
  }
`

const Categories = ({ categories }) => {
  return (
    <StyledCategories>
      <h2 className="title">Categories</h2>
      {categories.map(category =>
        category === "All Posts" ? (
          <Link to="/dentistry-blog/" className="category-link" key={category}>
            {category}
          </Link>
        ) : (
          <Link
            className="category-link"
            key={category}
            to={`/dentistry-blog/category/${slugify(category, {
              lower: true,
            })}`}
          >
            {category}
          </Link>
        )
      )}
    </StyledCategories>
  )
}

export default Categories
