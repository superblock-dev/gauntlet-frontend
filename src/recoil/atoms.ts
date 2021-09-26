import { ReactNode } from "react";
import { atom } from "recoil";
import { Connection } from '@solana/web3.js';

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

export const isDeposit = atom<boolean>({
  key: "isDeposit",
  default: true,
});

export const amountState = atom<number>({
  key: "amountState",
  default: 0,
});
