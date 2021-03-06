import { LPToken, Token, LP_TOKENS, TOKENS } from "./tokens";

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

export const REWARDS: (Token | LPToken)[] = [
  TOKENS.BTC,
  TOKENS.ETH,
  TOKENS.SOL,
  TOKENS.USDC,
  TOKENS.USDT,
];

export function getIndexFromSymbol(symbol: string) {
  return REWARDS.findIndex(r => r.symbol === symbol)
}
