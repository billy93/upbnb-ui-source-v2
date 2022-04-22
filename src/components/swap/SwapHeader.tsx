import React from 'react'
import styled from 'styled-components'
import Settings from '../Settings'
import { RowBetween } from '../Row'
import { TYPE } from '../../theme'

const StyledSwapHeader = styled.div`
  padding: 12px 1rem 0px 1.5rem;
  margin-bottom: -4px;
  width: 100%;
  max-width: 100%;
  color: ${({ theme }) => theme.text2};
`

export default function SwapHeader() {
  return (
    <StyledSwapHeader className='swap_header_ash'>
      <RowBetween>
        <TYPE.black className='swap_text_as' fontWeight={500}>Swap</TYPE.black>
        <Settings />
      </RowBetween>
    </StyledSwapHeader>
  )
}
