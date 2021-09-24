import { TokenAmount } from "./safe-math";

export interface Token {
  symbol: string,
  name: string,
  mintAddress: string,
  decimals: number,
  icon?: string,
  balance?: TokenAmount,
}

export interface LPToken {
  symbol: string,
  name: string,
  coin: Token,
  pc: Token,
  mintAddress: string,
  decimals: number,
  url?: string,
  urlHelper?: string,
  balance?: TokenAmount,
}

export const TOKENS: { [key: string]: Token } = {
  USDC: {
    symbol: 'USDC',
    name: 'USDC',
    mintAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    decimals: 6,
    icon: 'https://sdk.raydium.io/icons/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v.png',
  },
  RAY: {
    symbol: 'RAY',
    name: 'Raydium',
    mintAddress: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
    decimals: 6,
    icon: 'https://sdk.raydium.io/icons/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R.png',
  },
  ETH: {
    symbol: 'ETH',
    name: 'Wrapped Ethereum',
    mintAddress: '2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk',
    decimals: 6,
    icon: 'https://sdk.raydium.io/icons/2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk.png',
  },
  BTC: {
    symbol: 'BTC',
    name: 'Wrapped Bitcoin',
    mintAddress: '9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E',
    decimals: 6,
    icon: 'https://sdk.raydium.io/icons/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E.png',
  },
  SOL: {
    symbol: 'SOL',
    name: 'Native Solana',
    mintAddress: '11111111111111111111111111111111',
    decimals: 9,
  },
  USDT: {
    symbol: 'USDT',
    name: 'USDT',
    mintAddress: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
    decimals: 6,
    icon: 'https://sdk.raydium.io/icons/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB.png',
  },
}

export const LP_TOKENS = {
  'RAY-USDC-V3': {
    symbol: 'RAY-USDC',
    name: 'RAY-USDC',
    coin: { ...TOKENS.RAY },
    pc: { ...TOKENS.USDC },

    mintAddress: 'BZFGfXMrjG2sS7QT2eiCDEevPFnkYYF7kzJpWfYxPbcx',
    decimals: TOKENS.RAY.decimals,
    url: 'https://raydium.io/liquidity/?ammId=6UmmUiYoBjSrhakAobJw8BvkmJtDVxaeBtbt7rxWo1mg',
    urlHelper: 'Raydium',
  },
  'RAY-ETH-V3': {
    symbol: 'RAY-ETH',
    name: 'RAY-ETH',
    coin: { ...TOKENS.RAY },
    pc: { ...TOKENS.ETH },

    mintAddress: '8Q6MKy5Yxb9vG1mWzppMtMb2nrhNuCRNUkJTeiE3fuwD',
    decimals: TOKENS.RAY.decimals,
    url: 'https://raydium.io/liquidity/?ammId=8iQFhWyceGREsWnLM8NkG9GC8DvZunGZyMzuyUScgkMK',
    urlHelper: 'Raydium',
  },
  'ETH-USDC-V4': {
    symbol: 'ETH-USDC',
    name: 'ETH-USDC',
    coin: { ...TOKENS.ETH },
    pc: { ...TOKENS.USDC },

    mintAddress: '13PoKid6cZop4sj2GfoBeujnGfthUbTERdE5tpLCDLEY',
    decimals: TOKENS.ETH.decimals,
    url: 'https://raydium.io/liquidity/?ammId=AoPebtuJC4f2RweZSxcVCcdeTgaEXY64Uho8b5HdPxAR',
    urlHelper: 'Raydium',
  },
  'BTC-USDC-V4': {
    symbol: 'BTC-USDC',
    name: 'BTC-USDC',
    coin: { ...TOKENS.BTC },
    pc: { ...TOKENS.USDC },

    mintAddress: '2hMdRdVWZqetQsaHG8kQjdZinEMBz75vsoWTCob1ijXu',
    decimals: TOKENS.BTC.decimals,
    url: 'https://raydium.io/liquidity/?ammId=6kbC5epG18DF2DwPEW34tBy5pGFS7pEGALR3v5MGxgc5',
    urlHelper: 'Raydium',
  },
  'BTC-USDT-V4': {
    symbol: 'BTC-USDT',
    name: 'BTC-USDT',
    coin: { ...TOKENS.BTC },
    pc: { ...TOKENS.USDT },

    mintAddress: 'DgGuvR9GSHimopo3Gc7gfkbKamLKrdyzWkq5yqA6LqYS',
    decimals: TOKENS.BTC.decimals,
    url: 'https://raydium.io/liquidity/?ammId=AMMwkf57c7ZsbbDCXvBit9zFehMr1xRn8ZzaT1iDF18o',
    urlHelper: 'Raydium',
  },
  'SOL-USDC-V4': {
    symbol: 'SOL-USDC',
    name: 'SOL-USDC',
    coin: { ...TOKENS.SOL },
    pc: { ...TOKENS.USDC },

    mintAddress: '8HoQnePLqPj4M7PUDzfw8e3Ymdwgc7NLGnaTUapubyvu',
    decimals: TOKENS.SOL.decimals,
    url: 'https://raydium.io/liquidity/?ammId=58oQChx4yWmvKdwLLZzBi4ChoCc2fqCUWBkwMihLYQo2',
    urlHelper: 'Raydium',
  },
};
