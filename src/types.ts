import { ComponentType, ReactNode } from "react";

export type TokenName = "BTC" | "ETH" | "SOL" | "USDT" | "USDC" | "ETC";

// Temporary type
export interface VaultState {
  tokenName: TokenName;
  balance: number;
  depositAmount: number;
  withdrawAmount: number;
  rewards: number;
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
