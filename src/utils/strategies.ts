import BigNumber from "bignumber.js";
import { Strategy, StrategyApy } from "types";
import { LP_TOKENS, TOKENS } from "./tokens";

// 이걸 프론트에서 직접 수행하면 너무 오래걸림.
export function calculateApyInPercentage(farmApr: number, multiplier: number) {
  // const dailyApr = new BigNumber(farmApr).dividedBy(365);
  // // const sApy = BigNumber.sum(new BigNumber(stratApy).dividedBy(365), 1);
  // // const multiplier = (sApy.pow(365)).minus(1).dividedBy(sApy.minus(1));
  // const apy = dailyApr.multipliedBy(multiplier);

  return new BigNumber(farmApr);
}

export const STRATEGY_FARMS: StrategyApy[] = [
  {
    token: 'BTC',
    apy: 367.744,
  },
  {
    token: 'ETH',
    apy: 382.324,
  },
  {
    token: 'SOL',
    apy: 374.327,
  },
  {
    token: 'USDC',
    apy: 390.528,
  },
  {
    token: 'USDT',
    apy: 385.046,
  },
]

export const STRATEGIES: Strategy[] = [
  {
    stateAccount: "F8QbGLCe1Cbr3HBYimse4MBscFiRo9HM39F1ZTDSVfJa",
    strategyTokenAccount: "aX8WMWN4TxV8Yjwy9Ms4VgUCaSQCryFZyjwE5jzYR3k",
    performanceFeeTokenAccount: "Lk5sNoCKdq6452XCgzV2wfN2MppM6pfRRLvBPR98uyC",
    strategyTokenSymbol: TOKENS.BTC.symbol,
    strategyTokenMintAccount: TOKENS.BTC.mintAddress,
    strategyLpMintAccount: LP_TOKENS['BTC-USDC-V4'].mintAddress,
    isUsdcProxyEnabled: true,
  },
  {
    stateAccount: "A55xxWcNGb9aaNchC3piAoqNk7VxPoHMdoepuQzefpUR",
    strategyTokenAccount: "D5AMh68bY38aWXN2h7CSMgyXsSUiedgBmXv5UyoUmNQr",
    performanceFeeTokenAccount: "7SY6DvTpoEk2Lnx9HZWXc4oa28YMEhvppQRrWdgs45TP",
    strategyTokenSymbol: TOKENS.ETH.symbol,
    strategyTokenMintAccount: TOKENS.ETH.mintAddress,
    strategyLpMintAccount: LP_TOKENS['RAY-ETH-V4'].mintAddress,
  },
  {
    stateAccount: "nB8Vk7YD16a1s4eupuqS9zhUdUxtKW2N7WaWRYVaqXv",
    strategyTokenAccount: "AMDreZLKbw9L6SaUrWzSESuC5LzH3Gs43JqUvdEbriFy",
    performanceFeeTokenAccount: "6egRrLc7RFGzfYiWBZ4xabv8ThX8F5TvNzvM49WK4Js4",
    strategyTokenSymbol: TOKENS.WSOL.symbol,
    strategyTokenMintAccount: TOKENS.WSOL.mintAddress,
    strategyLpMintAccount: LP_TOKENS['RAY-SOL-V4'].mintAddress,
  },
  {
    stateAccount: "67ZhcFpSrgT79yEUwB3xPLXmLMK9PY3HEPxzxAZCZtq",
    strategyTokenAccount: "8XG266p5cfyFj9z87J7azUV1t2k3M7wGFixL5j15jz5Z",
    performanceFeeTokenAccount: "5YDZbdwcL1UZwDS8BDWghjiMaenzSXNNTqM2QMcrXywW",
    strategyTokenSymbol: TOKENS.USDC.symbol,
    strategyTokenMintAccount: TOKENS.USDC.mintAddress,
    strategyLpMintAccount: LP_TOKENS['RAY-USDC-V4'].mintAddress,
  },
  {
    stateAccount: "FkN4vU4pwRwmFZAT7ShR4CtEsTRYBdShi5M87XeaPY8b",
    strategyTokenAccount: "ERRpjg7chkuSK7GMuyHU97rCLKccppzRphCK8dkjkzvg",
    performanceFeeTokenAccount: "BgR6EHWEyC1CRoWpt9YirQUHJ9T51jARggxMibxL6NtT",
    strategyTokenSymbol: TOKENS.USDT.symbol,
    strategyTokenMintAccount: TOKENS.USDT.mintAddress,
    strategyLpMintAccount: LP_TOKENS['RAY-USDT-V4'].mintAddress,
  },
]
