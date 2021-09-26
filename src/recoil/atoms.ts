import { ReactNode } from "react";
import { atom } from "recoil";
import { Connection } from '@solana/web3.js';
import { PairInfo } from "types";
import { Token, TOKENS } from "utils/tokens";
import { LiquidityPoolInfo, LIQUIDITY_POOLS } from "utils/pools";

export const popupState = atom<ReactNode | ReactNode[] | undefined>({
  key: "popup",
  default: undefined,
});

export const conn = atom<Connection | undefined>({
  key: 'conn',
  default: undefined
});

const INITIAL_PRICES: {[key: string]: number} = {
  BTC: 0,
  ETH: 0,
  USDC: 1,
  USDT: 1,
  SOL: 0,
};

export const rewardPrices = atom<{[key: string]: number}>({
  key: "rewardPrices",
  default: INITIAL_PRICES,
});

export const pairsInfo = atom<PairInfo[]>({
  key: "pairsInfo",
  default: [],
});

export const isDeposit = atom<boolean>({
  key: "isDeposit",
  default: true,
});

export const amountState = atom<number>({
  key: "amountState",
  default: 0,
});

export const tokenInfos = atom<{[key: string]: Token}>({
  key: "tokens",
  default: TOKENS,
});

export const liquidityPoolInfos = atom<{[key: string]: LiquidityPoolInfo}>({
  key: "liquidityPools",
  default: {},
})
