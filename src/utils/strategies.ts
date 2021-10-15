import BigNumber from "bignumber.js";
import { Strategy, StrategyApy } from "types";
import { LP_TOKENS, TOKENS } from "./tokens";

// 이걸 프론트에서 직접 수행하면 너무 오래걸림.
export function calculateApyInPercentage(farmApr: number, multiplier: number) {
  const dailyApr = new BigNumber(farmApr).dividedBy(365);
  // const sApy = BigNumber.sum(new BigNumber(stratApy).dividedBy(365), 1);
  // const multiplier = (sApy.pow(365)).minus(1).dividedBy(sApy.minus(1));
  const apy = dailyApr.multipliedBy(multiplier);

  return apy;
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
    stateAccount: "8D8Ca846kRs8SYFDHQfmjBvT3A8iS4RiBBy5HhiZ73W2",
    strategyTokenAccount: "G2enxJvgzWgfDigbgwyuoXDuk6SLnzYEgzG3pJKgSMX",
    performanceFeeTokenAccount: "46G1gLr8mBKHv4n7XmHnE5HdjEwDdwATHnvqAupJfvuM",
    strategyTokenSymbol: TOKENS.BTC.symbol,
    strategyTokenMintAccount: TOKENS.BTC.mintAddress,
    strategyLpMintAccount: LP_TOKENS['BTC-USDC-V4'].mintAddress,
    isUsdcProxyEnabled: true,
  },
  {
    stateAccount: "3ijEi4gwHdm9n42nJ4BNEa4u8aBRiAq5qiEe6pBYzMq2",
    strategyTokenAccount: "8r8YeFHaQmefmbBzGZbMQSh8Br6GHgFGZ2hFKnrtKx4Y",
    performanceFeeTokenAccount: "FeC7z3yvg4NVdkMzdomU83JTFLnYEW7e8jzbc6Y5PfN1",
    strategyTokenSymbol: TOKENS.ETH.symbol,
    strategyTokenMintAccount: TOKENS.ETH.mintAddress,
    strategyLpMintAccount: LP_TOKENS['RAY-ETH-V4'].mintAddress,
  },
  {
    stateAccount: "9fAKo4br3wvxQJLs5FWiPpmvmJhRD3LurPbJm8s6UoUw",
    strategyTokenAccount: "E7RZbVjPMVR4mbexArLGgCLCcsM6ehPSQaGHj4oaifhS",
    performanceFeeTokenAccount: "HabMmTmxr3U8bDRsdUkm4VZSW74Q3czCjZE1GNnAmPTX",
    strategyTokenSymbol: TOKENS.WSOL.symbol,
    strategyTokenMintAccount: TOKENS.WSOL.mintAddress,
    strategyLpMintAccount: LP_TOKENS['RAY-SOL-V4'].mintAddress,
  },
  {
    stateAccount: "Ddmp6vwQXArFbddwnZi38mtMkHj77CCTwWnwuhjsH2Ne",
    strategyTokenAccount: "36TgneAsSpnknG1CL9X8GeUsqnpr7hXkACqUhmsFtKKf",
    performanceFeeTokenAccount: "7T7vVZim7zBAdW7kgrEUafhbYe16RXSYPtQ5PVgbCLao",
    strategyTokenSymbol: TOKENS.USDC.symbol,
    strategyTokenMintAccount: TOKENS.USDC.mintAddress,
    strategyLpMintAccount: LP_TOKENS['RAY-USDC-V4'].mintAddress,
  },
  {
    stateAccount: "ES1xKmh5AmbJdUuvHUnEAxN9R7YYjsam71wkLyeEFREE",
    strategyTokenAccount: "4HJkPHxtq1z4xkkndyPUNubr93fyGKnM9eymUgQi6Ywi",
    performanceFeeTokenAccount: "9mxee77PhF3CCGjSku5RXmywAKWmKEJqjvqniuke5oNW",
    strategyTokenSymbol: TOKENS.USDT.symbol,
    strategyTokenMintAccount: TOKENS.USDT.mintAddress,
    strategyLpMintAccount: LP_TOKENS['RAY-USDT-V4'].mintAddress,
  },
]
