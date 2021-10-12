import { Reward } from "types";
import { LP_TOKENS, TOKENS } from "./tokens";

export const TIMEOUT_DEFAULT = 60000;

export const HOME_FLAG_DATA = [
  {
    name: 'BTC',
    amount: 3.39,
    amountInUSD: 51240,
  },
  {
    name: 'ETH',
    amount: 3.39,
    amountInUSD: 51240,
  },
  {
    name: 'SOL',
    amount: 3.39,
    amountInUSD: 51240,
  },
  {
    name: 'USDC',
    amount: 3.39,
    amountInUSD: 51240,
  },
  {
    name: 'USDT',
    amount: 3.39,
    amountInUSD: 51240,
  },
  {
    name: 'RAY',
    amount: 3.39,
    amountInUSD: 51240,
  },
  {
    name: 'LET',
    amount: 3.39,
    amountInUSD: 51240,
  },
  {
    name: 'RAY-ETH',
    amount: 3.39,
    amountInUSD: 51240,
  },
  {
    name: 'RAY-SOL',
    amount: 3.39,
    amountInUSD: 51240,
  },
  {
    name: 'RAY-USDC',
    amount: 3.39,
    amountInUSD: 51240,
  },
  {
    name: 'RAY-USDT',
    amount: 3.39,
    amountInUSD: 51240,
  },
  {
    name: 'LET-USDC',
    amount: 3.39,
    amountInUSD: 51240,
  },
]

export const REWARDS: Reward[] = [
  {
    tokenName: 'BTC',
    token: TOKENS.BTC,
    amount: 0,
    rewardDebt: 0,
  },
  {
    tokenName: 'ETH',
    token: TOKENS.ETH,
    amount: 0,
    rewardDebt: 0,
  },
  {
    tokenName: 'SOL',
    token: TOKENS.SOL,
    amount: 0,
    rewardDebt: 0,
  },
  {
    tokenName: 'USDC',
    token: TOKENS.USDC,
    amount: 0,
    rewardDebt: 0,
  },
  {
    tokenName: 'USDT',
    token: TOKENS.USDT,
    amount: 0,
    rewardDebt: 0,
  },
  {
    tokenName: 'RAY',
    token: TOKENS.RAY,
    amount: 0,
    rewardDebt: 0,
  },
  {
    tokenName: 'LET',
    token: TOKENS.LET,
    amount: 0,
    rewardDebt: 0,
  },
  {
    tokenName: 'RAY-ETH',
    token: LP_TOKENS['RAY-ETH-V4'],
    amount: 0,
    rewardDebt: 0,
  },
  {
    tokenName: 'RAY-SOL',
    token: LP_TOKENS['RAY-SOL-V4'],
    amount: 0,
    rewardDebt: 0,
  },
  {
    tokenName: 'RAY-USDC',
    token: LP_TOKENS['RAY-USDC-V4'],
    amount: 0,
    rewardDebt: 0,
  },
  {
    tokenName: 'RAY-USDT',
    token: LP_TOKENS['RAY-USDT-V4'],
    amount: 0,
    rewardDebt: 0,
  },
  {
    tokenName: 'LET-USDC',
    token: LP_TOKENS['LET-USDC'],
    amount: 0,
    rewardDebt: 0,
  }
]