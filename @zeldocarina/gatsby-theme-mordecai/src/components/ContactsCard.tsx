import React from "react"
import styled, { css } from "styled-components"

// @ts-expect-error
import respond from "../styles/abstracts/mediaqueries"

interface IContactsCardProps extends React.PropsWithChildren {
  className?: string
  color?: string
  bgColor?: string
}

const StyledContactsCard = styled.div<{ $color?: string; $bgColor?: string }>`
  color: ${({ $color }) => ($color ? $color : "var(--body-color)")};
  background-color: ${({ $bgColor }) => ($bgColor ? $bgColor : "var(--white)")};
  padding: 5rem;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${respond(
    400,
    css`
      padding: 2rem;
    `,
  )}
`

const ContactsCard = ({
  children,
  className,
  color,
  bgColor,
}: IContactsCardProps) => {
  return (
    <StyledContactsCard
      className={className ? className : "card"}
      $color={color}
      $bgColor={bgColor}
    >
      {children}
    </StyledContactsCard>
  )
}

export default ContactsCard
