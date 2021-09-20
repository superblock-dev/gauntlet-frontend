import StoneBTC from 'assets/svgs/stones_small/BTC.svg';
import StoneETH from 'assets/svgs/stones_small/ETH.svg';
import StoneSOL from 'assets/svgs/stones_small/SOL.svg';
import StoneUSDC from 'assets/svgs/stones_small/USDC.svg';
import StoneUSDT from 'assets/svgs/stones_small/USDT.svg';
import StoneETC from 'assets/svgs/stones_small/ETC.svg';

export const SMALL_STONES: { [key: string]: string } = {
  BTC: StoneBTC,
  ETH: StoneETH,
  SOL: StoneSOL,
  USDC: StoneUSDC,
  USDT: StoneUSDT,
  ETC: StoneETC,
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
    icon: 'https://sdk.raydium.io/icons/AGFEad2et2ZJif9jaGpdMixQqvW5i81aBdvKe7PHNfz3.png',
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
    url: 'https://raydium.io',
    urlHelper: 'Raydium',
  },
  'RAY-ETH-V3': {
    symbol: 'RAY-ETH',
    name: 'RAY-ETH',
    coin: { ...TOKENS.RAY },
    pc: { ...TOKENS.ETH },

    mintAddress: '8Q6MKy5Yxb9vG1mWzppMtMb2nrhNuCRNUkJTeiE3fuwD',
    decimals: TOKENS.RAY.decimals,
    url: 'https://raydium.io',
    urlHelper: 'Raydium',
  },
};

export const FARMS: VaultInfo[] = [
  {
    id: 0,
    name: 'RAY-USDC',
    lp: { ...LP_TOKENS['RAY-USDC-V3'] },
    userStaked: {
      deposit: 49.48604,
      totalRewardInUSD: 49.48,
      rewards: [
        {
          token: TOKENS.ETH,
          amount: 0.41038,
        },
        {
          token: TOKENS.USDC,
          amount: 0.41038,
        },
        {
          token: TOKENS.USDT,
          amount: 0.41038,
        },
        {
          token: TOKENS.SOL,
          amount: 0.41038,
        },
      ]
    },

    // poolId: '8nEWqxeDNZ2yo1izbPzY4nwR55isBZRaQk7CM8ntwUwR',
    // poolAuthority: '6vQGZLsHgpJdqh1ER7q2q6mjZ43QwzhtTofTzb2sUhNh',
    // poolLpTokenAccount: '77ujS15hjUfFZkM8QAw4HMLvMGZg95Gcm6ixjA1bnk3M', // lp vault
    // poolRewardTokenAccount: '3ejmkn5HpXR9KdVWkai1Ngo87sQSUyKXrx8wSakipkno' // reward vault
  },
  {
    id: 1,
    name: 'RAY-USDC',
    lp: { ...LP_TOKENS['RAY-USDC-V3'] },
    userStaked: {
      deposit: 49.48604,
      totalRewardInUSD: 49.48,
      rewards: [
        {
          token: TOKENS.BTC,
          amount: 0.41038,
        },
        {
          token: TOKENS.USDC,
          amount: 0.41038,
        },
        {
          token: TOKENS.SOL,
          amount: 0.41038,
        },
      ]
    },

    // poolId: '8nEWqxeDNZ2yo1izbPzY4nwR55isBZRaQk7CM8ntwUwR',
    // poolAuthority: '6vQGZLsHgpJdqh1ER7q2q6mjZ43QwzhtTofTzb2sUhNh',
    // poolLpTokenAccount: '77ujS15hjUfFZkM8QAw4HMLvMGZg95Gcm6ixjA1bnk3M', // lp vault
    // poolRewardTokenAccount: '3ejmkn5HpXR9KdVWkai1Ngo87sQSUyKXrx8wSakipkno' // reward vault
  },
  {
    id: 2,
    name: 'RAY-ETH',
    lp: { ...LP_TOKENS['RAY-ETH-V3'] },
    userStaked: undefined,

    // poolId: 'CYKDTwojSLVFEShB3tcTTfMjtBxUNtYfCTM4PiMFGkio',
    // poolAuthority: 'Azmucec2jdgWagFkbnqmwYcsrtKPf1v1kcM95v6s1zxu',
    // poolLpTokenAccount: 'EncPBQhpc5KLmcgRD2PutQz7wBBNQkVN2s8jjFWEw9no', // lp vault
    // poolRewardTokenAccount: '8q8BHw7fP7mitLrb2jzw78qcSEgCvM7GTB5PzbSQobUt' // reward vault
  },

  {
    id: 3,
    name: 'RAY-ETH',
    lp: { ...LP_TOKENS['RAY-ETH-V3'] },
    userStaked: undefined,

    // poolId: 'CYKDTwojSLVFEShB3tcTTfMjtBxUNtYfCTM4PiMFGkio',
    // poolAuthority: 'Azmucec2jdgWagFkbnqmwYcsrtKPf1v1kcM95v6s1zxu',
    // poolLpTokenAccount: 'EncPBQhpc5KLmcgRD2PutQz7wBBNQkVN2s8jjFWEw9no', // lp vault
    // poolRewardTokenAccount: '8q8BHw7fP7mitLrb2jzw78qcSEgCvM7GTB5PzbSQobUt' // reward vault
  },
];

export interface Token {
  symbol: string,
  name: string,
  mintAddress: string,
  decimals: number,
  icon?: string,
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
}

export interface Reward {
  token: Token,
  amount: number,
}

export interface VaultInfo {
  name: string,
  lp: LPToken,
  userStaked?: {
    deposit: number,
    totalRewardInUSD: number,
    rewards: Reward[],
  },
  id: number,
}
