import React from "react"
import styled, { css } from "styled-components"
import PropTypes from "prop-types"
import respond from "../styles/abstracts/mediaqueries"

const StyledListItem = styled.li`
  display: grid;
  grid-template-columns: max-content 1fr;
  align-items: center;
  gap: var(--gutter);

  margin-bottom: var(--small-gutter);

  img {
    ${respond(
      "iphone-12-mini-land",
      css`
        width: 1.8rem;
      `
    )}
  }
`

/********************
 * @param {string} item
 * @param {string} icon
 ********************/

const ListItem = ({ item, icon }) => {
  return (
    <StyledListItem>
      <img src={icon} alt="checkmark" />
      <span>{item}</span>
    </StyledListItem>
  )
}

ListItem.propTypes = {
  item: PropTypes.string.isRequired,
  icon: PropTypes.string,
}

export default ListItem
