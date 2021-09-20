import { TOKENS, Token, LP_TOKENS } from "./tokens";
import { LIQUIDITY_POOL_PROGRAM_ID_V4 } from "./ids";

export interface LiquidityPoolInfo {
  name: string
  target: string
  coin: Token
  pc: Token
  lp: Token

  version: number
  programId: string

  ammId: string
  
  poolCoinTokenAccount: string
  poolPcTokenAccount: string
}

export function getAddressForWhat(address: string) {
  for (const token of Object.keys(LIQUIDITY_POOLS)) {
    const pool = LIQUIDITY_POOLS[token];
    for (const [key, value] of Object.entries(pool)) {
      if (key === 'lp') {
        if (value.mintAddress === address) {
          return { key: 'lpMintAddress', lpMintAddress: pool.lp.mintAddress, version: pool.version }
        }
      } else if (value === address) {
        return { key, lpMintAddress: pool.lp.mintAddress, version: pool.version }
      }
    }
  }

  return {}
}

// Pools for price oracle.
export const LIQUIDITY_POOLS: {[key: string]: LiquidityPoolInfo} = {
  BTC: {
    name: 'BTC-USDC',
    target: 'BTC',
    coin: { ...TOKENS.BTC },
    pc: { ...TOKENS.USDC },
    lp: { ...LP_TOKENS['BTC-USDC-V4'] },

    version: 4,
    programId: LIQUIDITY_POOL_PROGRAM_ID_V4,

    ammId: '6kbC5epG18DF2DwPEW34tBy5pGFS7pEGALR3v5MGxgc5',

    poolCoinTokenAccount: 'HWTaEDR6BpWjmyeUyfGZjeppLnH7s8o225Saar7FYDt5',
    poolPcTokenAccount: '7iGcnvoLAxthsXY3AFSgkTDoqnLiuti5fyPNm2VwZ3Wz',
  },
  ETH: {
    name: 'ETH-USDC',
    target: 'ETH',
    coin: { ...TOKENS.ETH },
    pc: { ...TOKENS.USDC },
    lp: { ...LP_TOKENS['ETH-USDC-V4'] },

    version: 4,
    programId: LIQUIDITY_POOL_PROGRAM_ID_V4,

    ammId: 'AoPebtuJC4f2RweZSxcVCcdeTgaEXY64Uho8b5HdPxAR',
    poolCoinTokenAccount: 'EHT99uYfAnVxWHPLUMJRTyhD4AyQZDDknKMEssHDtor5',
    poolPcTokenAccount: '58tgdkogRoMsrXZJubnFPsFmNp5mpByEmE1fF6FTNvDL',
  },
  SOL: {
    name: 'SOL-USDC',
    target: 'SOL',
    coin: { ...TOKENS.SOL },
    pc: { ...TOKENS.USDC },
    lp: { ...LP_TOKENS['SOL-USDC-V4'] },

    version: 4,
    programId: LIQUIDITY_POOL_PROGRAM_ID_V4,

    ammId: '58oQChx4yWmvKdwLLZzBi4ChoCc2fqCUWBkwMihLYQo2',
    poolCoinTokenAccount: 'DQyrAcCrDXQ7NeoqGgDCZwBvWDcYmFCjSb9JtteuvPpz',
    poolPcTokenAccount: 'HLmqeL62xR1QoZ1HKKbXRrdN1p3phKpxRMb2VVopvBBz',
  },
}