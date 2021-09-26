import axios from 'axios';
import { cloneDeep } from 'lodash';
import { TokenAmount } from "./safe-math";

export interface Token {
  symbol: string,
  name: string,
  mintAddress: string,
  decimals: number,
  icon?: string,
  balance?: TokenAmount,
  currentValue?: number,
}

export interface LPToken {
  symbol: string,
  name: string,
  coin: Token,
  pc: Token,
  mintAddress: string,
  decimals: number,
  totalSupply?: TokenAmount,
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
  },
  RAY: {
    symbol: 'RAY',
    name: 'Raydium',
    mintAddress: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
    decimals: 6,
  },
  ETH: {
    symbol: 'ETH',
    name: 'Wrapped Ethereum',
    mintAddress: '2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk',
    decimals: 6,
  },
  BTC: {
    symbol: 'BTC',
    name: 'Wrapped Bitcoin',
    mintAddress: '9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E',
    decimals: 6,
  },
  SOL: {
    symbol: 'SOL',
    name: 'Native Solana',
    mintAddress: '11111111111111111111111111111111',
    decimals: 9,
    icon: '/native_sol.png'
  },
  USDT: {
    symbol: 'USDT',
    name: 'USDT',
    mintAddress: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
    decimals: 6,
  },
  WSOL: {
    symbol: 'WSOL',
    name: 'Wrapped Solana',
    mintAddress: 'So11111111111111111111111111111111111111112',
    decimals: 9,
  },
  WUSDT: {
    symbol: 'WUSDT',
    name: 'Wrapped USDT',
    mintAddress: 'BQcdHdAQW1hczDbBi9hiegXAR7A98Q9jx3X3iBBBDiq4',
    decimals: 6,
  },
  WUSDC: {
    symbol: 'WUSDC',
    name: 'Wrapped USDC',
    mintAddress: 'BXXkv6z8ykpG1yuvUDPgh732wzVHB69RnB9YgSYh3itW',
    decimals: 6,
  },
  YFI: {
    symbol: 'YFI',
    name: 'Wrapped YFI',
    mintAddress: '3JSf5tPeuscJGtaCp5giEiDhv51gQ4v3zWg8DGgyLfAB',
    decimals: 6,
  },
  LINK: {
    symbol: 'LINK',
    name: 'Wrapped Chainlink',
    mintAddress: 'CWE8jPTUYhdCTZYWPTe1o5DFqfdjzWKc9WKz6rSjQUdG',
    decimals: 6,
  },
  XRP: {
    symbol: 'XRP',
    name: 'Wrapped XRP',
    mintAddress: 'Ga2AXHpfAF6mv2ekZwcsJFqu7wB4NV331qNH7fW9Nst8',
    decimals: 6,
  },
  SUSHI: {
    symbol: 'SUSHI',
    name: 'Wrapped SUSHI',
    mintAddress: 'AR1Mtgh7zAtxuxGd2XPovXPVjcSdY3i4rQYisNadjfKy',
    decimals: 6,
  },
  ALEPH: {
    symbol: 'ALEPH',
    name: 'Wrapped ALEPH',
    mintAddress: 'CsZ5LZkDS7h9TDKjrbL7VAwQZ9nsRu8vJLhRYfmGaN8K',
    decimals: 6,
  },
  SXP: {
    symbol: 'SXP',
    name: 'Wrapped SXP',
    mintAddress: 'SF3oTvfWzEP3DTwGSvUXRrGTvr75pdZNnBLAH9bzMuX',
    decimals: 6,
  },
  HGET: {
    symbol: 'HGET',
    name: 'Wrapped HGET',
    mintAddress: 'BtZQfWqDGbk9Wf2rXEiWyQBdBY1etnUUn6zEphvVS7yN',
    decimals: 6,
  },
  CREAM: {
    symbol: 'CREAM',
    name: 'Wrapped CREAM',
    mintAddress: '5Fu5UUgbjpUvdBveb3a1JTNirL8rXtiYeSMWvKjtUNQv',
    decimals: 6,
  },
  UBXT: {
    symbol: 'UBXT',
    name: 'Wrapped UBXT',
    mintAddress: '873KLxCbz7s9Kc4ZzgYRtNmhfkQrhfyWGZJBmyCbC3ei',
    decimals: 6,
  },
  HNT: {
    symbol: 'HNT',
    name: 'Wrapped HNT',
    mintAddress: 'HqB7uswoVg4suaQiDP3wjxob1G5WdZ144zhdStwMCq7e',
    decimals: 6,
  },
  FRONT: {
    symbol: 'FRONT',
    name: 'Wrapped FRONT',
    mintAddress: '9S4t2NEAiJVMvPdRYKVrfJpBafPBLtvbvyS3DecojQHw',
    decimals: 6,
  },
  AKRO: {
    symbol: 'AKRO',
    name: 'Wrapped AKRO',
    mintAddress: '6WNVCuxCGJzNjmMZoKyhZJwvJ5tYpsLyAtagzYASqBoF',
    decimals: 6,
  },
  HXRO: {
    symbol: 'HXRO',
    name: 'Wrapped HXRO',
    mintAddress: 'DJafV9qemGp7mLMEn5wrfqaFwxsbLgUsGVS16zKRk9kc',
    decimals: 6,
  },
  UNI: {
    symbol: 'UNI',
    name: 'Wrapped UNI',
    mintAddress: 'DEhAasscXF4kEGxFgJ3bq4PpVGp5wyUxMRvn6TzGVHaw',
    decimals: 6,
  },
  SRM: {
    symbol: 'SRM',
    name: 'Serum',
    mintAddress: 'SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt',
    decimals: 6,
  },
  FTT: {
    symbol: 'FTT',
    name: 'Wrapped FTT',
    mintAddress: 'AGFEad2et2ZJif9jaGpdMixQqvW5i81aBdvKe7PHNfz3',
    decimals: 6,
  },
  MSRM: {
    symbol: 'MSRM',
    name: 'MegaSerum',
    mintAddress: 'MSRMcoVyrFxnSgo5uXwone5SKcGhT1KEJMFEkMEWf9L',
    decimals: 0,
  },
  TOMO: {
    symbol: 'TOMO',
    name: 'Wrapped TOMO',
    mintAddress: 'GXMvfY2jpQctDqZ9RoU3oWPhufKiCcFEfchvYumtX7jd',
    decimals: 6,
  },
  KARMA: {
    symbol: 'KARMA',
    name: 'Wrapped KARMA',
    mintAddress: 'EcqExpGNFBve2i1cMJUTR4bPXj4ZoqmDD2rTkeCcaTFX',
    decimals: 4,
  },
  LUA: {
    symbol: 'LUA',
    name: 'Wrapped LUA',
    mintAddress: 'EqWCKXfs3x47uVosDpTRgFniThL9Y8iCztJaapxbEaVX',
    decimals: 6,
  },
  MATH: {
    symbol: 'MATH',
    name: 'Wrapped MATH',
    mintAddress: 'GeDS162t9yGJuLEHPWXXGrb1zwkzinCgRwnT8vHYjKza',
    decimals: 6,
  },
  KEEP: {
    symbol: 'KEEP',
    name: 'Wrapped KEEP',
    mintAddress: 'GUohe4DJUA5FKPWo3joiPgsB7yzer7LpDmt1Vhzy3Zht',
    decimals: 6,
  },
  SWAG: {
    symbol: 'SWAG',
    name: 'Wrapped SWAG',
    mintAddress: '9F9fNTT6qwjsu4X4yWYKZpsbw5qT7o6yR2i57JF2jagy',
    decimals: 6,
  },
  FIDA: {
    symbol: 'FIDA',
    name: 'Bonfida',
    mintAddress: 'EchesyfXePKdLtoiZSL8pBe8Myagyy8ZRqsACNCFGnvp',
    decimals: 6,
  },
  KIN: {
    symbol: 'KIN',
    name: 'KIN',
    mintAddress: 'kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6',
    decimals: 5,
  },
  MAPS: {
    symbol: 'MAPS',
    name: 'MAPS',
    mintAddress: 'MAPS41MDahZ9QdKXhVa4dWB9RuyfV4XqhyAZ8XcYepb',
    decimals: 6,
  },
  OXY: {
    symbol: 'OXY',
    name: 'OXY',
    mintAddress: 'z3dn17yLaGMKffVogeFHQ9zWVcXgqgf3PQnDsNs2g6M',
    decimals: 6,
  },
  xCOPE: {
    symbol: 'xCOPE',
    name: 'xCOPE',
    mintAddress: '3K6rftdAaQYMPunrtNRHgnK2UAtjm2JwyT2oCiTDouYE',
    decimals: 0,
  },
  COPE: {
    symbol: 'COPE',
    name: 'COPE',
    mintAddress: '8HGyAAB1yoM1ttS7pXjHMa3dukTFGQggnFFH3hJZgzQh',
    decimals: 6,
  },
  STEP: {
    symbol: 'STEP',
    name: 'STEP',
    mintAddress: 'StepAscQoEioFxxWGnh2sLBDFp9d8rvKz2Yp39iDpyT',
    decimals: 9,
  },
  MEDIA: {
    symbol: 'MEDIA',
    name: 'MEDIA',
    mintAddress: 'ETAtLmCmsoiEEKfNrHKJ2kYy3MoABhU6NQvpSfij5tDs',
    decimals: 6,
  },
  ROPE: {
    symbol: 'ROPE',
    name: 'ROPE',
    mintAddress: '8PMHT4swUMtBzgHnh5U564N5sjPSiUz2cjEQzFnnP1Fo',
    decimals: 9,
  },
  MER: {
    symbol: 'MER',
    name: 'Mercurial',
    mintAddress: 'MERt85fc5boKw3BW1eYdxonEuJNvXbiMbs6hvheau5K',
    decimals: 6,
  },
  TULIP: {
    symbol: 'TULIP',
    name: 'TULIP',
    mintAddress: 'TuLipcqtGVXP9XR62wM8WWCm6a9vhLs7T1uoWBk6FDs',
    decimals: 6,
  },
  SNY: {
    symbol: 'SNY',
    name: 'SNY',
    mintAddress: '4dmKkXNHdgYsXqBHCuMikNQWwVomZURhYvkkX5c4pQ7y',
    decimals: 6,
  },
  SLRS: {
    symbol: 'SLRS',
    name: 'SLRS',
    mintAddress: 'SLRSSpSLUTP7okbCUBYStWCo1vUgyt775faPqz8HUMr',
    decimals: 6,
  },
  WOO: {
    symbol: 'WOO',
    name: 'Wootrade Network',
    mintAddress: 'E5rk3nmgLUuKUiS94gg4bpWwWwyjCMtddsAXkTFLtHEy',
    decimals: 6,
  },
  BOP: {
    symbol: 'BOP',
    name: 'Boring Protocol',
    mintAddress: 'BLwTnYKqf7u4qjgZrrsKeNs2EzWkMLqVCu6j8iHyrNA3',
    decimals: 8,
  },
  SAMO: {
    symbol: 'SAMO',
    name: 'Samoyed Coin',
    mintAddress: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    decimals: 9,
  },
  renBTC: {
    symbol: 'renBTC',
    name: 'renBTC',
    mintAddress: 'CDJWUqTcYTVAKXAVXoQZFes5JUFc7owSeq7eMQcDSbo5',
    decimals: 8,
  },
  renDOGE: {
    symbol: 'renDOGE',
    name: 'renDOGE',
    mintAddress: 'ArUkYE2XDKzqy77PRRGjo4wREWwqk6RXTfM9NeqzPvjU',
    decimals: 8,
  },
  LIKE: {
    symbol: 'LIKE',
    name: 'LIKE',
    mintAddress: '3bRTivrVsitbmCTGtqwp7hxXPsybkjn4XLNtPsHqa3zR',
    decimals: 9,
  },
  DXL: {
    symbol: 'DXL',
    name: 'DXL',
    mintAddress: 'GsNzxJfFn6zQdJGeYsupJWzUAm57Ba7335mfhWvFiE9Z',
    decimals: 6,
  },
  mSOL: {
    symbol: 'mSOL',
    name: 'Marinade staked SOL (mSOL)',
    mintAddress: 'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So',
    decimals: 9,
  },
  PAI: {
    symbol: 'PAI',
    name: 'PAI (Parrot)',
    mintAddress: 'Ea5SjE2Y6yvCeW5dYTn7PYMuW5ikXkvbGdcmSnXeaLjS',
    decimals: 6,
  },
  PORT: {
    symbol: 'PORT',
    name: 'PORT',
    mintAddress: 'PoRTjZMPXb9T7dyU7tpLEZRQj7e6ssfAE62j2oQuc6y',
    decimals: 6,
  },
  MNGO: {
    symbol: 'MNGO',
    name: 'Mango',
    mintAddress: 'MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac',
    decimals: 6,
  },
  CRP: {
    symbol: 'CRP',
    name: 'CRP',
    mintAddress: 'DubwWZNWiNGMMeeQHPnMATNj77YZPZSAz2WVR5WjLJqz',
    decimals: 9,
  },
  ATLAS: {
    symbol: 'ATLAS',
    name: 'ATLAS',
    mintAddress: 'ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx',
    decimals: 8,
  },
  POLIS: {
    symbol: 'POLIS',
    name: 'POLIS',
    mintAddress: 'poLisWXnNRwC6oBu1vHiuKQzFjGL4XDSu4g9qjz9qVk',
    decimals: 8,
  },
  GRAPE: {
    symbol: 'GRAPE',
    name: 'GRAPE',
    mintAddress: '8upjSpvjcdpuzhfR1zriwg5NXkwDruejqNE9WNbPRtyA',
    decimals: 6,
  },
  CHEEMS: {
    symbol: 'CHEEMS',
    name: 'CHEEMS',
    mintAddress: '3FoUAsGDbvTD6YZ4wVKJgTB76onJUKz7GPEBNiR5b8wc',
    decimals: 4,
  }
};

