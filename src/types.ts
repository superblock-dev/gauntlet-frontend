import BigNumber from "bignumber.js"
import { ReactNode } from "react"
import { LPToken, Token } from "utils/tokens"

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
  "ETC"

/** Gauntlet related types **/
export interface Fees {
  controlFee: number
  performanceFee: number
  treasuryFee: number
  withdrawalFee: number
}

export interface Vault {
  stateAccount: string
  fees: Fees
  depositToken: LPToken
  vaultStrategyAccount: string
  vaultDepositTokenAccount: string
  farmRewardTokenAccount: string
  farmRewardTokenAccountB?: string
  vaultRaydiumStateAccount: string
  withdrawFeeTokenAccount: string
  // load 해야 되는 애들
  totalDepositAmount?: number
  accPerShares?: number[]
  farmApr?: number
  farmFee?: number,
  state?: any,
}

export interface User {
  stateAccount: string
  vault?: Vault,
  vaultStateAccount: string,
  strategyStateAccount: string
  rewardToken: Token | LPToken
  // Deposited amount of LP token
  amount: BigNumber
  // Pending reward
  reward: BigNumber
  // Reward debt
  rewardDebt: BigNumber
  // Calculated reward
  totalReward?: number
  totalRewardInUSD?: number
  totalApr?: number
}

export interface Strategy {
  stateAccount: string
  strategyTokenAccount: string
  strategyTokenMintAccount: string
  performanceFeeTokenAccount: string
}

export interface StrategyApy {
  token: string
  apy: number
}

/** Farm **/
export interface Farm {
  name: string
  lp: LPToken
  reward: Token
  rewardB?: Token
  isStake: boolean

  fusion: boolean
  dual: boolean
  version: number
  programId: string

  poolId: string
  poolAuthority: string

  poolLpTokenAccount: string
  poolRewardTokenAccount: string
  poolRewardTokenAccountB?: string

  user?: object
  apr?: number
  aprTotal?: number
  fees?: number;
}

/** Pairs **/
export interface PairInfo {
  [key: string]: string | number
}

export interface Route {
  label: string
  path: string
}

export interface PrimaryBtnProp {
  disabled?: boolean
  children: ReactNode | ReactNode[] | string | string[] | undefined
}

export interface NavBtnProp {
  active?: boolean
  title: string
}

export interface WalletBtnProp {
  connected: boolean
  address?: string
}

export interface DisconnectBtnProp {
  handleClick: any
}

export interface ChildrenProp {
  children: ReactNode | ReactNode[] | string | string[] | undefined
}

export interface PageTemplateProp {
  children: ReactNode | ReactNode[] | string | string[] | undefined
  title: string
  subtitle?: string
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
