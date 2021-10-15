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

export const USER_STATES: UserState[] = [
  // {
  //   vaultId: 1,
  //   balance: 380,
  //   rewards: [
  //     // {
  //     //   tokenName: 'BTC',
  //     //   token: TOKENS.BTC,
  //     //   amount: 50,
  //     //   rewardDebt: 0.000272,
  //     // },
  //     // {
  //     //   tokenName: 'SOL',
  //     //   token: TOKENS.SOL,
  //     //   amount: 230,
  //     //   rewardDebt: 0.25,
  //     // },
  //     // {
  //     //   tokenName: 'USDC',
  //     //   token: TOKENS.USDC,
  //     //   amount: 50,
  //     //   rewardDebt: 560000,
  //     // },
  //     {
  //       tokenName: 'LET-USDC',
  //       token: LP_TOKENS['LET-USDC'],
  //       amount: 380,
  //       rewardDebt: 20000,
  //     }
  //   ]
  // },
  // {
  //   vaultId: 3,
  //   balance: 380,
  //   rewards: [
  //     {
  //       tokenName: 'BTC',
  //       token: TOKENS.BTC,
  //       amount: 280,
  //       rewardDebt: 0.000272,
  //     },
  //     {
  //       tokenName: 'ETH',
  //       token: TOKENS.ETH,
  //       amount: 50,
  //       rewardDebt: 0.00048,
  //     },
  //     {
  //       tokenName: 'RAY-USDC',
  //       token: LP_TOKENS['RAY-USDC-V4'],
  //       amount: 50,
  //       rewardDebt: 0,
  //     }
  //   ]
  // },
];

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
      1340000,
      1560000,
      1560000,
      1340000,
      1560000,
      1560000,
    ],
    vaultStateAccount: "FgPqAkiqEqRH5Y2qc5JpUTELgg4Kt1kKbyFfsis8nEKV",
    vaultStrategyAccount: "DnEpq8Z2TKFU1xQCie1iCvnU5qhnwMhiCxccF4KkKjzQ",
    vaultDepositTokenAccount: "J27PU3toMReud3cwdWJYh4qJ6o4b5CCwVDWypCvBJZPa",
    farmRewardTokenAccount: "2fXVnnLf2EzdA3ZRQNdtkNV3abTZAKKhJ3n1FWGPECad",
    vaultRaydiumStateAccount: "FEEBAFLz8M6656ZFx7HuAauzxAZ8tFCMhqS9LdmBgnvR",
    withdrawFeeTokenAccount: "5fq9sJnPHzKokqRNDFqbSaWX4RUn1mDT1GEkKVDmenTt",
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
      1340000,
      1560000,
      1560000,
      1340000,
      1560000,
      1560000,
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
      1340000,
      1560000,
      1560000,
      1340000,
      1560000,
      1560000,
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
      1340000,
      1560000,
      1560000,
      1340000,
      1560000,
      1560000,
    ]
  },
]