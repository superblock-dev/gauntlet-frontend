import { TOKENS, Token, LP_TOKENS, LPToken } from "./tokens";
import {
  LIQUIDITY_POOL_PROGRAM_ID_V4
} from "./ids";
import { TokenAmount } from "./safe-math";
import { getBigNumber } from "./layouts";

export interface LiquidityPoolInfo {
  name: string
  coin: Token
  pc: Token
  lp: LPToken

  version: number
  programId: string

  ammId: string

  poolCoinTokenAccount: string
  poolPcTokenAccount: string
  currentLpValue?: number
}

export function getAddressForWhat(address: string) {
  for (const pool of LIQUIDITY_POOLS) {
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

export function calculateLpValues(lpInfos: { [key: string]: LiquidityPoolInfo }, prices: { [key: string]: number }) {
  Object.keys(lpInfos).forEach(key => {
    let info = lpInfos[key];
    const liquidityCoinValue =
      getBigNumber((info.coin.balance as TokenAmount).toEther()) *
      prices[info.coin.symbol as string];

    const liquidityPcValue =
      getBigNumber((info.pc.balance as TokenAmount).toEther()) *
      prices[info.pc.symbol as string];

    const liquidityTotalValue = liquidityPcValue + liquidityCoinValue;

    if (!info.lp.totalSupply) { return info.currentLpValue = 0; }
    const liquidityTotalSupply = getBigNumber((info.lp.totalSupply as TokenAmount).toEther());
    const liquidityItemValue = liquidityTotalValue / liquidityTotalSupply

    info.currentLpValue = liquidityItemValue;
  })
}

// Pools for calculate APR, TVL etc
export const LIQUIDITY_POOLS: LiquidityPoolInfo[] = [
  // v4
  {
    name: 'FIDA-RAY',
    coin: { ...TOKENS.FIDA },
    pc: { ...TOKENS.RAY },
    lp: { ...LP_TOKENS['FIDA-RAY-V4'] },

    version: 4,
    programId: LIQUIDITY_POOL_PROGRAM_ID_V4,

    ammId: '2dRNngAm729NzLbb1pzgHtfHvPqR4XHFmFyYK78EfEeX',
    poolCoinTokenAccount: '6YeEo7ZTRHotXd89JTBJKRXERBjv3N3ofgsgJ4FoAa39',
    poolPcTokenAccount: 'DDNURcWy3CU3CpkCnDoGXwQAeCg1mp2CC8WqvwHp5Fdt',
  },
  {
    name: 'OXY-RAY',
    coin: { ...TOKENS.OXY },
    pc: { ...TOKENS.RAY },
    lp: { ...LP_TOKENS['OXY-RAY-V4'] },

    version: 4,
    programId: LIQUIDITY_POOL_PROGRAM_ID_V4,

    ammId: 'B5ZguAWAGC3GXVtJZVfoMtzvEvDnDKBPCevsUKMy4DTZ',
    poolCoinTokenAccount: '6ttf7G7FR9GWqxiyCLFNaBTvwYzTLPdbbrNcRvShaqtS',
    poolPcTokenAccount: '8orrvb6rHB776KbQmszcxPH44cZHdCTYC1fr2a3oHufC',
  },
  {
    name: 'MAPS-RAY',
    coin: { ...TOKENS.MAPS },
    pc: { ...TOKENS.RAY },
    lp: { ...LP_TOKENS['MAPS-RAY-V4'] },

    version: 4,
    programId: LIQUIDITY_POOL_PROGRAM_ID_V4,

    ammId: '5VyLSjUvaRxsubirbvbfJMbrKZRx1b7JZzuCAfyqgimf',
    poolCoinTokenAccount: '6rYv6kLfhAVKZw1xN2S9NWNgp8EfUVvYKi1Hgzd5x9XE',
    poolPcTokenAccount: '8HfvN4VyAQjX6MhziRxMg5LjbMh9Fw889yf3sDgrXakw',
  },
  {
    name: 'KIN-RAY',
    coin: { ...TOKENS.KIN },
    pc: { ...TOKENS.RAY },
    lp: { ...LP_TOKENS['KIN-RAY-V4'] },

    version: 4,
    programId: LIQUIDITY_POOL_PROGRAM_ID_V4,

    ammId: '6kmMMacvoCKBkBrqssLEdFuEZu2wqtLdNQxh9VjtzfwT',
    poolCoinTokenAccount: 's7LP6qptF1wufA9neYhekmVPqhav8Ak85AV5ip5h8wK',
    poolPcTokenAccount: '9Q1Xs1s8tCirX3Ky3qo9UjvSqSoGinZvWaUMFXY5r2HF',
  },
  {
    name: 'RAY-USDT',
    coin: { ...TOKENS.RAY },
    pc: { ...TOKENS.USDT },
    lp: { ...LP_TOKENS['RAY-USDT-V4'] },

    version: 4,
    programId: LIQUIDITY_POOL_PROGRAM_ID_V4,

    ammId: 'DVa7Qmb5ct9RCpaU7UTpSaf3GVMYz17vNVU67XpdCRut',
    poolCoinTokenAccount: '3wqhzSB9avepM9xMteiZnbJw75zmTBDVmPFLTQAGcSMN',
    poolPcTokenAccount: '5GtSbKJEPaoumrDzNj4kGkgZtfDyUceKaHrPziazALC1',
  },
  {
    name: 'STEP-USDC',
    coin: { ...TOKENS.STEP },
    pc: { ...TOKENS.USDC },
    lp: { ...LP_TOKENS['STEP-USDC-V4'] },

    version: 4,
    programId: LIQUIDITY_POOL_PROGRAM_ID_V4,

    ammId: '4Sx1NLrQiK4b9FdLKe2DhQ9FHvRzJhzKN3LoD6BrEPnf',
    poolCoinTokenAccount: '8Gf8Cc6yrxtfUZqM2vf2kg5uR9bGPfCHfzdYRVBAJSJj',
    poolPcTokenAccount: 'ApLc86fHjVbGbU9QFzNPNuWM5VYckZM92q6sgJN1SGYn',
  },
  {
    name: 'MEDIA-USDC',
    coin: { ...TOKENS.MEDIA },
    pc: { ...TOKENS.USDC },
    lp: { ...LP_TOKENS['MEDIA-USDC-V4'] },

    version: 4,
    programId: LIQUIDITY_POOL_PROGRAM_ID_V4,

    ammId: '94CQopiGxxUXf2avyMZhAFaBdNatd62ttYGoTVQBRGdi',
    poolCoinTokenAccount: '7zfTWDFmMi3Tzbbd3FZ2vZDdBm1w7whiZq1DrCxAHwMj',
    poolPcTokenAccount: 'FWUnfg1hHuanU8LxJv31TAfEWSvuWWffeMmHpcZ9BYVr',
  },
  {
    name: 'ROPE-USDC',
    coin: { ...TOKENS.ROPE },
    pc: { ...TOKENS.USDC },
    lp: { ...LP_TOKENS['ROPE-USDC-V4'] },

    version: 4,
    programId: LIQUIDITY_POOL_PROGRAM_ID_V4,

    ammId: 'BuS4ScFcZjEBixF1ceCTiXs4rqt4WDfXLoth7VcM2Eoj',
    poolCoinTokenAccount: '3mS8mb1vDrD45v4zoxbSdrvbyVM1pBLM31cYLT2RfS2U',
    poolPcTokenAccount: 'BWfzmvvXhQ5V8ZWDMC4u82sEWgc6HyRLnq6nauwrtz5x',
  },
  {
    name: 'MER-USDC',
    coin: { ...TOKENS.MER },
    pc: { ...TOKENS.USDC },
    lp: { ...LP_TOKENS['MER-USDC-V4'] },

    version: 4,
    programId: LIQUIDITY_POOL_PROGRAM_ID_V4,

    ammId: 'BkfGDk676QFtTiGxn7TtEpHayJZRr6LgNk9uTV2MH4bR',
    poolCoinTokenAccount: '6XZ1hoJQZARtyA17mXkfnKSHWK2RvocC3UDNsY7f4Lf6',
    poolPcTokenAccount: 'F4opwQUoVhVRaf3CpMuCPpWNcB9k3AXvMMsfQh52pa66',
  },
  {
    name: 'COPE-USDC',
    coin: { ...TOKENS.COPE },
    pc: { ...TOKENS.USDC },
    lp: { ...LP_TOKENS['COPE-USDC-V4'] },

    version: 4,
    programId: LIQUIDITY_POOL_PROGRAM_ID_V4,

    ammId: 'DiWxV1SPXPNJRCt5Ao1mJRAxjw97hJVyj8qGzZwFbAFb',
    poolCoinTokenAccount: 'FhjBg8vpVgsiW9oCUxujqoWWSPSRvnWNXucEF1G1F39Z',
    poolPcTokenAccount: 'Dv95skm7AUr33x1p2Bu5EgvE3usB1TxgZoxjBe2rpfm6',
  },
  {
    name: 'ALEPH-USDC',
    coin: { ...TOKENS.ALEPH },
    pc: { ...TOKENS.USDC },
    lp: { ...LP_TOKENS['ALEPH-USDC-V4'] },

    version: 4,
    programId: LIQUIDITY_POOL_PROGRAM_ID_V4,

    ammId: 'GDHXjn9wF2zxW35DBkCegWQdoTfFBC9LXt7D5ovJxQ5B',
    poolCoinTokenAccount: 'BT3QMKHrha4fhqpisnYKaPDsv42XeHU2Aovhdu5Bazru',
    poolPcTokenAccount: '9L4tXPyuwuLhmtmX4yaRTK6TB7tYFNHupeENoCdPceq',
  },
  {
    name: 'TULIP-USDC',
    coin: { ...TOKENS.TULIP },
    pc: { ...TOKENS.USDC },
    lp: { ...LP_TOKENS['TULIP-USDC-V4'] },

    version: 4,
    programId: LIQUIDITY_POOL_PROGRAM_ID_V4,

    ammId: '96hPvuJ3SRT82m7BAc7G1AUVPVcoj8DABAa5gT7wjgzX',
    poolCoinTokenAccount: 's9Xp7GV1jGvixdSfY6wPgivsTd3c4TzjW1eJGyojwV4',
    poolPcTokenAccount: 'wcyW58QFNfppgm4Wi7cKhSftdVNfpLdn67YvvCNMWrt',
  },
  {
    name: 'SNY-USDC',
    coin: { ...TOKENS.SNY },
    pc: { ...TOKENS.USDC },
    lp: { ...LP_TOKENS['SNY-USDC-V4'] },

    version: 4,
    programId: LIQUIDITY_POOL_PROGRAM_ID_V4,

    ammId: '5TgJXpv6H3KJhHCuP7KoDLSCmi8sM8nABizP7CmYAKm1',
    poolCoinTokenAccount: 'FaUYbopmMVdNRe3rLnqGPBA2KB96nLHudKaEgAUcvHXn',
    poolPcTokenAccount: '9YiW8N9QdEsAdTQN8asjebwwEmDXAHRnb1E3nvz64vjg',
  },
  {
    name: 'BOP-RAY',
    coin: { ...TOKENS.BOP },
    pc: { ...TOKENS.RAY },
    lp: { ...LP_TOKENS['BOP-RAY-V4'] },

    version: 4,
    programId: LIQUIDITY_POOL_PROGRAM_ID_V4,

    ammId: 'SJmR8rJgzzCi4sPjGnrNsqY4akQb3jn5nsxZBhyEifC',
    poolCoinTokenAccount: 'B345z8QcC2WvCwKjeTveLHAuEghumw2qH2xPxAbW7Awd',
    poolPcTokenAccount: 'EPFPMhTRNA6f7J1NzEZ1rkWyhfexZBr9VX3MAn3C6Ce4',
  },
  {
    name: 'SLRS-USDC',
    coin: { ...TOKENS.SLRS },
    pc: { ...TOKENS.USDC },
    lp: { ...LP_TOKENS['SLRS-USDC-V4'] },

    version: 4,
    programId: LIQUIDITY_POOL_PROGRAM_ID_V4,

    ammId: '7XXKU8oGDbeGrkPyK5yHKzdsrMJtB7J2TMugjbrXEhB5',
    poolCoinTokenAccount: '6vjnbp6vhw4RxNqN3e2tfE3VnkbCx8RCLt8RBmHZvuoC',
    poolPcTokenAccount: '2anKifuiizorX69zWQddupMqawGfk3TMPGZs4t7ZZk43',
  },
  {
    name: 'SAMO-RAY',
    coin: { ...TOKENS.SAMO },
    pc: { ...TOKENS.RAY },
    lp: { ...LP_TOKENS['SAMO-RAY-V4'] },

    version: 4,
    programId: LIQUIDITY_POOL_PROGRAM_ID_V4,

    ammId: 'EyDgEU9BdG7m6ZK4bYERxbN4NCJ129WzPtv23dBkfsLg',
    poolCoinTokenAccount: '9RFqA8EbTTqH3ct1fTGiGgqFAg2hziUdtyGgg1w69LJP',
    poolPcTokenAccount: 'ArAyYYib2X8BTcURYNXKhfoUww2DWkzk67PRPGVpFAuJ',
  },
  {
    name: 'RAY-USDC',
    coin: { ...TOKENS.RAY },
    pc: { ...TOKENS.USDC },
    lp: { ...LP_TOKENS['RAY-USDC-V4'] },

    version: 4,
    programId: LIQUIDITY_POOL_PROGRAM_ID_V4,

    ammId: '6UmmUiYoBjSrhakAobJw8BvkmJtDVxaeBtbt7rxWo1mg',
    poolCoinTokenAccount: 'FdmKUE4UMiJYFK5ogCngHzShuVKrFXBamPWcewDr31th',
    poolPcTokenAccount: 'Eqrhxd7bDUCH3MepKmdVkgwazXRzY6iHhEoBpY7yAohk',
  },
  {
    name: 'RAY-SRM',
    coin: { ...TOKENS.RAY },
    pc: { ...TOKENS.SRM },
    lp: { ...LP_TOKENS['RAY-SRM-V4'] },

    version: 4,
    programId: LIQUIDITY_POOL_PROGRAM_ID_V4,

    ammId: 'GaqgfieVmnmY4ZsZHHA6L5RSVzCGL3sKx4UgHBaYNy8m',
    poolCoinTokenAccount: '3FqQ8p72N85USJStyttaohu1EBsTsEZQ9tVqwcPWcuSz',
    poolPcTokenAccount: '384kWWf2Km56EReGvmtCKVo1BBmmt2SwiEizjhwpCmrN',
  },
  {
    name: 'RAY-ETH',
    coin: { ...TOKENS.RAY },
    pc: { ...TOKENS.ETH },
    lp: { ...LP_TOKENS['RAY-ETH-V4'] },

    version: 4,
    programId: LIQUIDITY_POOL_PROGRAM_ID_V4,

    ammId: '8iQFhWyceGREsWnLM8NkG9GC8DvZunGZyMzuyUScgkMK',
    poolCoinTokenAccount: 'G3Szi8fUqxfZjZoNx17kQbxeMTyXt2ieRvju4f3eJt9j',
    poolPcTokenAccount: '7MgaPPNa7ySdu5XV7ik29Xoav4qcDk4wznXZ2Muq9MnT',
  },
  {
    name: 'RAY-SOL',
    coin: { ...TOKENS.RAY },
    pc: { ...TOKENS.SOL },
    lp: { ...LP_TOKENS['RAY-SOL-V4'] },

    version: 4,
    programId: LIQUIDITY_POOL_PROGRAM_ID_V4,

    ammId: 'AVs9TA4nWDzfPJE9gGVNJMVhcQy3V9PGazuz33BfG2RA',
    poolCoinTokenAccount: 'Em6rHi68trYgBFyJ5261A2nhwuQWfLcirgzZZYoRcrkX',
    poolPcTokenAccount: '3mEFzHsJyu2Cpjrz6zPmTzP7uoLFj9SbbecGVzzkL1mJ',
  },
  {
    name: 'LIKE-USDC',
    coin: { ...TOKENS.LIKE },
    pc: { ...TOKENS.USDC },
    lp: { ...LP_TOKENS['LIKE-USDC-V4'] },

    version: 4,
    programId: LIQUIDITY_POOL_PROGRAM_ID_V4,

    ammId: 'GmaDNMWsTYWjaXVBjJTHNmCWAKU6cn5hhtWWYEZt4odo',
    poolCoinTokenAccount: '8LoHX6f6bMdQVs4mThoH2KwX2dQDSkqVFADi4ZjDQv9T',
    poolPcTokenAccount: '2Fwm8M8vuPXEXxvKz98VdawDxsK9W8uRuJyJhvtRdhid',
  },
  {
    name: 'MNGO-USDC',
    coin: { ...TOKENS.MNGO },
    pc: { ...TOKENS.USDC },
    lp: { ...LP_TOKENS['MNGO-USDC-V4'] },

    version: 4,
    programId: LIQUIDITY_POOL_PROGRAM_ID_V4,

    ammId: '34tFULRrRwh4bMcBLPtJaNqqe5pVgGZACi5sR8Xz95KC',
    poolCoinTokenAccount: '91fMidHL8Yr8KRcu4Zu2RPRRg1FbXxZ7DV43rAyKRLjn',
    poolPcTokenAccount: '93oFfbcayY2WkcR6d9AyqPcRC121dXmWarFJkwPErRRE',
  },
  {
    name: 'ATLAS-USDC',
    coin: { ...TOKENS.ATLAS },
    pc: { ...TOKENS.USDC },
    lp: { ...LP_TOKENS['ATLAS-USDC-V4'] },

    version: 4,
    programId: LIQUIDITY_POOL_PROGRAM_ID_V4,

    ammId: '2bnZ1edbvK3CK3LTNZ5jH9anvXYCmzPR4W2HQ6Ngsv5K',
    poolCoinTokenAccount: 'FpFV46UVvRtcrRvYtKYgJpJtP1tZkvssjhrLUfoj8Cvo',
    poolPcTokenAccount: 'GzwX68f1ZF4dKnAJ58RdET8sPvvnYktbDEHmjoGw7Umk',
  },
  {
    name: 'POLIS-USDC',
    coin: { ...TOKENS.POLIS },
    pc: { ...TOKENS.USDC },
    lp: { ...LP_TOKENS['POLIS-USDC-V4'] },

    version: 4,
    programId: LIQUIDITY_POOL_PROGRAM_ID_V4,

    ammId: '9xyCzsHi1wUWva7t5Z8eAvZDRmUCVhRrbaFfm3VbU4Mf',
    poolCoinTokenAccount: '7HgvC7GdmUt7kMivdLMovLStW25avFsW9GDXgNr525Uy',
    poolPcTokenAccount: '9FknRLGpWBqYg7fXQaBDyWWdu1v2RwUM6zRV6CiPjWBD',
  },
  {
    name: 'ATLAS-RAY',
    coin: { ...TOKENS.ATLAS },
    pc: { ...TOKENS.RAY },
    lp: { ...LP_TOKENS['ATLAS-RAY-V4'] },

    version: 4,
    programId: LIQUIDITY_POOL_PROGRAM_ID_V4,

    ammId: 'F73euqPynBwrgcZn3fNSEneSnYasDQohPM5aZazW9hp2',
    poolCoinTokenAccount: '33UaaUmmySzxK7q3yhmQiXMrW1tQrwqojyD6ZEFgM6FZ',
    poolPcTokenAccount: '9SYRTwYE5UV2cxEuRz8iiJcV8gMbMnJUYFC8zgDAsUwB',
  },
  {
    name: 'POLIS-RAY',
    coin: { ...TOKENS.POLIS },
    pc: { ...TOKENS.RAY },
    lp: { ...LP_TOKENS['POLIS-RAY-V4'] },

    version: 4,
    programId: LIQUIDITY_POOL_PROGRAM_ID_V4,

    ammId: '5tho4By9RsqTF1rbm9Akiepik3kZBT7ffUzGg8bL1mD',
    poolCoinTokenAccount: 'Ah9T12tzwnTXWrWVWzLmCrwCEmVHS7HMdWKG4qLUDzJP',
    poolPcTokenAccount: 'J7kjQkrpafcLjL7cCpmMamxLAFnCkGApLTC2QrbHe2NQ',
  },
  {
    name: 'ALEPH-RAY',
    coin: { ...TOKENS.ALEPH },
    pc: { ...TOKENS.RAY },
    lp: { ...LP_TOKENS['ALEPH-RAY-V4'] },

    version: 4,
    programId: LIQUIDITY_POOL_PROGRAM_ID_V4,

    ammId: '8Fr3wxZXLtiSozqms5nF4XXGHNSNqcMC6K6MvRqEfk4a',
    poolCoinTokenAccount: '4WzdFwdKaXLQdFn9i84asMxdr6Fmhmh3qd6uC2xjBXwd',
    poolPcTokenAccount: 'yFWn8ji7zq24UDg1mMqP1mA3vWyUdkjARQUPZCS5iCf',
  },
  {
    name: 'TULIP-RAY',
    coin: { ...TOKENS.TULIP },
    pc: { ...TOKENS.RAY },
    lp: { ...LP_TOKENS['TULIP-RAY-V4'] },

    version: 4,
    programId: LIQUIDITY_POOL_PROGRAM_ID_V4,

    ammId: 'Dm1Q15216uRARmQTbo6VfnyEGVzRvLTm4TfCWWX4MF3F',
    poolCoinTokenAccount: '96VnEN3nhvyb6hLSyP6BGsvSFdTJycQtTr574Kavrje8',
    poolPcTokenAccount: 'FhnZ1j8C8d7aXecxQXEGpRycoH6uJ1Fpncj4Sm33J2iS',
  },
  {
    name: 'SLRS-RAY',
    coin: { ...TOKENS.SLRS },
    pc: { ...TOKENS.RAY },
    lp: { ...LP_TOKENS['SLRS-RAY-V4'] },

    version: 4,
    programId: LIQUIDITY_POOL_PROGRAM_ID_V4,

    ammId: 'J3CoGcJqHquUdSgS7qAwdGbp3so4EpLX8eVDdGuauvi',
    poolCoinTokenAccount: '8QWf745UQeyMyM1qAAsCeb73jTvQvpm2diVgjNvHgbVX',
    poolPcTokenAccount: '5TsxBaazJ7Zdx4x4Zd2zC7TY98EVSwGY7hnioS2omkx1',
  },
  {
    name: 'MER-RAY',
    coin: { ...TOKENS.MER },
    pc: { ...TOKENS.RAY },
    lp: { ...LP_TOKENS['MER-RAY-V4'] },

    version: 4,
    programId: LIQUIDITY_POOL_PROGRAM_ID_V4,

    ammId: 'BKLCqnuk4qc5iHWuJuewMxuvsNZXuTBSUyRT5ftnRb6H',
    poolCoinTokenAccount: 'rmnAGzEwFnim88JLhqj66B86QLJL6cgm3tPDfGiKqZf',
    poolPcTokenAccount: '4Lm4c4NqNyobLGULtHRtgoG4hbX7ytuGQFFcdip4jvBb',
  },
  {
    name: 'MEDIA-RAY',
    coin: { ...TOKENS.MEDIA },
    pc: { ...TOKENS.RAY },
    lp: { ...LP_TOKENS['MEDIA-RAY-V4'] },

    version: 4,
    programId: LIQUIDITY_POOL_PROGRAM_ID_V4,

    ammId: '5ZPBHzMr19iQjBaDgFDYGAx2bxaQ3TzWmSS7zAGrHtQJ',
    poolCoinTokenAccount: 'FGskpuYNgqgHU4kHSibgqDkYCCZhxAtpQxZNqFaKfBDK',
    poolPcTokenAccount: '7AiT1Re8Z8m8eLdy5HWRqWvx6pBZMytdWQ3wL8zCrSNp',
  },
  {
    name: 'SNY-RAY',
    coin: { ...TOKENS.SNY },
    pc: { ...TOKENS.RAY },
    lp: { ...LP_TOKENS['SNY-RAY-V4'] },

    version: 4,
    programId: LIQUIDITY_POOL_PROGRAM_ID_V4,

    ammId: 'Am9FpX73ctZ3HzohcRdyCCv84iT7nugevqLjY5yTSUQP',
    poolCoinTokenAccount: 'BjJMnG8c4zMHHZrvxP6ydKYGPkvXL5fF9gC38rtAu2Sx',
    poolPcTokenAccount: '7dwpWj95qzPoBFCL7qzgoj9zhjmNNoDyncbyJEYiRfv7',
  },
  {
    name: 'LIKE-RAY',
    coin: { ...TOKENS.LIKE },
    pc: { ...TOKENS.RAY },
    lp: { ...LP_TOKENS['LIKE-RAY-V4'] },

    version: 4,
    programId: LIQUIDITY_POOL_PROGRAM_ID_V4,

    ammId: 'DGSnfcE1kw4uDC6jgrsZ3s5CMfsWKN7JNjDNasHdvKfq',
    poolCoinTokenAccount: 'HXmwydLeUB7JaLWhoPFkDLazQJwUuWCBi3M28p7WfwL7',
    poolPcTokenAccount: 'BDbjkVrTezpirdkk24MfXprJrAi3WXazr4L6DHT5buXi',
  },
  {
    name: 'COPE-RAY',
    coin: { ...TOKENS.COPE },
    pc: { ...TOKENS.RAY },
    lp: { ...LP_TOKENS['COPE-RAY-V4'] },

    version: 4,
    programId: LIQUIDITY_POOL_PROGRAM_ID_V4,

    ammId: '8hvVAhShYLPThcxrxwMNAWmgRCSjtxygj11EGHp2WHz8',
    poolCoinTokenAccount: 'CVCDGPwGmxHyt1HwfJgCYbskEXPTvKxZfR6nkZexFQi5',
    poolPcTokenAccount: 'DyHnyEW4MQ1J28JrqvY7AdMq6Djr3TjvczgsokQxj6YB',
  }
];