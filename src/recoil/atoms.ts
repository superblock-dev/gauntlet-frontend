import { ReactNode } from "react";
import { atom } from "recoil";
import { Connection } from '@solana/web3.js';
import { Farm, PairInfo, TokenName, User, Vault } from "types";
import { Token, TOKENS } from "utils/tokens";
import { LiquidityPoolInfo } from "utils/pools";
import { VAULTS } from "utils/vaults";

export const popupState = atom<ReactNode | ReactNode[] | undefined>({
  key: "popup",
  default: undefined,
});

export const conn = atom<Connection | undefined>({
  key: 'conn',
  default: undefined
});

const INITIAL_PRICES: { [key: string]: number } = {
  BTC: 0,
  ETH: 0,
  USDC: 1,
  USDT: 1,
  SOL: 0,
  LET: 0,
};

export const rewardPrices = atom<{ [key: string]: number }>({
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

export const activeFlagIndex = atom<number>({
  key: "activeFlagIndex",
  default: 0,
})

export const amountState = atom<number>({
  key: "amountState",
  default: 0,
});

export const amountState2 = atom<number>({
  key: "amountState2",
  default: 0,
});

export const tokenInfos = atom<{ [key: string]: Token }>({
  key: "tokens",
  default: TOKENS,
});

export const liquidityPoolInfos = atom<{ [key: string]: LiquidityPoolInfo }>({
  key: "liquidityPools",
  default: {},
});

export const farmInfos = atom<{ [key: string]: Farm }>({
  key: "farms",
  default: {},
});

interface UserInfo {
  lpTokens: {
    [key: string]: {
      balance: number;
      staked: number;
    }
  };
  states: User[];
}

export const userInfo = atom<UserInfo>({
  key: 'userInfo',
  default: {
    lpTokens: {
      'RAY-USDT': {
        balance: 230.134,
        staked: 0,
      },
      'RAY-USDC': {
        balance: 0,
        staked: 0,
      },
      'RAY-SRM': {
        balance: 0,
        staked: 0,
      },
      'RAY-SOL': {
        balance: 0,
        staked: 0,
      },
    },
    states: [
      // {
      //   vaultId: 1,
      //   rewardToken: TOKENS.BTC,
      //   reward: 30,
      //   amount: 200,
      //   rewardDebt: 0,
      // }
    ],
  }
})

export const vaultInfos = atom<Vault[]>({
  key: 'vaultInfo',
  default: VAULTS,
})

export interface Reward {
  symbol: TokenName;
  amount: number;
  deposit: number;
}

export const rewards = atom<Reward[]>({
  key: 'rewards',
  default: [

  ]
})