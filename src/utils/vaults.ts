import BigNumber from "bignumber.js";
import { Fees, User, Vault } from "types";
import { getIndexFromSymbol } from "./constants";
import { getBigNumber } from "./layouts";
import { TokenAmount } from "./safe-math";
import { LP_TOKENS } from "./tokens";

export const BASE_FEE: Fees = {
  controlFee: 0.005,
  performanceFee: 0.02,
  treasuryFee: 0.025,
  withdrawalFee: 0.001,
}

export function calculateReward(userState: User, vault: Vault) {
  const decimals = userState.rewardToken.decimals
  const amount = userState.amount;
  const rewardDebt = new TokenAmount(userState.rewardDebt, decimals);
  const acc = new BigNumber(
    vault.accPerShares ?
      vault.accPerShares[getIndexFromSymbol(userState.rewardToken.symbol)] :
      0)
  console.log('acc', acc.toString())
  const rewardAmount = BigNumber.sum(
    amount.toEther().multipliedBy(acc).minus(rewardDebt.toEther()),
    userState.reward.toEther()
  );

  return Math.floor(rewardAmount.multipliedBy(Math.pow(10, decimals)).toNumber()) / Math.pow(10, decimals);
}

export function getVaultByAccountId(vaults: Vault[], id: string) {
  return vaults.find(v => v.stateAccount === id);
}

export const VAULTS: Vault[] = [
  {
    fees: BASE_FEE,
    depositToken: LP_TOKENS['RAY-USDT-V4'],
    stateAccount: "4GvYfNQSFwrJGktmVaf2MNKLMvWcdS7cNutpE2DqHT9f",
    vaultStrategyAccount: "F7zof156DGW2DxfS5EYTn8fUs6tEbmTYFQNq6UqN1wAD",
    vaultDepositTokenAccount: "4VpgRCK81etTjbS6A14K25okKvJcNrZSW1X32J7arWeE",
    farmRewardTokenAccount: "9Ad2FwXMPbKxz11HEjbUZDLYFgWZZ7RLPtYksWRQZ2qg",
    vaultRaydiumStateAccount: "9W1wt4yTJDVV879ZTvX6FUfySMuPPmKLBT7bgJBk3CYp",
    withdrawFeeTokenAccount: "4taAzYDsnqwEEuneqX35h8rw2stc3TCv9gbmMm6b8g9P",
    rewardUsdcLpMintAccount: LP_TOKENS['RAY-USDC-V4'].mintAddress,
  },
  {
    fees: BASE_FEE,
    depositToken: LP_TOKENS['RAY-SRM-V4'],
    stateAccount: "CGuTEPsTxonRXnxeXSL2QoALRoQgxa4vrwLco3yAy5Sy",
    vaultStrategyAccount: "A4TCb22S8T4KwVuPDHXVZztwXkNgvi1esNqitkba4nqe",
    vaultDepositTokenAccount: "7Ta1Q2qUGwojdycpa93p7CqtkxxcurnfAN4Yr1hPmkGi",
    farmRewardTokenAccount: "3YYnJ7wVhhp2VMwxVmExbDYp2Kfh9rXpUJv4mFTKvM2g",
    vaultRaydiumStateAccount: "DVSnF88KBmYSnBvePciasQJvKMkaX61fnCvoXDvLoGMj",
    withdrawFeeTokenAccount: "3Vj2Td8dAB3ERTkeNVNHarWHKtskTMHACUT8d9toajmC",
    rewardUsdcLpMintAccount: LP_TOKENS['RAY-USDC-V4'].mintAddress,
  },
  {
    fees: BASE_FEE,
    depositToken: LP_TOKENS['RAY-SOL-V4'],
    stateAccount: "JC2QYMzdE9QCHnAtsBoXgAQgrExA85HjGGqMkzzrk3qb",
    vaultStrategyAccount: "JEJvK3zh2EigdpCfJVDLhMvB8eq2WVNRsZemfuueqaX4",
    vaultDepositTokenAccount: "CzsxDA5Aop1UbHae4nUQEqxVn5virygBENiM1rJE8HG2",
    farmRewardTokenAccount: "Gj5GWpWqfpMuKvSqQfctccPW5y5QADw7mT62LvW2Ycpb",
    vaultRaydiumStateAccount: "9dFoCXDSqWuNrscs2aL91WbU8MtsMegTqGNgbFuKjeUR",
    withdrawFeeTokenAccount: "Ek581A73gp45kqzrDYtNLKW7M2YALabtAjewFHtRew3r",
    rewardUsdcLpMintAccount: LP_TOKENS['RAY-USDC-V4'].mintAddress,
  },
  {
    fees: BASE_FEE,
    depositToken: LP_TOKENS['RAY-USDC-V4'],
    stateAccount: "Q4CDrTQM2BAomVM3KaEYGHENPvgzaHSiop8dpJ12ha9",
    vaultStrategyAccount: "4reeoypQsnmD5vdEwjpcJRXMqUzzm3ztchsADihEfJAd",
    vaultDepositTokenAccount: "G9xJteAYmjBW37ifVPjyZRVxzJFhd5BxbnYyXtGt6dYs",
    farmRewardTokenAccount: "5ypLNuruDFKBTNwg6SMrVzvC8JQ9dDJELQ2AMdDaKF78",
    vaultRaydiumStateAccount: "7Rzp3dYLyA3HyRfiUNnLBJ9AcRvJAjrV2J4BHpKSraMJ",
    withdrawFeeTokenAccount: "FnbY92hXeh4CJwApJV6tSYN8j6WwX5H7ScVLLThCMwTr",
    rewardUsdcLpMintAccount: LP_TOKENS['RAY-USDC-V4'].mintAddress,
  },
  {
    fees: BASE_FEE,
    depositToken: LP_TOKENS['RAY-ETH-V4'],
    stateAccount: "3L7hafMqmGDj3U6Y4RuyxetH4zGzDWp7JwwgGVErv6iL",
    vaultStrategyAccount: "5vwWnvLftLjMv8W2WjepkgqiNzhyLwd3RuvjYyDXWC43",
    vaultDepositTokenAccount: "3njtiecV7gJAteggZLCrsfG5r9nQ28jmxS4gRusuZqwz",
    farmRewardTokenAccount: "2yNTeJfkojo71yh7zbbqAZ7PnHCkJHhh2dy7w5C6AJPZ",
    vaultRaydiumStateAccount: "8dPHCWNU1uxUDkxapvp1sqRc6v2uSWkkXpyGQWRwhYoi",
    withdrawFeeTokenAccount: "94xE1SQYvzJMwBs6tQ1T7sUJJgJzdbP1zKBMqFiPTGjn",
    rewardUsdcLpMintAccount: LP_TOKENS['RAY-USDC-V4'].mintAddress,
  },
]
