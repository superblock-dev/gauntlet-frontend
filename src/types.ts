import { ReactNode } from "react";
import { LPToken, Token } from "utils/tokens";

export type TokenName =
  "BTC" |
  "ETH" |
  "SOL" |
  "USDT" |
  "USDC" |
  "LET" |
  "RAY" |
  "RAY-ETH" |
  "RAY-SOL" |
  "RAY-USDC" |
  "RAY-USDT" |
  "LET-USDC" |
  "ETC";

// Temporary types
export interface Fees {
  controlFee: number;
  performanceFee: number;
  treasuryFee: number;
  withdrawalFee: number;
}

export interface Vault {
  id: number;
  fees: Fees;
  depositToken: LPToken;
  totalDepositAmount: number;
  accPerShares: number[];
  farmApr?: number;
  farmFee?: number;
  vaultStateAccount?: string;
  vaultStrategyAccount?: string;
  vaultDepositTokenAccount?: string;
  farmRewardTokenAccount?: string;
  farmRewardTokenAccountB?: string;
  vaultRaydiumStateAccount?: string;
  withdrawFeeTokenAccount?: string;
}

export interface UserState {
  vaultId: number;
  rewardToken: Token | LPToken;
  // Pending reward
  reward: number;
  // Deposited amount of LP token
  amount: number;
  // Reward debt
  rewardDebt: number;
  // Calculated reward
  totalReward?: number;
  totalRewardInUSD?: number;
  totalApr?: number;
}

/** Pairs **/
export interface PairInfo {
  [key: string]: string | number;
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
  active?: boolean,
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
