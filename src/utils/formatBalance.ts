import BigNumber from 'bignumber.js'

export const getBalanceNumber = (balance: any, decimals = 18) => {
  const displayBalance = new BigNumber(balance.toString()).dividedBy(new BigNumber(10).pow(decimals))
  return displayBalance.toNumber()
}

export const getDisplayBalance = (balance: BigNumber, displayDecimals = 4, decimals = 18) => {
  const displayBalance = balance.dividedBy(new BigNumber(10).pow(decimals))
  return parseFloat(displayBalance.toFixed(displayDecimals, 1)).toLocaleString(undefined, { maximumFractionDigits: displayDecimals, minimumFractionDigits: displayDecimals })
}

export const getFullDisplayBalance = (balance: BigNumber, decimals = 18) => {
  return balance.dividedBy(new BigNumber(10).pow(decimals)).toFixed()
}
