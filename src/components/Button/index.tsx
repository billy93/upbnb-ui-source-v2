import React from 'react'
import styled from 'styled-components'
import { Button as RebassButton, ButtonProps } from 'rebass/styled-components'
import { darken, lighten, transparentize } from 'polished'
import { AutoRow } from '../Row'
import Loader from '../Loader'

const Base = styled(RebassButton) <{
  padding?: string
  width?: string
  borderRadius?: string
  altDisabledStyle?: boolean
}>`
  padding: ${({ padding }) => (padding ? padding : '1.2em')};
  width: ${({ width }) => (width ? width : '100%')};
  font-family:Arial;
  font-weight: 500;
  font-size: 1em;
  text-align: center;
  text-transform: uppercase;
  border-radius: 0.75em;
  border-radius: ${({ borderRadius }) => borderRadius && borderRadius};
  outline: none;
  border: 1px solid transparent;
  color: white;
  text-decoration: none;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
  &:disabled {
    cursor: auto;
  }

  > * {
    user-select: none;
  }
`

// A button that triggers some onClick result, but looks like a link.
export const LinkStyledButton = styled.button<{ disabled?: boolean }>`
  border: none;
  text-decoration: none;
  background: none;

  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  color: ${({ theme, disabled }) => (disabled ? theme.text2 : theme.primary1)};
  font-weight: 500;

  :hover {
    text-decoration: ${({ disabled }) => (disabled ? null : 'underline')};
  }

  :focus {
    outline: none;
    text-decoration: ${({ disabled }) => (disabled ? null : 'underline')};
  }

  :active {
    text-decoration: none;
  }
`

export const ButtonPrimary = styled(Base)`
  background-color: ${({ theme }) => theme.primary1};
  color:  ${({ theme }) => theme.text1};
  &:hover {
    background-color: ${({ theme }) => darken(0.1, theme.primary1)};
  }
  &:disabled {
    background-color: ${({ theme, altDisabledStyle }) => (altDisabledStyle ? theme.primary1 : theme.bg3)};
    color: ${({ theme, altDisabledStyle }) => (altDisabledStyle ? 'white' : theme.text3)};
    cursor: auto;
    box-shadow: none;
    border: 1px solid transparent;
    outline: none;
    opacity: ${({ altDisabledStyle }) => (altDisabledStyle ? '0.7' : '1')};
  }
`

export const ButtonPrimaryGreen = styled(ButtonPrimary)`
  background-color: ${({ theme }) => theme.green1};

  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.05, theme.green1)};
    background-color: ${({ theme }) => darken(0.05, theme.green1)};
  }

  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.green1)};
  }

  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.1, theme.green1)};
    background-color: ${({ theme }) => darken(0.1, theme.green1)};
  }

  &:disabled {
    background-color: ${({ theme, altDisabledStyle }) => (altDisabledStyle ? theme.green1 : theme.bg3)};
  }`

export const ButtonPrimaryRed = styled(ButtonPrimary)`
  background-color: ${({ theme }) => darken(0.05, theme.red1)};

  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.1, theme.red1)};
    background-color: ${({ theme }) => darken(0.1, theme.red1)};
  }

  &:hover {
    background-color: ${({ theme }) => darken(0.1, theme.red1)};
  }

  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.15, theme.red1)};
    background-color: ${({ theme }) => darken(0.15, theme.red1)};
  }

  &:disabled {
    background-color: ${({ theme, altDisabledStyle }) => (altDisabledStyle ? darken(0.05, theme.red1) : theme.bg3)};
  }
`

export const ButtonSecondary = styled(Base)`
  border: 1px solid ${({ theme }) => theme.primary4};
  color: ${({ theme }) => theme.primary1};
  background-color: transparent;
  font-size: 16px;
  border-radius: 12px;
  padding: ${({ padding }) => (padding ? padding : '10px')};

  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => theme.primary4};
    border: 1px solid ${({ theme }) => theme.primary3};
  }
  &:hover {
    border: 1px solid ${({ theme }) => theme.primary3};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => theme.primary4};
    border: 1px solid ${({ theme }) => theme.primary3};
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
  a:hover {
    text-decoration: none;
  }
`

export const Option = styled.button<{ active: boolean, padding?: string }>`
  align-items: center;
  padding: ${({ padding }) => (padding ? padding : '0.5em')};
  font-size: 1em;
  text-align: center;
  border-radius: 0.5em;
  min-width: 5em;
  border: 1px solid ${({ theme, active }) => (active ? theme.primary1 : theme.bg2)};
  outline: none;
  cursor: pointer;
  
  background-color: ${({ theme, active }) => (active ? theme.bg1 : transparentize(0.7, theme.bg2))};
  color: ${({ theme, active }) => (active ? theme.primary1 : theme.text3)};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
  min-width: 4em;
`};
`

const ButtonConfirmedStyle = styled(Base)`
  background-color: ${({ theme }) => lighten(0.5, theme.primary1)};
  color: ${({ theme }) => theme.primary1};
  border: 1px solid ${({ theme }) => theme.primary1};

  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
`

export function ButtonConfirmed({
  confirmed,
  altDisabledStyle,
  ...rest
} : { confirmed?: boolean; altDisabledStyle?: boolean } & ButtonProps) {
  if (confirmed) {
    return <ButtonConfirmedStyle {...rest} />
  } else {
    return <ButtonPrimary {...rest} altDisabledStyle={altDisabledStyle} />
  }
}

export const PendingContent = ({text} : {text:string}) =>{

  return(
    <AutoRow gap="0.5em" justify="center">
       {text}
      <Loader stroke="#6C7284" />
    </AutoRow>
  )
}

export const ButtonEmpty = styled(Base)`
  background-color: transparent;
  color: ${({ theme }) => theme.text2};
  display: flex;
  justify-content: center;
  align-items: center;

  &:focus {
    text-decoration: underline;
  }
  &:hover {
    text-decoration: none;
  }
  &:active {
    text-decoration: none;
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
`

const ButtonErrorStyle = styled(Base)`
  background-color: ${({ theme }) => theme.red1};
  border: 1px solid ${({ theme }) => theme.red1};

  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.05, theme.red1)};
    background-color: ${({ theme }) => darken(0.05, theme.red1)};
  }
  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.red1)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.1, theme.red1)};
    background-color: ${({ theme }) => darken(0.1, theme.red1)};
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
    box-shadow: none;
    background-color: ${({ theme }) => theme.red1};
    border: 1px solid ${({ theme }) => theme.red1};
  }
`

export const ButtonLight = styled(Base)`
  background-color: ${({ theme }) => theme.primary5};
  color: ${({ theme }) => theme.primaryText1};
  font-size: 16px;
  font-weight: 500;
  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme, disabled }) => !disabled && darken(0.03, theme.primary5)};
    background-color: ${({ theme, disabled }) => !disabled && darken(0.03, theme.primary5)};
  }
  &:hover {
    background-color: ${({ theme, disabled }) => !disabled && darken(0.03, theme.primary5)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme, disabled }) => !disabled && darken(0.05, theme.primary5)};
    background-color: ${({ theme, disabled }) => !disabled && darken(0.05, theme.primary5)};
  }
  :disabled {
    opacity: 0.4;
    :hover {
      cursor: auto;
      background-color: ${({ theme }) => theme.primary5};
      box-shadow: none;
      border: 1px solid transparent;
      outline: none;
    }
  }
`
export function ButtonError({ error, ...rest }: { error?: boolean } & ButtonProps) {
  if (error) {
    return <ButtonErrorStyle {...rest} />
  } else {
    return <ButtonPrimary {...rest} />
  }
}