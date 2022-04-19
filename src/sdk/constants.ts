import JSBI from 'jsbi'

// exports for external consumption
export type BigintIsh = JSBI | bigint | string

export enum ChainId {
  BSC = 56
}

export enum TradeType {
  EXACT_INPUT,
  EXACT_OUTPUT
}

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP
}

export const LOCKTYPE: {key:number, value :string, creatable:boolean  }[] = [
  { key: 3, value: '3 Months', creatable: true },
  { key: 6, value: '6 Months', creatable: true },
  { key: 12, value: '12 Months', creatable: true }
]

export const SWEEPABLE: { key:number, value :string, creatable:boolean }[] = [
  { key: 0, value: 'Standard', creatable: true },
  { key: 1, value: 'Liquidity Locked', creatable: true },
  { key: 2, value: 'TokenA', creatable: false },
  { key: 3, value: 'TokenB', creatable: false }
]

// export const FACTORY_ADDRESS = '0x06530550A48F990360DFD642d2132354A144F31d'
export const FACTORY_ADDRESS = '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73'

// export const INIT_CODE_HASH = '0xf1fe94ebb9864b9c3f0bc8f49c058990133fe8cb981093210b082b8f6b383b13'
export const INIT_CODE_HASH = '0x00fb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5'
export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000)

// exports for internal consumption
export const ZERO = JSBI.BigInt(0)
export const ONE = JSBI.BigInt(1)
export const TWO = JSBI.BigInt(2)
export const THREE = JSBI.BigInt(3)
export const FIVE = JSBI.BigInt(5)
export const TEN = JSBI.BigInt(10)
export const _100 = JSBI.BigInt(100)
export const _997 = JSBI.BigInt(997)
export const _1000 = JSBI.BigInt(1000)

export enum SolidityType {
  uint8 = 'uint8',
  uint256 = 'uint256'
}

export const SOLIDITY_TYPE_MAXIMA = {
  [SolidityType.uint8]: JSBI.BigInt('0xff'),
  [SolidityType.uint256]: JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
}
