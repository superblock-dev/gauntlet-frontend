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
    stateAccount: "6TiTmAYTi64hayfth8CNB6kRFhuLJYUbGAtQB7Wqni8r",
    vaultStrategyAccount: "H8gwp3SYaTDXzEzSshwdHV3Yz8CoxeBKoUMQFeJwAxSA",
    vaultDepositTokenAccount: "9vBDT22Fo3Pb6uFuEZTGxHe8aM9qE1Zb9FmfYacustfu",
    farmRewardTokenAccount: "5TRgo3aBtnFoEC1LG2abFxKpwPQo6umUw5yEiWfNhgin",
    vaultRaydiumStateAccount: "9hrB5FLLUrgb91NzgW8N3UqqANkwHze3yw4pdhAxEmNt",
    withdrawFeeTokenAccount: "Cn73mpMpGGsuAdH6MDWdVJbWtJaUKMFpvXyJc2mZhkgE",
    rewardUsdcLpMintAccount: LP_TOKENS['RAY-USDC-V4'].mintAddress,
  },
  {
    fees: BASE_FEE,
    depositToken: LP_TOKENS['RAY-SRM-V4'],
    stateAccount: "Fa3o4UT8HQhN1XkPq6SrCa4iuxzL6YxPK3ay7XNrgy1h",
    vaultStrategyAccount: "3ai3eXQxuDpuvy9UspVR5Lx7Mk9Zk4pVribFurE8Qrzx",
    vaultDepositTokenAccount: "7BFCtFnTdzRddp3koz8dnGmr1tea6jYJYGGwgjz1wbKs",
    farmRewardTokenAccount: "6TXbnDQXrnnZ1FLnQPqHn3mfbp1mBcZMMUNibWrmNUaZ",
    vaultRaydiumStateAccount: "8XAwppLNBgXM457eam9gPHW8MGx3PT2PRHq6xLGYXqp7",
    withdrawFeeTokenAccount: "7dNjkETz76WW7daxzs1L2cjKxKCFEcX4EDbKio2sBh7A",
    rewardUsdcLpMintAccount: LP_TOKENS['RAY-USDC-V4'].mintAddress,
  },
  {
    fees: BASE_FEE,
    depositToken: LP_TOKENS['RAY-SOL-V4'],
    stateAccount: "9dDYFynMHb4nzcnxkjqE2NZypanNPA2NYGirXpFidxmw",
    vaultStrategyAccount: "Hq3nyoGAHnXubaorK7Uf47zTM1KiHZt9v32iprKUuJXx",
    vaultDepositTokenAccount: "6V8v88peFwdAc1vtaTkt6aWQ1AtS77XaLpFAT92QjCop",
    farmRewardTokenAccount: "9LCjj9ynzfdSsv1VGCN1nSq1yagUqXgcTmAvpnR9JZ9G",
    vaultRaydiumStateAccount: "5eNUJgfw6XMMxLQnnLNSAidsS677Yt7ZPH7gFuxZznDJ",
    withdrawFeeTokenAccount: "45ZYrtJ8dd1uqnRgpQatWK4HDmqBLpGkPh8ZRyBwerz4",
    rewardUsdcLpMintAccount: LP_TOKENS['RAY-USDC-V4'].mintAddress,
  },
  {
    fees: BASE_FEE,
    depositToken: LP_TOKENS['RAY-USDC-V4'],
    stateAccount: "CtBMnFGPiTkQTwb9XSaEhoU2n5AsU1qFEZ6ELctE27vz",
    vaultStrategyAccount: "HrkL9WdLCfsqQxESGKCHbRzNx6aBjDk1YTNXCczRsRY",
    vaultDepositTokenAccount: "FnL3udW1Rhe6LQpk6q9Zj2aALh5kY36gV8C9bTCbjPPF",
    farmRewardTokenAccount: "4cGfZVhMqEgrZNip89ciTWMF6KzYbJERgqp5z7BrWnxf",
    vaultRaydiumStateAccount: "2agShc3CHCa96yXkRKPf2f1Xa1QYUoXApYYY5kcf8Zwr",
    withdrawFeeTokenAccount: "9WVqhPB9LDhrMCk2tccqzb7MNMve8YxizUShBNWPXBK2",
    rewardUsdcLpMintAccount: LP_TOKENS['RAY-USDC-V4'].mintAddress,
  },
  {
    fees: BASE_FEE,
    depositToken: LP_TOKENS['RAY-ETH-V4'],
    stateAccount: "7MhYvR7D6TT8vrLz4XoiD214ujtqCS8kfoYPqk4g1yi7",
    vaultStrategyAccount: "ESZHt8QBpgJXGrozRQn2c1EbxEJ22CbBWqmz3PFaPkAc",
    vaultDepositTokenAccount: "F273cMLoYWc6P1KvDpuZRJgS7SZKQr47NAFTxHrRM5cG",
    farmRewardTokenAccount: "Edj9P8FAeuZT5ejgQhqUh2ooXKiE5p7Cc1iPB7QuuCvP",
    vaultRaydiumStateAccount: "9Pt43hMg2rQ8H6UDEeMLtfT2LAnr7MPSD1UduNe68ck8",
    withdrawFeeTokenAccount: "6U41k7gmfsb5puLcHJefi2E6mBCKM62L8kZJVUgE9pYK",
    rewardUsdcLpMintAccount: LP_TOKENS['RAY-USDC-V4'].mintAddress,
  },
]
