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
    stateAccount: "Bu4PAB2xbhPqxMF7NyE1z5zm8rWzEfE3LMtanGNAvusX",
    strategyTokenSymbol: TOKENS.BTC.symbol,
    strategyTokenAccount: "F3CQFdE1tyRUYcQNN4w3wWkU1DJenKMwJsWinTawHtVb",
    strategyTokenMintAccount: TOKENS.BTC.mintAddress,
    performanceFeeTokenAccount: "BzKqXpZVqe8x7tKJpP72m3TJDGgXbRDNbpsVPSfn4Mrm",
    strategyLpMintAccount: LP_TOKENS['BTC-USDC-V4'].mintAddress,
    isUsdcProxyEnabled: true,
  },
  {
    stateAccount: "Bu4PAB2xbhPqxMF7NyE1z5zm8rWzEfE3LMtanGNAvusX",
    strategyTokenSymbol: TOKENS.ETH.symbol,
    strategyTokenAccount: "F3CQFdE1tyRUYcQNN4w3wWkU1DJenKMwJsWinTawHtVb",
    strategyTokenMintAccount: TOKENS.ETH.mintAddress,
    performanceFeeTokenAccount: "BzKqXpZVqe8x7tKJpP72m3TJDGgXbRDNbpsVPSfn4Mrm",
    strategyLpMintAccount: LP_TOKENS['RAY-ETH-V4'].mintAddress,
  },
  {
    stateAccount: "Bu4PAB2xbhPqxMF7NyE1z5zm8rWzEfE3LMtanGNAvusX",
    strategyTokenSymbol: TOKENS.SOL.symbol,
    strategyTokenAccount: "F3CQFdE1tyRUYcQNN4w3wWkU1DJenKMwJsWinTawHtVb",
    strategyTokenMintAccount: TOKENS.SOL.mintAddress,
    performanceFeeTokenAccount: "BzKqXpZVqe8x7tKJpP72m3TJDGgXbRDNbpsVPSfn4Mrm",
    strategyLpMintAccount: LP_TOKENS['RAY-SOL-V4'].mintAddress,
  },
  {
    stateAccount: "Bu4PAB2xbhPqxMF7NyE1z5zm8rWzEfE3LMtanGNAvusX",
    strategyTokenSymbol: TOKENS.USDC.symbol,
    strategyTokenAccount: "F3CQFdE1tyRUYcQNN4w3wWkU1DJenKMwJsWinTawHtVb",
    strategyTokenMintAccount: TOKENS.USDC.mintAddress,
    performanceFeeTokenAccount: "BzKqXpZVqe8x7tKJpP72m3TJDGgXbRDNbpsVPSfn4Mrm",
    strategyLpMintAccount: LP_TOKENS['RAY-USDC-V4'].mintAddress,
  },
  {
    stateAccount: "Di7rfuHHPEGoFS2p3mJrXauWfeHesf6kr9Eh7jXV2zbs",
    strategyTokenSymbol: TOKENS.USDT.symbol,
    strategyTokenAccount: "66sjWpisK973EMu7aRhjsmQFWj6pEnt8XQhaZErqn3tV",
    strategyTokenMintAccount: TOKENS.USDT.mintAddress,
    performanceFeeTokenAccount: "DRAPJk1MuGCNitQQKn6L5e3yC1o2XjRBX9Za5aAYkEL1",
    strategyLpMintAccount: LP_TOKENS['RAY-USDT-V4'].mintAddress,
  },
]
