import BigNumber from "bignumber.js";
import { Fees, Reward, TokenName, UserState, Vault } from "types";
import { getBigNumber } from "./layouts";
import { TokenAmount } from "./safe-math";
import { LP_TOKENS, TOKENS } from "./tokens";

export const BASE_FEE: Fees = {
  controlFee: 0.005,
  performanceFee: 0.02,
  treasuryFee: 0.025,
  withdrawalFee: 0.001,
};

export function calculateReward(reward: Reward, vault: Vault) {
  const amount = new TokenAmount(getBigNumber(reward.amount), reward.token.decimals);
  const rewardDebt = new TokenAmount(getBigNumber(reward.rewardDebt), reward.token.decimals);
  const strategy = getStrategyByTokenName(vault, reward.tokenName);
  if (!strategy) return 0;
  const acc = new BigNumber(strategy.accRewardPerShare);
  const rewardAmount = amount.toEther().multipliedBy(acc).minus(rewardDebt.toEther());
  
  return Math.floor(rewardAmount.multipliedBy(Math.pow(10, reward.token.decimals)).toNumber()) / Math.pow(10, reward.token.decimals);
}

export function getVaultById(id: number) {
  return VAULTS.find(v => v.id === id);
}

export function getStrategyByTokenName(vault: Vault, tname: TokenName) {
  return vault.strategies.find(s => s.rewardToken === tname);
}

export const USER_STATES: UserState[] = [
  {
    vaultId: 1,
    balance: 500,
    rewards: [
      {
        tokenName: 'BTC',
        token: TOKENS.BTC,
        amount: 50,
        rewardDebt: 0.000272,
      },
      {
        tokenName: 'SOL',
        token: TOKENS.SOL,
        amount: 230,
        rewardDebt: 0.25,
      },
      {
        tokenName: 'USDC',
        token: TOKENS.USDC,
        amount: 50,
        rewardDebt: 560000,
      },
      {
        tokenName: 'LET',
        token: TOKENS.LET,
        amount: 50,
        rewardDebt: 560000,
      }
    ]
  },
  {
    vaultId: 3,
    balance: 400,
    rewards: [
      {
        tokenName: 'BTC',
        token: TOKENS.BTC,
        amount: 280,
        rewardDebt: 0.000272,
      },
      {
        tokenName: 'ETH',
        token: TOKENS.ETH,
        amount: 50,
        rewardDebt: 0.00048,
      },
      {
        tokenName: 'USDT',
        token: TOKENS.USDT,
        amount: 50,
        rewardDebt: 0,
      }
    ]
  },
];

export const VAULTS: Vault[] = [
  {
    id: 1,
    fees: BASE_FEE,
    depositToken: LP_TOKENS['RAY-USDT-V4'],
    totalDepositAmount: 540120439.512,
    strategies: [
      {
        rewardToken: "BTC",
        depositAmount: 100000000,
        accRewardPerShare: 0.01,
        lastRewardUpdatedTime: 1632359665,
      },
      {
        rewardToken: "ETH",
        depositAmount: 10000000,
        accRewardPerShare: 0.1,
        lastRewardUpdatedTime: 1632359665,
      },
      {
        rewardToken: "SOL",
        depositAmount: 200000000,
        accRewardPerShare: 680000,
        lastRewardUpdatedTime: 1632359665,
      },
      {
        rewardToken: "USDT",
        depositAmount: 50000000,
        accRewardPerShare: 1340000,
        lastRewardUpdatedTime: 1632359665,
      },
      {
        rewardToken: "USDC",
        depositAmount: 50000000,
        accRewardPerShare: 1560000,
        lastRewardUpdatedTime: 1632359665,
      },
      {
        rewardToken: "LET",
        depositAmount: 50000000,
        accRewardPerShare: 1560000,
        lastRewardUpdatedTime: 1632359665,
      },
    ]
  },
  {
    id: 2,
    fees: BASE_FEE,
    depositToken: LP_TOKENS['RAY-SRM-V4'],
    totalDepositAmount: 540120439.512,
    strategies: [
      {
        rewardToken: "BTC",
        depositAmount: 100000000,
        accRewardPerShare: 0.01,
        lastRewardUpdatedTime: 1632359665,
      },
      {
        rewardToken: "ETH",
        depositAmount: 10000000,
        accRewardPerShare: 0.1,
        lastRewardUpdatedTime: 1632359665,
      },
      {
        rewardToken: "SOL",
        depositAmount: 200000000,
        accRewardPerShare: 680000,
        lastRewardUpdatedTime: 1632359665,
      },
      {
        rewardToken: "USDT",
        depositAmount: 50000000,
        accRewardPerShare: 1340000,
        lastRewardUpdatedTime: 1632359665,
      },
      {
        rewardToken: "USDC",
        depositAmount: 50000000,
        accRewardPerShare: 1560000,
        lastRewardUpdatedTime: 1632359665,
      },
    ]
  },
  {
    id: 3,
    fees: BASE_FEE,
    depositToken: LP_TOKENS['RAY-USDC-V4'],
    totalDepositAmount: 540120439.512,
    strategies: [
      {
        rewardToken: "BTC",
        depositAmount: 100000000,
        accRewardPerShare: 0.01,
        lastRewardUpdatedTime: 1632359665,
      },
      {
        rewardToken: "ETH",
        depositAmount: 10000000,
        accRewardPerShare: 0.1,
        lastRewardUpdatedTime: 1632359665,
      },
      {
        rewardToken: "SOL",
        depositAmount: 200000000,
        accRewardPerShare: 680000,
        lastRewardUpdatedTime: 1632359665,
      },
      {
        rewardToken: "USDT",
        depositAmount: 50000000,
        accRewardPerShare: 1340000,
        lastRewardUpdatedTime: 1632359665,
      },
      {
        rewardToken: "USDC",
        depositAmount: 50000000,
        accRewardPerShare: 1560000,
        lastRewardUpdatedTime: 1632359665,
      },
    ]
  },
  {
    id: 4,
    fees: BASE_FEE,
    depositToken: LP_TOKENS['RAY-SOL-V4'],
    totalDepositAmount: 540120439.512,
    strategies: [
      {
        rewardToken: "BTC",
        depositAmount: 100000000,
        accRewardPerShare: 0.01,
        lastRewardUpdatedTime: 1632359665,
      },
      {
        rewardToken: "ETH",
        depositAmount: 10000000,
        accRewardPerShare: 0.1,
        lastRewardUpdatedTime: 1632359665,
      },
      {
        rewardToken: "SOL",
        depositAmount: 200000000,
        accRewardPerShare: 680000,
        lastRewardUpdatedTime: 1632359665,
      },
      {
        rewardToken: "USDT",
        depositAmount: 50000000,
        accRewardPerShare: 1340000,
        lastRewardUpdatedTime: 1632359665,
      },
      {
        rewardToken: "USDC",
        depositAmount: 50000000,
        accRewardPerShare: 1560000,
        lastRewardUpdatedTime: 1632359665,
      },
    ]
  },
]