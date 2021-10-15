import BigNumber from "bignumber.js";
import { Fees, UserState, Vault } from "types";
import { getIndexFromSymbol } from "./constants";
import { getBigNumber } from "./layouts";
import { TokenAmount } from "./safe-math";
import { LP_TOKENS } from "./tokens";

export const BASE_FEE: Fees = {
  controlFee: 0.005,
  performanceFee: 0.02,
  treasuryFee: 0.025,
  withdrawalFee: 0.001,
};

export function calculateReward(userState: UserState, vault: Vault) {
  const decimals = userState.rewardToken.decimals
  const amount = new TokenAmount(getBigNumber(userState.amount), decimals);
  const rewardDebt = new TokenAmount(getBigNumber(userState.rewardDebt), decimals);
  const acc = new BigNumber(vault.accPerShares[getIndexFromSymbol(userState.rewardToken.symbol)]);
  const rewardAmount = BigNumber.sum(
    amount.toEther().multipliedBy(acc).minus(rewardDebt.toEther()), 
    userState.reward
  );
  
  return Math.floor(rewardAmount.multipliedBy(Math.pow(10, decimals)).toNumber()) / Math.pow(10, decimals);
}

export function getVaultById(vaults: Vault[], id: number) {
  return vaults.find(v => v.id === id);
}

export const VAULTS: Vault[] = [
  {
    id: 1,
    fees: BASE_FEE,
    depositToken: LP_TOKENS['RAY-USDT-V4'],
    totalDepositAmount: 540120439.512,
    accPerShares: [
      0.01,
      0.1,
      680000,
      1340000,
      1560000,
      1560000,
      // 1340000,
      // 1560000,
      // 1560000,
      // 1340000,
      // 1560000,
      // 1560000,
    ]
  },
  {
    id: 2,
    fees: BASE_FEE,
    depositToken: LP_TOKENS['RAY-SRM-V4'],
    totalDepositAmount: 540120439.512,
    accPerShares: [
      0.01,
      0.1,
      680000,
      1340000,
      1560000,
      1560000,
      // 1340000,
      // 1560000,
      // 1560000,
      // 1340000,
      // 1560000,
      // 1560000,
    ]
  },
  {
    id: 3,
    fees: BASE_FEE,
    depositToken: LP_TOKENS['RAY-SOL-V4'],
    totalDepositAmount: 540120439.512,
    accPerShares: [
      0.01,
      0.1,
      680000,
      1340000,
      1560000,
      1560000,
      // 1340000,
      // 1560000,
      // 1560000,
      // 1340000,
      // 1560000,
      // 1560000,
    ]
  },
  {
    id: 4,
    fees: BASE_FEE,
    depositToken: LP_TOKENS['RAY-USDC-V4'],
    totalDepositAmount: 540120439.512,
    accPerShares: [
      0.01,
      0.1,
      680000,
      1340000,
      1560000,
      1560000,
      // 1340000,
      // 1560000,
      // 1560000,
      // 1340000,
      // 1560000,
      // 1560000,
    ]
  },
  {
    id: 5,
    fees: BASE_FEE,
    depositToken: LP_TOKENS['RAY-ETH-V4'],
    totalDepositAmount: 540120439.512,
    accPerShares: [
      0.01,
      0.1,
      680000,
      1340000,
      1560000,
      1560000,
      // 1340000,
      // 1560000,
      // 1560000,
      // 1340000,
      // 1560000,
      // 1560000,
    ]
  },
]