import { createAction } from '@reduxjs/toolkit'

export enum Field {
  CURRENCY_A = 'CURRENCY_A',
  CURRENCY_B = 'CURRENCY_B',
}

export enum Metadata {
  SWEEPABLE = 'SWEEPABLE',
  LOCKTIME = 'LOCKTIME'
}

export const typeInput = createAction<{ field: Field; typedValue: string; noLiquidity: boolean }>('mint/typeInputMint')
export const metadataInput = createAction<{ field: Metadata; typedValue: number; }>('mint/metadataMint')
export const resetMintState = createAction<void>('mint/resetMintState')
