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
  const amount = new TokenAmount(getBigNumber(userState.amount), decimals);
  const rewardDebt = new TokenAmount(getBigNumber(userState.rewardDebt), decimals);
  const acc = new BigNumber(
    vault.accPerShares ?
      vault.accPerShares[getIndexFromSymbol(userState.rewardToken.symbol)] :
      0)
  const rewardAmount = BigNumber.sum(
    amount.toEther().multipliedBy(acc).minus(rewardDebt.toEther()),
    userState.reward
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
    stateAccount: "FgPqAkiqEqRH5Y2qc5JpUTELgg4Kt1kKbyFfsis8nEKV",
    vaultStrategyAccount: "DnEpq8Z2TKFU1xQCie1iCvnU5qhnwMhiCxccF4KkKjzQ",
    vaultDepositTokenAccount: "J27PU3toMReud3cwdWJYh4qJ6o4b5CCwVDWypCvBJZPa",
    farmRewardTokenAccount: "2fXVnnLf2EzdA3ZRQNdtkNV3abTZAKKhJ3n1FWGPECad",
    vaultRaydiumStateAccount: "FEEBAFLz8M6656ZFx7HuAauzxAZ8tFCMhqS9LdmBgnvR",
    withdrawFeeTokenAccount: "5fq9sJnPHzKokqRNDFqbSaWX4RUn1mDT1GEkKVDmenTt",
  },
  {
    fees: BASE_FEE,
    depositToken: LP_TOKENS['RAY-SRM-V4'],
    stateAccount: "FgPqAkiqEqRH5Y2qc5JpUTELgg4Kt1kKbyFfsis8nEKV",
    vaultStrategyAccount: "DnEpq8Z2TKFU1xQCie1iCvnU5qhnwMhiCxccF4KkKjzQ",
    vaultDepositTokenAccount: "J27PU3toMReud3cwdWJYh4qJ6o4b5CCwVDWypCvBJZPa",
    farmRewardTokenAccount: "2fXVnnLf2EzdA3ZRQNdtkNV3abTZAKKhJ3n1FWGPECad",
    vaultRaydiumStateAccount: "FEEBAFLz8M6656ZFx7HuAauzxAZ8tFCMhqS9LdmBgnvR",
    withdrawFeeTokenAccount: "5fq9sJnPHzKokqRNDFqbSaWX4RUn1mDT1GEkKVDmenTt",
  },
  {
    fees: BASE_FEE,
    depositToken: LP_TOKENS['RAY-SOL-V4'],
    stateAccount: "FgPqAkiqEqRH5Y2qc5JpUTELgg4Kt1kKbyFfsis8nEKV",
    vaultStrategyAccount: "DnEpq8Z2TKFU1xQCie1iCvnU5qhnwMhiCxccF4KkKjzQ",
    vaultDepositTokenAccount: "J27PU3toMReud3cwdWJYh4qJ6o4b5CCwVDWypCvBJZPa",
    farmRewardTokenAccount: "2fXVnnLf2EzdA3ZRQNdtkNV3abTZAKKhJ3n1FWGPECad",
    vaultRaydiumStateAccount: "FEEBAFLz8M6656ZFx7HuAauzxAZ8tFCMhqS9LdmBgnvR",
    withdrawFeeTokenAccount: "5fq9sJnPHzKokqRNDFqbSaWX4RUn1mDT1GEkKVDmenTt",
  },
  {
    fees: BASE_FEE,
    depositToken: LP_TOKENS['RAY-USDC-V4'],
    stateAccount: "FgPqAkiqEqRH5Y2qc5JpUTELgg4Kt1kKbyFfsis8nEKV",
    vaultStrategyAccount: "DnEpq8Z2TKFU1xQCie1iCvnU5qhnwMhiCxccF4KkKjzQ",
    vaultDepositTokenAccount: "J27PU3toMReud3cwdWJYh4qJ6o4b5CCwVDWypCvBJZPa",
    farmRewardTokenAccount: "2fXVnnLf2EzdA3ZRQNdtkNV3abTZAKKhJ3n1FWGPECad",
    vaultRaydiumStateAccount: "FEEBAFLz8M6656ZFx7HuAauzxAZ8tFCMhqS9LdmBgnvR",
    withdrawFeeTokenAccount: "5fq9sJnPHzKokqRNDFqbSaWX4RUn1mDT1GEkKVDmenTt",
  },
  {
    fees: BASE_FEE,
    depositToken: LP_TOKENS['RAY-ETH-V4'],
    stateAccount: "FgPqAkiqEqRH5Y2qc5JpUTELgg4Kt1kKbyFfsis8nEKV",
    vaultStrategyAccount: "DnEpq8Z2TKFU1xQCie1iCvnU5qhnwMhiCxccF4KkKjzQ",
    vaultDepositTokenAccount: "J27PU3toMReud3cwdWJYh4qJ6o4b5CCwVDWypCvBJZPa",
    farmRewardTokenAccount: "2fXVnnLf2EzdA3ZRQNdtkNV3abTZAKKhJ3n1FWGPECad",
    vaultRaydiumStateAccount: "FEEBAFLz8M6656ZFx7HuAauzxAZ8tFCMhqS9LdmBgnvR",
    withdrawFeeTokenAccount: "5fq9sJnPHzKokqRNDFqbSaWX4RUn1mDT1GEkKVDmenTt",
  },
]
