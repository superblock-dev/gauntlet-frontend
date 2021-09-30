import BigNumber from "bignumber.js";

export interface StrategyFarm {
  token: string;
  apy: number;
}

export function calculateApyInPercentage(farmApr: BigNumber, stratApy: number) {
  const dailyApr = farmApr.dividedBy(365);
  const sApy = BigNumber.sum(new BigNumber(stratApy).dividedBy(365), 1);
  const multiplier = (sApy.pow(365)).minus(1).dividedBy(sApy.minus(1));
  const apy = dailyApr.multipliedBy(multiplier);

  return apy;
}

export const STRATEGY_FARMS: StrategyFarm[] = [
  {
    token: 'BTC',
    apy: 0.015,
  },
  {
    token: 'ETH',
    apy: 0.0923,
  },
  {
    token: 'SOL',
    apy: 0.0504,
  },
  {
    token: 'USDC',
    apy: 0.1341,
  },
  {
    token: 'USDT',
    apy: 0.1063,
  },
  {
    token: 'RAY',
    apy: 0.7021,
  },
  {
    token: 'LET',
    apy: 2.501,
  },
  {
    token: 'RAY-ETH',
    apy: 0.6978,
  },
  {
    token: 'RAY-SOL',
    apy: 0.3714,
  },
  {
    token: 'RAY-USDC',
    apy: 0.7456,
  },
  {
    token: 'RAY-USDT',
    apy: 0.7626,
  },
];