export const LP_TOKENS = {
  'RAY-WUSDT': {
    symbol: 'RAY-WUSDT',
    name: 'RAY-WUSDT V2 LP',
    coin: { ...TOKENS.RAY },
    pc: { ...TOKENS.WUSDT },

    mintAddress: 'CzPDyvotTcxNqtPne32yUiEVQ6jk42HZi1Y3hUu7qf7f',
    decimals: TOKENS.RAY.decimals,
    urlHelper: 'Raydium',
  },
  'RAY-SOL': {
    symbol: 'RAY-SOL',
    name: 'RAY-SOL LP',
    coin: { ...TOKENS.RAY },
    pc: { ...TOKENS.SOL },

    mintAddress: '134Cct3CSdRCbYgq5SkwmHgfwjJ7EM5cG9PzqffWqECx',
    decimals: TOKENS.RAY.decimals,
    urlHelper: 'Raydium',
  },
  'LINK-WUSDT': {
    symbol: 'LINK-WUSDT',
    name: 'LINK-WUSDT LP',
    coin: { ...TOKENS.LINK },
    pc: { ...TOKENS.WUSDT },

    mintAddress: 'EVDmwajM5U73PD34bYPugwiA4Eqqbrej4mLXXv15Z5qR',
    decimals: TOKENS.LINK.decimals,
    urlHelper: 'Raydium',
  },
  'ETH-WUSDT': {
    symbol: 'ETH-WUSDT',
    name: 'ETH-WUSDT LP',
    coin: { ...TOKENS.ETH },
    pc: { ...TOKENS.WUSDT },

    mintAddress: 'KY4XvwHy7JPzbWYAbk23jQvEb4qWJ8aCqYWREmk1Q7K',
    decimals: TOKENS.ETH.decimals,
    urlHelper: 'Raydium',
  },
  'RAY-USDC': {
    symbol: 'RAY-USDC',
    name: 'RAY-USDC V2 LP',
    coin: { ...TOKENS.RAY },
    pc: { ...TOKENS.USDC },

    mintAddress: 'FgmBnsF5Qrnv8X9bomQfEtQTQjNNiBCWRKGpzPnE5BDg',
    decimals: TOKENS.RAY.decimals,
    urlHelper: 'Raydium',
  },
  'RAY-SRM': {
    symbol: 'RAY-SRM',
    name: 'RAY-SRM V2 LP',
    coin: { ...TOKENS.RAY },
    pc: { ...TOKENS.SRM },

    mintAddress: '5QXBMXuCL7zfAk39jEVVEvcrz1AvBGgT9wAhLLHLyyUJ',
    decimals: TOKENS.RAY.decimals,
    urlHelper: 'Raydium',
  },
  // v3
  'RAY-WUSDT-V3': {
    symbol: 'RAY-WUSDT',
    name: 'RAY-WUSDT V3 LP',
    coin: { ...TOKENS.RAY },
    pc: { ...TOKENS.WUSDT },

    mintAddress: 'FdhKXYjCou2jQfgKWcNY7jb8F2DPLU1teTTTRfLBD2v1',
    decimals: TOKENS.RAY.decimals,
    urlHelper: 'Raydium',
  },
  'RAY-USDC-V3': {
    symbol: 'RAY-USDC',
    name: 'RAY-USDC V3 LP',
    coin: { ...TOKENS.RAY },
    pc: { ...TOKENS.USDC },

    mintAddress: 'BZFGfXMrjG2sS7QT2eiCDEevPFnkYYF7kzJpWfYxPbcx',
    decimals: TOKENS.RAY.decimals,
    urlHelper: 'Raydium',
  },
  'RAY-SRM-V3': {
    symbol: 'RAY-SRM',
    name: 'RAY-SRM V3 LP',
    coin: { ...TOKENS.RAY },
    pc: { ...TOKENS.SRM },

    mintAddress: 'DSX5E21RE9FB9hM8Nh8xcXQfPK6SzRaJiywemHBSsfup',
    decimals: TOKENS.RAY.decimals,
    urlHelper: 'Raydium',
  },
  'RAY-SOL-V3': {
    symbol: 'RAY-SOL',
    name: 'RAY-SOL V3 LP',
    coin: { ...TOKENS.RAY },
    pc: { ...TOKENS.SOL },

    mintAddress: 'F5PPQHGcznZ2FxD9JaxJMXaf7XkaFFJ6zzTBcW8osQjw',
    decimals: TOKENS.RAY.decimals,
    urlHelper: 'Raydium',
  },
  'RAY-ETH-V3': {
    symbol: 'RAY-ETH',
    name: 'RAY-ETH V3 LP',
    coin: { ...TOKENS.RAY },
    pc: { ...TOKENS.ETH },

    mintAddress: '8Q6MKy5Yxb9vG1mWzppMtMb2nrhNuCRNUkJTeiE3fuwD',
    decimals: TOKENS.RAY.decimals,
    urlHelper: 'Raydium',
  },
  // v4
  'FIDA-RAY-V4': {
    symbol: 'FIDA-RAY',
    name: 'FIDA-RAY LP',
    coin: { ...TOKENS.FIDA },
    pc: { ...TOKENS.RAY },

    mintAddress: 'DsBuznXRTmzvEdb36Dx3aVLVo1XmH7r1PRZUFugLPTFv',
    decimals: TOKENS.FIDA.decimals,
    urlHelper: 'Raydium',
  },
  'OXY-RAY-V4': {
    symbol: 'OXY-RAY',
    name: 'OXY-RAY LP',
    coin: { ...TOKENS.OXY },
    pc: { ...TOKENS.RAY },

    mintAddress: 'FwaX9W7iThTZH5MFeasxdLpxTVxRcM7ZHieTCnYog8Yb',
    decimals: TOKENS.OXY.decimals,
    urlHelper: 'Raydium',
  },
  'MAPS-RAY-V4': {
    symbol: 'MAPS-RAY',
    name: 'MAPS-RAY LP',
    coin: { ...TOKENS.MAPS },
    pc: { ...TOKENS.RAY },

    mintAddress: 'CcKK8srfVdTSsFGV3VLBb2YDbzF4T4NM2C3UEjC39RLP',
    decimals: TOKENS.MAPS.decimals,
    urlHelper: 'Raydium',
  },
  'KIN-RAY-V4': {
    symbol: 'KIN-RAY',
    name: 'KIN-RAY LP',
    coin: { ...TOKENS.KIN },
    pc: { ...TOKENS.RAY },

    mintAddress: 'CHT8sft3h3gpLYbCcZ9o27mT5s3Z6VifBVbUiDvprHPW',
    decimals: 6
  },
  'RAY-USDT-V4': {
    symbol: 'RAY-USDT',
    name: 'RAY-USDT LP',
    coin: { ...TOKENS.RAY },
    pc: { ...TOKENS.USDT },

    mintAddress: 'C3sT1R3nsw4AVdepvLTLKr5Gvszr7jufyBWUCvy4TUvT',
    decimals: TOKENS.RAY.decimals,
    urlHelper: 'Raydium',
  },
  'SOL-USDC-V4': {
    symbol: 'SOL-USDC',
    name: 'SOL-USDC LP',
    coin: { ...TOKENS.SOL },
    pc: { ...TOKENS.USDC },

    mintAddress: '8HoQnePLqPj4M7PUDzfw8e3Ymdwgc7NLGnaTUapubyvu',
    decimals: TOKENS.SOL.decimals,
    urlHelper: 'Raydium',
  },
  'YFI-USDC-V4': {
    symbol: 'YFI-USDC',
    name: 'YFI-USDC LP',
    coin: { ...TOKENS.YFI },
    pc: { ...TOKENS.USDC },

    mintAddress: '865j7iMmRRycSYUXzJ33ZcvLiX9JHvaLidasCyUyKaRE',
    decimals: TOKENS.YFI.decimals,
    urlHelper: 'Raydium',
  },
  'SRM-USDC-V4': {
    symbol: 'SRM-USDC',
    name: 'SRM-USDC LP',
    coin: { ...TOKENS.SRM },
    pc: { ...TOKENS.USDC },

    mintAddress: '9XnZd82j34KxNLgQfz29jGbYdxsYznTWRpvZE3SRE7JG',
    decimals: TOKENS.SRM.decimals,
    urlHelper: 'Raydium',
  },
  'FTT-USDC-V4': {
    symbol: 'FTT-USDC',
    name: 'FTT-USDC LP',
    coin: { ...TOKENS.FTT },
    pc: { ...TOKENS.USDC },

    mintAddress: '75dCoKfUHLUuZ4qEh46ovsxfgWhB4icc3SintzWRedT9',
    decimals: TOKENS.FTT.decimals,
    urlHelper: 'Raydium',
  },
  'BTC-USDC-V4': {
    symbol: 'BTC-USDC',
    name: 'BTC-USDC LP',
    coin: { ...TOKENS.BTC },
    pc: { ...TOKENS.USDC },

    mintAddress: '2hMdRdVWZqetQsaHG8kQjdZinEMBz75vsoWTCob1ijXu',
    decimals: TOKENS.BTC.decimals,
    urlHelper: 'Raydium',
  },
  'SUSHI-USDC-V4': {
    symbol: 'SUSHI-USDC',
    name: 'SUSHI-USDC LP',
    coin: { ...TOKENS.SUSHI },
    pc: { ...TOKENS.USDC },

    mintAddress: '2QVjeR9d2PbSf8em8NE8zWd8RYHjFtucDUdDgdbDD2h2',
    decimals: TOKENS.SUSHI.decimals,
    urlHelper: 'Raydium',
  },
  'TOMO-USDC-V4': {
    symbol: 'TOMO-USDC',
    name: 'TOMO-USDC LP',
    coin: { ...TOKENS.TOMO },
    pc: { ...TOKENS.USDC },

    mintAddress: 'CHyUpQFeW456zcr5XEh4RZiibH8Dzocs6Wbgz9aWpXnQ',
    decimals: TOKENS.TOMO.decimals,
    urlHelper: 'Raydium',
  },
  'LINK-USDC-V4': {
    symbol: 'LINK-USDC',
    name: 'LINK-USDC LP',
    coin: { ...TOKENS.LINK },
    pc: { ...TOKENS.USDC },

    mintAddress: 'BqjoYjqKrXtfBKXeaWeAT5sYCy7wsAYf3XjgDWsHSBRs',
    decimals: TOKENS.LINK.decimals,
    urlHelper: 'Raydium',
  },
  'ETH-USDC-V4': {
    symbol: 'ETH-USDC',
    name: 'ETH-USDC LP',
    coin: { ...TOKENS.ETH },
    pc: { ...TOKENS.USDC },

    mintAddress: '13PoKid6cZop4sj2GfoBeujnGfthUbTERdE5tpLCDLEY',
    decimals: TOKENS.ETH.decimals,
    urlHelper: 'Raydium',
  },
  'xCOPE-USDC-V4': {
    symbol: 'xCOPE-USDC',
    name: 'xCOPE-USDC LP',
    coin: { ...TOKENS.xCOPE },
    pc: { ...TOKENS.USDC },

    mintAddress: '2Vyyeuyd15Gp8aH6uKE72c4hxc8TVSLibxDP9vzspQWG',
    decimals: TOKENS.xCOPE.decimals,
    urlHelper: 'Raydium',
  },
  'SOL-USDT-V4': {
    symbol: 'SOL-USDT',
    name: 'SOL-USDT LP',
    coin: { ...TOKENS.SOL },
    pc: { ...TOKENS.USDT },

    mintAddress: 'Epm4KfTj4DMrvqn6Bwg2Tr2N8vhQuNbuK8bESFp4k33K',
    decimals: TOKENS.SOL.decimals,
    urlHelper: 'Raydium',
  },
  'YFI-USDT-V4': {
    symbol: 'YFI-USDT',
    name: 'YFI-USDT LP',
    coin: { ...TOKENS.YFI },
    pc: { ...TOKENS.USDT },

    mintAddress: 'FA1i7fej1pAbQbnY8NbyYUsTrWcasTyipKreDgy1Mgku',
    decimals: TOKENS.YFI.decimals,
    urlHelper: 'Raydium',
  },
  'SRM-USDT-V4': {
    symbol: 'SRM-USDT',
    name: 'SRM-USDT LP',
    coin: { ...TOKENS.SRM },
    pc: { ...TOKENS.USDT },

    mintAddress: 'HYSAu42BFejBS77jZAZdNAWa3iVcbSRJSzp3wtqCbWwv',
    decimals: TOKENS.SRM.decimals,
    urlHelper: 'Raydium',
  },
  'FTT-USDT-V4': {
    symbol: 'FTT-USDT',
    name: 'FTT-USDT LP',
    coin: { ...TOKENS.FTT },
    pc: { ...TOKENS.USDT },

    mintAddress: '2cTCiUnect5Lap2sk19xLby7aajNDYseFhC9Pigou11z',
    decimals: TOKENS.FTT.decimals,
    urlHelper: 'Raydium',
  },
  'BTC-USDT-V4': {
    symbol: 'BTC-USDT',
    name: 'BTC-USDT LP',
    coin: { ...TOKENS.BTC },
    pc: { ...TOKENS.USDT },

    mintAddress: 'DgGuvR9GSHimopo3Gc7gfkbKamLKrdyzWkq5yqA6LqYS',
    decimals: TOKENS.BTC.decimals,
    urlHelper: 'Raydium',
  },
  'SUSHI-USDT-V4': {
    symbol: 'SUSHI-USDT',
    name: 'SUSHI-USDT LP',
    coin: { ...TOKENS.SUSHI },
    pc: { ...TOKENS.USDT },

    mintAddress: 'Ba26poEYDy6P2o95AJUsewXgZ8DM9BCsmnU9hmC9i4Ki',
    decimals: TOKENS.SUSHI.decimals,
    urlHelper: 'Raydium',
  },
  'TOMO-USDT-V4': {
    symbol: 'TOMO-USDT',
    name: 'TOMO-USDT LP',
    coin: { ...TOKENS.TOMO },
    pc: { ...TOKENS.USDT },

    mintAddress: 'D3iGro1vn6PWJXo9QAPj3dfta6dKkHHnmiiym2EfsAmi',
    decimals: TOKENS.TOMO.decimals,
    urlHelper: 'Raydium',
  },
  'LINK-USDT-V4': {
    symbol: 'LINK-USDT',
    name: 'LINK-USDT LP',
    coin: { ...TOKENS.LINK },
    pc: { ...TOKENS.USDT },

    mintAddress: 'Dr12Sgt9gkY8WU5tRkgZf1TkVWJbvjYuPAhR3aDCwiiX',
    decimals: TOKENS.LINK.decimals,
    urlHelper: 'Raydium',
  },
  'ETH-USDT-V4': {
    symbol: 'ETH-USDT',
    name: 'ETH-USDT LP',
    coin: { ...TOKENS.ETH },
    pc: { ...TOKENS.USDT },

    mintAddress: 'nPrB78ETY8661fUgohpuVusNCZnedYCgghzRJzxWnVb',
    decimals: TOKENS.ETH.decimals,
    urlHelper: 'Raydium',
  },
  'YFI-SRM-V4': {
    symbol: 'YFI-SRM',
    name: 'YFI-SRM LP',
    coin: { ...TOKENS.YFI },
    pc: { ...TOKENS.SRM },

    mintAddress: 'EGJht91R7dKpCj8wzALkjmNdUUUcQgodqWCYweyKcRcV',
    decimals: TOKENS.YFI.decimals,
    urlHelper: 'Raydium',
  },
  'FTT-SRM-V4': {
    symbol: 'FTT-SRM',
    name: 'FTT-SRM LP',
    coin: { ...TOKENS.FTT },
    pc: { ...TOKENS.SRM },

    mintAddress: 'AsDuPg9MgPtt3jfoyctUCUgsvwqAN6RZPftqoeiPDefM',
    decimals: TOKENS.FTT.decimals,
    urlHelper: 'Raydium',
  },
  'BTC-SRM-V4': {
    symbol: 'BTC-SRM',
    name: 'BTC-SRM LP',
    coin: { ...TOKENS.BTC },
    pc: { ...TOKENS.SRM },

    mintAddress: 'AGHQxXb3GSzeiLTcLtXMS2D5GGDZxsB2fZYZxSB5weqB',
    decimals: TOKENS.BTC.decimals,
    urlHelper: 'Raydium',
  },
  'SUSHI-SRM-V4': {
    symbol: 'SUSHI-SRM',
    name: 'SUSHI-SRM LP',
    coin: { ...TOKENS.SUSHI },
    pc: { ...TOKENS.SRM },

    mintAddress: '3HYhUnUdV67j1vn8fu7ExuVGy5dJozHEyWvqEstDbWwE',
    decimals: TOKENS.SUSHI.decimals,
    urlHelper: 'Raydium',
  },
  'TOMO-SRM-V4': {
    symbol: 'TOMO-SRM',
    name: 'TOMO-SRM LP',
    coin: { ...TOKENS.TOMO },
    pc: { ...TOKENS.SRM },

    mintAddress: 'GgH9RnKrQpaMQeqmdbMvs5oo1A24hERQ9wuY2pSkeG7x',
    decimals: TOKENS.TOMO.decimals,
    urlHelper: 'Raydium',
  },
  'LINK-SRM-V4': {
    symbol: 'LINK-SRM',
    name: 'LINK-SRM LP',
    coin: { ...TOKENS.LINK },
    pc: { ...TOKENS.SRM },

    mintAddress: 'GXN6yJv12o18skTmJXaeFXZVY1iqR18CHsmCT8VVCmDD',
    decimals: TOKENS.LINK.decimals,
    urlHelper: 'Raydium',
  },
  'ETH-SRM-V4': {
    symbol: 'ETH-SRM',
    name: 'ETH-SRM LP',
    coin: { ...TOKENS.ETH },
    pc: { ...TOKENS.SRM },

    mintAddress: '9VoY3VERETuc2FoadMSYYizF26mJinY514ZpEzkHMtwG',
    decimals: TOKENS.ETH.decimals,
    urlHelper: 'Raydium',
  },
  'SRM-SOL-V4': {
    symbol: 'SRM-SOL',
    name: 'SRM-SOL LP',
    coin: { ...TOKENS.SRM },
    pc: { ...TOKENS.SOL },

    mintAddress: 'AKJHspCwDhABucCxNLXUSfEzb7Ny62RqFtC9uNjJi4fq',
    decimals: TOKENS.SRM.decimals,
    urlHelper: 'Raydium',
  },
  'STEP-USDC-V4': {
    symbol: 'STEP-USDC',
    name: 'STEP-USDC LP',
    coin: { ...TOKENS.STEP },
    pc: { ...TOKENS.USDC },

    mintAddress: '3k8BDobgihmk72jVmXYLE168bxxQUhqqyESW4dQVktqC',
    decimals: TOKENS.STEP.decimals,
    urlHelper: 'Raydium',
  },
  'MEDIA-USDC-V4': {
    symbol: 'MEDIA-USDC',
    name: 'MEDIA-USDC LP',
    coin: { ...TOKENS.MEDIA },
    pc: { ...TOKENS.USDC },

    mintAddress: 'A5zanvgtioZGiJMdEyaKN4XQmJsp1p7uVxaq2696REvQ',
    decimals: TOKENS.MEDIA.decimals,
    urlHelper: 'Raydium',
  },
  'ROPE-USDC-V4': {
    symbol: 'ROPE-USDC',
    name: 'ROPE-USDC LP',
    coin: { ...TOKENS.ROPE },
    pc: { ...TOKENS.USDC },

    mintAddress: 'Cq4HyW5xia37tKejPF2XfZeXQoPYW6KfbPvxvw5eRoUE',
    decimals: TOKENS.ROPE.decimals,
    urlHelper: 'Raydium',
  },
  'MER-USDC-V4': {
    symbol: 'MER-USDC',
    name: 'MER-USDC LP',
    coin: { ...TOKENS.MER },
    pc: { ...TOKENS.USDC },

    mintAddress: '3H9NxvaZoxMZZDZcbBDdWMKbrfNj7PCF5sbRwDr7SdDW',
    decimals: TOKENS.MER.decimals,
    urlHelper: 'Raydium',
  },
  'COPE-USDC-V4': {
    symbol: 'COPE-USDC',
    name: 'COPE-USDC LP',
    coin: { ...TOKENS.COPE },
    pc: { ...TOKENS.USDC },

    mintAddress: 'Cz1kUvHw98imKkrqqu95GQB9h1frY8RikxPojMwWKGXf',
    decimals: TOKENS.COPE.decimals,
    urlHelper: 'Raydium',
  },
  'ALEPH-USDC-V4': {
    symbol: 'ALEPH-USDC',
    name: 'ALEPH-USDC LP',
    coin: { ...TOKENS.ALEPH },
    pc: { ...TOKENS.USDC },

    mintAddress: 'iUDasAP2nXm5wvTukAHEKSdSXn8vQkRtaiShs9ceGB7',
    decimals: TOKENS.ALEPH.decimals,
    urlHelper: 'Raydium',
  },
  'TULIP-USDC-V4': {
    symbol: 'TULIP-USDC',
    name: 'TULIP-USDC LP',
    coin: { ...TOKENS.TULIP },
    pc: { ...TOKENS.USDC },

    mintAddress: '2doeZGLJyACtaG9DCUyqMLtswesfje1hjNA11hMdj6YU',
    decimals: TOKENS.TULIP.decimals,
    urlHelper: 'Raydium',
  },
  'WOO-USDC-V4': {
    symbol: 'WOO-USDC',
    name: 'WOO-USDC LP',
    coin: { ...TOKENS.WOO },
    pc: { ...TOKENS.USDC },

    mintAddress: '7cu42ao8Jgrd5A3y3bNQsCxq5poyGZNmTydkGfJYQfzh',
    decimals: TOKENS.WOO.decimals,
    urlHelper: 'Raydium',
  },
  'SNY-USDC-V4': {
    symbol: 'SNY-USDC',
    name: 'SNY-USDC LP',
    coin: { ...TOKENS.SNY },
    pc: { ...TOKENS.USDC },

    mintAddress: 'G8qcfeFqxwbCqpxv5LpLWxUCd1PyMB5nWb5e5YyxLMKg',
    decimals: TOKENS.SNY.decimals,
    urlHelper: 'Raydium',
  },
  'BOP-RAY-V4': {
    symbol: 'BOP-RAY',
    name: 'BOP-RAY LP',
    coin: { ...TOKENS.BOP },
    pc: { ...TOKENS.RAY },

    mintAddress: '9nQPYJvysyfnXhQ6nkK5V7sZG26hmDgusfdNQijRk5LD',
    decimals: TOKENS.BOP.decimals,
    urlHelper: 'Raydium',
  },
  'SLRS-USDC-V4': {
    symbol: 'SLRS-USDC',
    name: 'SLRS-USDC LP',
    coin: { ...TOKENS.SLRS },
    pc: { ...TOKENS.USDC },

    mintAddress: '2Xxbm1hdv5wPeen5ponDSMT3VqhGMTQ7mH9stNXm9shU',
    decimals: TOKENS.SLRS.decimals,
    urlHelper: 'Raydium',
  },
  'SAMO-RAY-V4': {
    symbol: 'SAMO-RAY',
    name: 'SAMO-RAY LP',
    coin: { ...TOKENS.SAMO },
    pc: { ...TOKENS.RAY },

    mintAddress: 'HwzkXyX8B45LsaHXwY8su92NoRBS5GQC32HzjQRDqPnr',
    decimals: TOKENS.SAMO.decimals,
    urlHelper: 'Raydium',
  },
  'renBTC-USDC-V4': {
    symbol: 'renBTC-USDC',
    name: 'renBTC-USDC LP',
    coin: { ...TOKENS.renBTC },
    pc: { ...TOKENS.USDC },

    mintAddress: 'CTEpsih91ZLo5gunvryLpJ3pzMjmt5jbS6AnSQrzYw7V',
    decimals: TOKENS.renBTC.decimals,
    urlHelper: 'Raydium',
  },
  'renDOGE-USDC-V4': {
    symbol: 'renDOGE-USDC',
    name: 'renDOGE-USDC LP',
    coin: { ...TOKENS.renDOGE },
    pc: { ...TOKENS.USDC },

    mintAddress: 'Hb8KnZNKvRxu7pgMRWJgoMSMcepfvNiBFFDDrdf9o3wA',
    decimals: TOKENS.renDOGE.decimals,
    urlHelper: 'Raydium',
  },
  'RAY-USDC-V4': {
    symbol: 'RAY-USDC',
    name: 'RAY-USDC LP',
    coin: { ...TOKENS.RAY },
    pc: { ...TOKENS.USDC },

    mintAddress: 'FbC6K13MzHvN42bXrtGaWsvZY9fxrackRSZcBGfjPc7m',
    decimals: TOKENS.RAY.decimals,
    urlHelper: 'Raydium',
  },
  'RAY-SRM-V4': {
    symbol: 'RAY-SRM',
    name: 'RAY-SRM LP',
    coin: { ...TOKENS.RAY },
    pc: { ...TOKENS.SRM },

    mintAddress: '7P5Thr9Egi2rvMmEuQkLn8x8e8Qro7u2U7yLD2tU2Hbe',
    decimals: TOKENS.RAY.decimals,
    urlHelper: 'Raydium',
  },
  'RAY-ETH-V4': {
    symbol: 'RAY-ETH',
    name: 'RAY-ETH LP',
    coin: { ...TOKENS.RAY },
    pc: { ...TOKENS.ETH },

    mintAddress: 'mjQH33MqZv5aKAbKHi8dG3g3qXeRQqq1GFcXceZkNSr',
    decimals: TOKENS.RAY.decimals,
    urlHelper: 'Raydium',
  },
  'RAY-SOL-V4': {
    symbol: 'RAY-SOL',
    name: 'RAY-SOL LP',
    coin: { ...TOKENS.RAY },
    pc: { ...TOKENS.SOL },

    mintAddress: '89ZKE4aoyfLBe2RuV6jM3JGNhaV18Nxh8eNtjRcndBip',
    decimals: TOKENS.RAY.decimals,
    urlHelper: 'Raydium',
  },
  'DXL-USDC-V4': {
    symbol: 'DXL-USDC',
    name: 'DXL-USDC LP',
    coin: { ...TOKENS.DXL },
    pc: { ...TOKENS.USDC },

    mintAddress: '4HFaSvfgskipvrzT1exoVKsUZ174JyExEsA8bDfsAdY5',
    decimals: TOKENS.DXL.decimals,
    urlHelper: 'Raydium',
  },
  'LIKE-USDC-V4': {
    symbol: 'LIKE-USDC',
    name: 'LIKE-USDC LP',
    coin: { ...TOKENS.LIKE },
    pc: { ...TOKENS.USDC },

    mintAddress: 'cjZmbt8sJgaoyWYUttomAu5LJYU44ZrcKTbzTSEPDVw',
    decimals: TOKENS.LIKE.decimals,
    urlHelper: 'Raydium',
  },
  'mSOL-USDC-V4': {
    symbol: 'mSOL-USDC',
    name: 'mSOL-USDC LP',
    coin: { ...TOKENS.mSOL },
    pc: { ...TOKENS.USDC },

    mintAddress: '4xTpJ4p76bAeggXoYywpCCNKfJspbuRzZ79R7pRhbqSf',
    decimals: TOKENS.mSOL.decimals,
    urlHelper: 'Raydium',
  },
  'mSOL-SOL-V4': {
    symbol: 'mSOL-SOL',
    name: 'mSOL-SOL LP',
    coin: { ...TOKENS.mSOL },
    pc: { ...TOKENS.SOL },

    mintAddress: '5ijRoAHVgd5T5CNtK5KDRUBZ7Bffb69nktMj5n6ks6m4',
    decimals: TOKENS.mSOL.decimals,
    urlHelper: 'Raydium',
  },
  'MER-PAI-V4': {
    symbol: 'MER-PAI',
    name: 'MER-PAI LP',
    coin: { ...TOKENS.MER },
    pc: { ...TOKENS.PAI },

    mintAddress: 'DU5RT2D9EviaSmX6Ta8MZwMm85HwSEqGMRdqUiuCGfmD',
    decimals: TOKENS.MER.decimals,
    urlHelper: 'Raydium',
  },
  'PORT-USDC-V4': {
    symbol: 'PORT-USDC',
    name: 'PORT-USDC LP',
    coin: { ...TOKENS.PORT },
    pc: { ...TOKENS.USDC },

    mintAddress: '9tmNtbUCrLS15qC4tEfr5NNeqcqpZ4uiGgi2vS5CLQBS',
    decimals: TOKENS.PORT.decimals,
    urlHelper: 'Raydium',
  },
  'MNGO-USDC-V4': {
    symbol: 'MNGO-USDC',
    name: 'MNGO-USDC LP',
    coin: { ...TOKENS.MNGO },
    pc: { ...TOKENS.USDC },

    mintAddress: 'DkiqCQ792n743xjWQVCbBUaVtkdiuvQeYndM53ReWnCC',
    decimals: TOKENS.MNGO.decimals,
    urlHelper: 'Raydium',
  },
  'ATLAS-USDC-V4': {
    symbol: 'ATLAS-USDC',
    name: 'ATLAS-USDC LP',
    coin: { ...TOKENS.ATLAS },
    pc: { ...TOKENS.USDC },

    mintAddress: '9shGU9f1EsxAbiR567MYZ78WUiS6ZNCYbHe53WUULQ7n',
    decimals: TOKENS.ATLAS.decimals,
    urlHelper: 'Raydium',
  },
  'POLIS-USDC-V4': {
    symbol: 'POLIS-USDC',
    name: 'POLIS-USDC LP',
    coin: { ...TOKENS.POLIS },
    pc: { ...TOKENS.USDC },

    mintAddress: '8MbKSBpyXs8fVneKgt71jfHrn5SWtX8n4wMLpiVfF9So',
    decimals: TOKENS.POLIS.decimals,
    urlHelper: 'Raydium',
  },
  'ATLAS-RAY-V4': {
    symbol: 'ATLAS-RAY',
    name: 'ATLAS-RAY LP',
    coin: { ...TOKENS.ATLAS },
    pc: { ...TOKENS.RAY },

    mintAddress: '418MFhkaYQtbn529wmjLLqL6uKxDz7j4eZBaV1cobkyd',
    decimals: TOKENS.ATLAS.decimals,
    urlHelper: 'Raydium',
  },
  'POLIS-RAY-V4': {
    symbol: 'POLIS-RAY',
    name: 'POLIS-RAY LP',
    coin: { ...TOKENS.POLIS },
    pc: { ...TOKENS.RAY },

    mintAddress: '9ysGKUH6WqzjQEUT4dxqYCUaFNVK9QFEa24pGzjFq8xg',
    decimals: TOKENS.POLIS.decimals,
    urlHelper: 'Raydium',
  },
  'ALEPH-RAY-V4': {
    symbol: 'ALEPH-RAY',
    name: 'ALEPH-RAY LP',
    coin: { ...TOKENS.ALEPH },
    pc: { ...TOKENS.RAY },

    mintAddress: 'n76skjqv4LirhdLok2zJELXNLdRpYDgVJQuQFbamscy',
    decimals: TOKENS.ALEPH.decimals,
    urlHelper: 'Raydium',
  },
  'TULIP-RAY-V4': {
    symbol: 'TULIP-RAY',
    name: 'TULIP-RAY LP',
    coin: { ...TOKENS.TULIP },
    pc: { ...TOKENS.RAY },

    mintAddress: '3AZTviji5qduMG2s4FfWGR3SSQmNUCyx8ao6UKCPg3oJ',
    decimals: TOKENS.TULIP.decimals,
    urlHelper: 'Raydium',
  },
  'SLRS-RAY-V4': {
    symbol: 'SLRS-RAY',
    name: 'SLRS-RAY LP',
    coin: { ...TOKENS.SLRS },
    pc: { ...TOKENS.RAY },

    mintAddress: '2pk78vsKT3jfJAcN2zbpMUnrR57SZrxHqaZYyFgp92mM',
    decimals: TOKENS.SLRS.decimals,
    urlHelper: 'Raydium',
  },
  'MER-RAY-V4': {
    symbol: 'MER-RAY',
    name: 'MER-RAY LP',
    coin: { ...TOKENS.MER },
    pc: { ...TOKENS.RAY },

    mintAddress: '214hxy3AbKoaEKgqcg2aC1cP5R67cGGAyDEg5GDwC7Ub',
    decimals: TOKENS.MER.decimals,
    urlHelper: 'Raydium',
  },
  'MEDIA-RAY-V4': {
    symbol: 'MEDIA-RAY',
    name: 'MEDIA-RAY LP',
    coin: { ...TOKENS.MEDIA },
    pc: { ...TOKENS.RAY },

    mintAddress: '9Aseg5A1JD1yCiFFdDaNNxCiJ7XzrpZFmcEmLjXFdPaH',
    decimals: TOKENS.MEDIA.decimals,
    urlHelper: 'Raydium',
  },
  'SNY-RAY-V4': {
    symbol: 'SNY-RAY',
    name: 'SNY-RAY LP',
    coin: { ...TOKENS.SNY },
    pc: { ...TOKENS.RAY },

    mintAddress: '2k4quTuuLUxrSEhFH99qcoZzvgvVEc3b5sz3xz3qstfS',
    decimals: TOKENS.SNY.decimals,
    urlHelper: 'Raydium',
  },
  'LIKE-RAY-V4': {
    symbol: 'LIKE-RAY',
    name: 'LIKE-RAY LP',
    coin: { ...TOKENS.LIKE },
    pc: { ...TOKENS.RAY },

    mintAddress: '7xqDycbFSCpUpzkYapFeyPJWPwEpV7zdWbYf2MVHTNjv',
    decimals: TOKENS.LIKE.decimals,
    urlHelper: 'Raydium',
  },
  'COPE-RAY-V4': {
    symbol: 'COPE-RAY',
    name: 'COPE-RAY LP',
    coin: { ...TOKENS.COPE },
    pc: { ...TOKENS.RAY },

    mintAddress: 'A7GCVHA8NSsbdFscHdoNU41tL1TRKNmCH4K94CgcLK9F',
    decimals: TOKENS.COPE.decimals,
    urlHelper: 'Raydium',
  }
};

export async function loadTokenInfo() {
  const res = await axios.get('https://api.raydium.io/cache/solana-token-list')
  return addTokensSolanaFunc((res.data.tokens))
}

function addTokensSolanaFunc(tokens: any[]) {
  let newTokens: { [key: string]: any } = cloneDeep(TOKENS);
  tokens.forEach((itemToken: any) => {
    if (itemToken.tags && itemToken.tags.includes('lp-token')) {
      return
    }
    const token = Object.values(newTokens).find((item) => item.mintAddress === itemToken.address);
    if (token) {
      token.icon = itemToken.logoURI
      newTokens[token.symbol] = token
    }
  });

  return newTokens;
}
