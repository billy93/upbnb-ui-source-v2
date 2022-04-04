import styled from 'styled-components'
import React, { HTMLProps } from 'react'
import { lighten } from 'polished'

const StyledLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.primary1};
  font-weight: 500;
  font-size: 1em;
  :hover {
    text-decoration: none;
    color: ${({ theme }) => lighten(0.2, theme.text2)};
  }

  :focus {
    outline: none;
    text-decoration: none;
  }

  :active {
    text-decoration: none;
  }
`
  export function ExternalLink({
    target = '_blank',
    href,
    rel = 'noopener noreferrer',
    ...rest
  }: Omit<HTMLProps<HTMLAnchorElement>, 'as' | 'ref' | 'onClick'> & { href: string }) {

    return <StyledLink target={target} rel={rel} href={href} {...rest} />
  }