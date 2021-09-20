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

interface TokenPrice {
  price: number,
}

const INITIAL_PRICES: {[key: string]: TokenPrice} = {
  BTC: {
    price: 0,
  },
  ETH: {
    price: 0,
  },
  USDC: {
    price: 1,
  },
  USDT: {
    price: 1,
  },
  SOL: {
    price: 0,
  },
};

export const rewardPrices = atom<{[key: string]: TokenPrice}>({
  key: "rewardPrices",
  default: INITIAL_PRICES,
});
