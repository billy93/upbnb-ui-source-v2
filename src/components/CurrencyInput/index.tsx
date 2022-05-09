import React from 'react'
import { useWeb3React } from '@web3-react/core'
import NumericalInput from '../NumericalInput'
import { Box, Button, Text } from '@chakra-ui/react'
import { ROOTED_ADDRESS, ROOTED_TICKER } from '../../constants'

interface CurrencyInputProps {
  value: string
  onUserInput: (value: string) => void
  onSubmit: () => void
  onMax?: () => void
  showMaxButton: boolean
  label?: string
  hideBalance?: boolean
  hideInput?: boolean
  disabled?: boolean
  balance?: string,
  numericBalance?: number,
  balanceLabel?: string
  ticker: string
  id: string
}

export default function CurrencyInput({
  value,
  onUserInput,
  onSubmit,
  onMax,
  label = 'Input',
  showMaxButton,
  hideBalance = false,
  hideInput = false,
  disabled = false,
  balance,
  numericBalance,
  balanceLabel = 'Balance',
  ticker,
  id
}: CurrencyInputProps) {
  const { account } = useWeb3React()
  // const theme = useContext(ThemeContext)

  return (
    <Box className='stake_inpt_box'>
      <Box className='text_row'>
          <Text>Amount to {ticker === ROOTED_TICKER ? "stake" : "unstake"}</Text>
          <Text>{!hideBalance && balance ? `${balanceLabel}: ${balance}`: '-'}</Text>
      </Box>

      <Box className='inpt_btn_row'>
          <NumericalInput
            disabled={disabled}
            className="token-amount-input"
            value={value}
            onUserInput={val => onUserInput(val)}
            onSubmit={onSubmit}
          />
          {account && showMaxButton && (
              <Box className='btn_text_prnt'>
                <Button disabled={disabled || !balance || numericBalance === 0} onClick={onMax}>MAX</Button>
                <Text>{ticker}</Text>
              </Box>
          )}         
      </Box>
    </Box>
  )

  /*
  return (
    <InputPanel id={id}>
      <Container hideInput={hideInput}>
        {!hideInput && (
          <LabelRow>
            <RowBetween>
             <TYPE.body color={theme.text2} fontWeight={500} fontSize={14}>
                {label}
              </TYPE.body>
              {account && (
                <TYPE.body
                  onClick={ balance ? onMax : () =>{}}
                  color={ disabled? theme.bg5 : theme.text2}
                  fontWeight={500}
                  fontSize={14}
                  style={ balance ? { display: 'inline', cursor: 'pointer' } : { display: 'inline', cursor:'default' }}
                >
                  {!hideBalance && balance ? `${balanceLabel}: ${balance}`: '-'}
                </TYPE.body>
              )}
            </RowBetween>
          </LabelRow>
        )}
        <InputRow>
          <>
            <NumericalInput
              disabled={disabled}
              className="token-amount-input"
              value={value}
              onUserInput={val => onUserInput(val)}
              onSubmit={onSubmit}
            />
            {account && showMaxButton && (
              <StyledBalanceMax disabled={disabled || !balance || numericBalance === 0} onClick={onMax}>MAX</StyledBalanceMax>
            )}
            {ticker}
          </>
        </InputRow>
      </Container>
    </InputPanel>
  )
  */
}