// used to mark unsupported tokens, these are hosted lists of unsupported tokens

// const GEMINI_LIST = 'https://www.gemini.com/uniswap/manifest.json'
// const COINGECKO_LIST = 'https://tokens.coingecko.com/uniswap/all.json'
const BA_LIST = 'https://raw.githubusercontent.com/The-Blockchain-Association/sec-notice-list/master/ba-sec-list.json'
// const PANCAKE_LIST = 'https://tokens.pancakeswap.finance/pancakeswap-top-100.json'
// const PANCAKE_EXTENDED_LIST = 'https://tokens.pancakeswap.finance/pancakeswap-extended.json'
// const QUICKSWAP_LIST = 'https://unpkg.com/quickswap-default-token-list@1.0.74/build/quickswap-default.tokenlist.json'

const EMPIRE_LIST = 'https://tokens.empiredex.org/tokenlist.json'

export const UNSUPPORTED_LIST_URLS: string[] = [BA_LIST]

// lower index == higher priority for token import
export const DEFAULT_LIST_OF_LISTS: string[] = [
  EMPIRE_LIST,
  // COINGECKO_LIST,
  // GEMINI_LIST,
  // PANCAKE_LIST,
  // PANCAKE_EXTENDED_LIST,
  // QUICKSWAP_LIST,
  ...UNSUPPORTED_LIST_URLS // need to load unsupported tokens as well
]

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = [EMPIRE_LIST]
