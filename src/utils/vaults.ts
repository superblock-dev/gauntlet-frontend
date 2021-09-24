import BigNumber from "bignumber.js";
import { Fees, Reward, UserState, Vault } from "types";
import { LP_TOKENS } from "./tokens";

export const BASE_FEE: Fees = {
  performanceFee: 0.03,
  withdrawalFee: 0.001,
};

export function calculateReward(reward: Reward, accPerReward: number) {
  const amount = new BigNumber(reward.amount);
  const acc = new BigNumber(accPerReward);
  const rewardDebt = new BigNumber(reward.rewardDebt)
  return amount.multipliedBy(acc).minus(rewardDebt);
}

export const RAYDIUM_STAKE_PROGRAM_ID = 'EhhTKczWMGQt46ynNeRX1WfeagwwJd7ufHvCDjRxjo5Q';

export const USER_STATES: UserState[] = [
  {
    vaultId: 1,
    balance: 48000,
    rewards: [
      {
        token: 'BTC',
        amount: 28000,
        rewardDebt: 0.000272,
      },
      {
        token: 'SOL',
        amount: 5000,
        rewardDebt: 0.25,
      },
      {
        token: 'USDC',
        amount: 5000,
        rewardDebt: 56,
      }
    ]
  },
  {
    vaultId: 3,
    balance: 48000,
    rewards: [
      {
        token: 'BTC',
        amount: 28000,
        rewardDebt: 0.000272,
      },
      {
        token: 'ETH',
        amount: 5000,
        rewardDebt: 0.00048,
      },
      {
        token: 'USDT',
        amount: 5000,
        rewardDebt: 58,
      }
    ]
  },
];

export const VAULTS: Vault[] = [
  {
    id: 1,
    fees: BASE_FEE,
    depositToken: LP_TOKENS['RAY-USDC-V3'],
    totalDepositAmount: 540120439.512,
    farmId: RAYDIUM_STAKE_PROGRAM_ID,
    strategies: [
      {
        rewardToken: "BTC",
        depositAmount: 100000000,
        accRewardPerShare: 0.00000001,
        lastRewardUpdatedTime: 1632359665,
      },
      {
        rewardToken: "ETH",
        depositAmount: 10000000,
        accRewardPerShare: 0.0000001,
        lastRewardUpdatedTime: 1632359665,
      },
      {
        rewardToken: "SOL",
        depositAmount: 200000000,
        accRewardPerShare: 0.000068,
        lastRewardUpdatedTime: 1632359665,
      },
      {
        rewardToken: "USDT",
        depositAmount: 50000000,
        accRewardPerShare: 0.0134,
        lastRewardUpdatedTime: 1632359665,
      },
      {
        rewardToken: "USDC",
        depositAmount: 50000000,
        accRewardPerShare: 0.0156,
        lastRewardUpdatedTime: 1632359665,
      },
    ]
  },
  {
    id: 2,
    fees: BASE_FEE,
    depositToken: LP_TOKENS['RAY-ETH-V3'],
    totalDepositAmount: 540120439.512,
    farmId: RAYDIUM_STAKE_PROGRAM_ID,
    strategies: [
      {
        rewardToken: "BTC",
        depositAmount: 100000000,
        accRewardPerShare: 0.00000001,
        lastRewardUpdatedTime: 1632359665,
      },
      {
        rewardToken: "ETH",
        depositAmount: 10000000,
        accRewardPerShare: 0.0000001,
        lastRewardUpdatedTime: 1632359665,
      },
      {
        rewardToken: "SOL",
        depositAmount: 200000000,
        accRewardPerShare: 0.000068,
        lastRewardUpdatedTime: 1632359665,
      },
      {
        rewardToken: "USDT",
        depositAmount: 50000000,
        accRewardPerShare: 0.0134,
        lastRewardUpdatedTime: 1632359665,
      },
      {
        rewardToken: "USDC",
        depositAmount: 50000000,
        accRewardPerShare: 0.0156,
        lastRewardUpdatedTime: 1632359665,
      },
    ]
  },
  {
    id: 3,
    fees: BASE_FEE,
    depositToken: LP_TOKENS['ETH-USDC-V4'],
    totalDepositAmount: 540120439.512,
    farmId: RAYDIUM_STAKE_PROGRAM_ID,
    strategies: [
      {
        rewardToken: "BTC",
        depositAmount: 100000000,
        accRewardPerShare: 0.00000001,
        lastRewardUpdatedTime: 1632359665,
      },
      {
        rewardToken: "ETH",
        depositAmount: 10000000,
        accRewardPerShare: 0.0000001,
        lastRewardUpdatedTime: 1632359665,
      },
      {
        rewardToken: "SOL",
        depositAmount: 200000000,
        accRewardPerShare: 0.000068,
        lastRewardUpdatedTime: 1632359665,
      },
      {
        rewardToken: "USDT",
        depositAmount: 50000000,
        accRewardPerShare: 0.0134,
        lastRewardUpdatedTime: 1632359665,
      },
      {
        rewardToken: "USDC",
        depositAmount: 50000000,
        accRewardPerShare: 0.0156,
        lastRewardUpdatedTime: 1632359665,
      },
    ]
  },
  {
    id: 4,
    fees: BASE_FEE,
    depositToken: LP_TOKENS['BTC-USDC-V4'],
    totalDepositAmount: 540120439.512,
    farmId: RAYDIUM_STAKE_PROGRAM_ID,
    strategies: [
      {
        rewardToken: "BTC",
        depositAmount: 100000000,
        accRewardPerShare: 0.00000001,
        lastRewardUpdatedTime: 1632359665,
      },
      {
        rewardToken: "ETH",
        depositAmount: 10000000,
        accRewardPerShare: 0.0000001,
        lastRewardUpdatedTime: 1632359665,
      },
      {
        rewardToken: "SOL",
        depositAmount: 200000000,
        accRewardPerShare: 0.000068,
        lastRewardUpdatedTime: 1632359665,
      },
      {
        rewardToken: "USDT",
        depositAmount: 50000000,
        accRewardPerShare: 0.0134,
        lastRewardUpdatedTime: 1632359665,
      },
      {
        rewardToken: "USDC",
        depositAmount: 50000000,
        accRewardPerShare: 0.0156,
        lastRewardUpdatedTime: 1632359665,
      },
    ]
  },
]