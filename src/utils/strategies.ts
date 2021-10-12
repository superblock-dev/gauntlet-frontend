import BigNumber from "bignumber.js";

export interface StrategyFarm {
  token: string;
  apy: number;
}

// 이걸 프론트에서 직접 수행하면 너무 오래걸림.
export function calculateApyInPercentage(farmApr: BigNumber, multiplier: number) {
  const dailyApr = farmApr.dividedBy(365);
  // const sApy = BigNumber.sum(new BigNumber(stratApy).dividedBy(365), 1);
  // const multiplier = (sApy.pow(365)).minus(1).dividedBy(sApy.minus(1));
  const apy = dailyApr.multipliedBy(multiplier);

  return apy;
}

export const STRATEGY_FARMS: StrategyFarm[] = [
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
  {
    token: 'RAY',
    apy: 528.512,
  },
  {
    token: 'LET',
    apy: 591.183,
  },
  {
    token: 'RAY-ETH',
    apy: 527.251,
  },
  {
    token: 'RAY-SOL',
    apy: 441.743,
  },
  {
    token: 'RAY-USDC',
    apy: 541.480,
  },
  {
    token: 'RAY-USDT',
    apy: 546.656,
  },
  {
    token: 'LET-USDC',
    apy: 454914,
  }
];
