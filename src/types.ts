import { ComponentType, ReactNode } from "react";
import { LPToken } from "utils/tokens";

export type TokenName = "BTC" | "ETH" | "SOL" | "USDT" | "USDC" | "LET" | "ETC";

// Temporary types
export interface Fees {
  performanceFee: number;
  withdrawalFee: number;
}

export interface Strategy {
  rewardToken: TokenName;
  depositAmount: number;
  accRewardPerShare: number;
  lastRewardUpdatedTime: number;
}

export interface Vault {
  id: number;
  fees: Fees;
  depositToken: LPToken;
  totalDepositAmount: number;
  farmId: string;
  strategies: Strategy[];
}

export interface Reward {
  token: TokenName;
  amount: number;
  rewardDebt: number;
}

export interface UserState {
  vaultId: number;
  balance: number;
  rewards: Reward[];
}

export interface Route {
  label: string,
  path: string,
  // component: ComponentType,
}

export interface PrimaryBtnProp {
  disabled?: boolean,
  children: ReactNode | ReactNode[] | string | string[] | undefined
}

export interface NavBtnProp {
  active: boolean,
  title: string,
}

export interface WalletBtnProp {
  connected: boolean,
  address?: string, 
}

export interface DisconnectBtnProp {
  handleClick: any,
}

export interface ChildrenProp {
  children: ReactNode | ReactNode[] | string | string[] | undefined
}

export interface PageTemplateProp {
  children: ReactNode | ReactNode[] | string | string[] | undefined,
  title: string,
  subtitle?: string,
}

// Token types
// export interface TokenInfo {
//   symbol: string
//   name: string

//   mintAddress: string
//   decimals: number
//   totalSupply?: TokenAmount

//   referrer?: string

//   details?: string
//   docs?: object
//   socials?: object

//   tokenAccountAddress?: string
//   balance?: TokenAmount
// }
