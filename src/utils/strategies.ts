import BigNumber from "bignumber.js";
import { Strategy, StrategyApy } from "types";
import { TOKENS } from "./tokens";

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
    strategyTokenAccount: "F3CQFdE1tyRUYcQNN4w3wWkU1DJenKMwJsWinTawHtVb",
    strategyTokenMintAccount: TOKENS.USDT.mintAddress,
    performanceFeeTokenAccount: "BzKqXpZVqe8x7tKJpP72m3TJDGgXbRDNbpsVPSfn4Mrm",
  },
  // {
  //   stateAccount: "Bu4PAB2xbhPqxMF7NyE1z5zm8rWzEfE3LMtanGNAvusX",
  //   strategyTokenAccount: "F3CQFdE1tyRUYcQNN4w3wWkU1DJenKMwJsWinTawHtVb",
  //   strategyTokenMintAccount: TOKENS.USDT.mintAddress,
  //   performanceFeeTokenAccount: "BzKqXpZVqe8x7tKJpP72m3TJDGgXbRDNbpsVPSfn4Mrm",
  // },
  // {
  //   stateAccount: "Bu4PAB2xbhPqxMF7NyE1z5zm8rWzEfE3LMtanGNAvusX",
  //   strategyTokenAccount: "F3CQFdE1tyRUYcQNN4w3wWkU1DJenKMwJsWinTawHtVb",
  //   strategyTokenMintAccount: TOKENS.USDT.mintAddress,
  //   performanceFeeTokenAccount: "BzKqXpZVqe8x7tKJpP72m3TJDGgXbRDNbpsVPSfn4Mrm",
  // },
  // {
  //   stateAccount: "Bu4PAB2xbhPqxMF7NyE1z5zm8rWzEfE3LMtanGNAvusX",
  //   strategyTokenAccount: "F3CQFdE1tyRUYcQNN4w3wWkU1DJenKMwJsWinTawHtVb",
  //   strategyTokenMintAccount: TOKENS.USDT.mintAddress,
  //   performanceFeeTokenAccount: "BzKqXpZVqe8x7tKJpP72m3TJDGgXbRDNbpsVPSfn4Mrm",
  // },
  // {
  //   stateAccount: "Bu4PAB2xbhPqxMF7NyE1z5zm8rWzEfE3LMtanGNAvusX",
  //   strategyTokenAccount: "F3CQFdE1tyRUYcQNN4w3wWkU1DJenKMwJsWinTawHtVb",
  //   strategyTokenMintAccount: TOKENS.USDT.mintAddress,
  //   performanceFeeTokenAccount: "BzKqXpZVqe8x7tKJpP72m3TJDGgXbRDNbpsVPSfn4Mrm",
  // },
  // {
  //   stateAccount: "Bu4PAB2xbhPqxMF7NyE1z5zm8rWzEfE3LMtanGNAvusX",
  //   strategyTokenAccount: "F3CQFdE1tyRUYcQNN4w3wWkU1DJenKMwJsWinTawHtVb",
  //   strategyTokenMintAccount: TOKENS.USDT.mintAddress,
  //   performanceFeeTokenAccount: "BzKqXpZVqe8x7tKJpP72m3TJDGgXbRDNbpsVPSfn4Mrm",
  // },
]
