import SmallStoneBTC from 'assets/svgs/stones_small/BTC.svg';
import SmallStoneETH from 'assets/svgs/stones_small/ETH.svg';
import SmallStoneSOL from 'assets/svgs/stones_small/SOL.svg';
import SmallStoneUSDC from 'assets/svgs/stones_small/USDC.svg';
import SmallStoneUSDT from 'assets/svgs/stones_small/USDT.svg';
import SmallStoneLET from 'assets/svgs/stones_small/LET.svg';
import SmallStoneRAY from 'assets/svgs/stones_small/RAY.svg';
import SmallStoneETC from 'assets/svgs/stones_small/ETC.svg';

import StoneBTC from 'assets/svgs/stones/BTC.svg';
import StoneETH from 'assets/svgs/stones/ETH.svg';
import StoneSOL from 'assets/svgs/stones/SOL.svg';
import StoneUSDC from 'assets/svgs/stones/USDC.svg';
import StoneUSDT from 'assets/svgs/stones/USDT.svg';
import StoneLET from 'assets/svgs/stones/LET.svg';
import StoneRAY from 'assets/svgs/stones/RAY.svg';
import StoneETC from 'assets/svgs/stones/ETC.svg';

import XLargeStoneBTC from 'assets/svgs/stones_xlarge/BTC.svg';
import XLargeStoneETH from 'assets/svgs/stones_xlarge/ETH.svg';
import XLargeStoneSOL from 'assets/svgs/stones_xlarge/SOL.svg';
import XLargeStoneUSDC from 'assets/svgs/stones_xlarge/USDC.svg';
import XLargeStoneUSDT from 'assets/svgs/stones_xlarge/USDT.svg';
import XLargeStoneLET from 'assets/svgs/stones_xlarge/LET.svg';
import XLargeStoneRAY from 'assets/svgs/stones_xlarge/RAY.svg';
import XLargeStoneETC from 'assets/svgs/stones_xlarge/ETC.svg';

import XLargeStoneBgEffectBTC from 'assets/svgs/stones_xlarge_bg_effect/BTC.svg';
import XLargeStoneBgEffectETH from 'assets/svgs/stones_xlarge_bg_effect/ETH.svg';
import XLargeStoneBgEffectSOL from 'assets/svgs/stones_xlarge_bg_effect/SOL.svg';
import XLargeStoneBgEffectUSDC from 'assets/svgs/stones_xlarge_bg_effect/USDC.svg';
import XLargeStoneBgEffectUSDT from 'assets/svgs/stones_xlarge_bg_effect/USDT.svg';
import XLargeStoneBgEffectLET from 'assets/svgs/stones_xlarge_bg_effect/LET.svg';
import XLargeStoneBgEffectRAY from 'assets/svgs/stones_xlarge_bg_effect/RAY.svg';
import XLargeStoneBgEffectETC from 'assets/svgs/stones_xlarge_bg_effect/ETC.svg';

import XLargeStoneDeactivatedBTC from 'assets/svgs/stones_xlarge_deactivated/BTC.svg';
import XLargeStoneDeactivatedETH from 'assets/svgs/stones_xlarge_deactivated/ETH.svg';
import XLargeStoneDeactivatedSOL from 'assets/svgs/stones_xlarge_deactivated/SOL.svg';
import XLargeStoneDeactivatedUSDC from 'assets/svgs/stones_xlarge_deactivated/USDC.svg';
import XLargeStoneDeactivatedUSDT from 'assets/svgs/stones_xlarge_deactivated/USDT.svg';
import XLargeStoneDeactivatedLET from 'assets/svgs/stones_xlarge_deactivated/LET.svg';
import XLargeStoneDeactivatedRAY from 'assets/svgs/stones_xlarge_deactivated/RAY.svg';
import XLargeStoneDeactivatedETC from 'assets/svgs/stones_xlarge_deactivated/ETC.svg';

import XLargeStoneOutlineBTC from 'assets/svgs/stones_xlarge_outline/BTC.svg';
import XLargeStoneOutlineETH from 'assets/svgs/stones_xlarge_outline/ETH.svg';
import XLargeStoneOutlineSOL from 'assets/svgs/stones_xlarge_outline/SOL.svg';
import XLargeStoneOutlineUSDC from 'assets/svgs/stones_xlarge_outline/USDC.svg';
import XLargeStoneOutlineUSDT from 'assets/svgs/stones_xlarge_outline/USDT.svg';
import XLargeStoneOutlineLET from 'assets/svgs/stones_xlarge_outline/LET.svg';
import XLargeStoneOutlineRAY from 'assets/svgs/stones_xlarge_outline/RAY.svg';
import XLargeStoneOutlineETC from 'assets/svgs/stones_xlarge_outline/ETC.svg';

import XXLargeStoneBTC from 'assets/svgs/stones_xxlarge/BTC.svg';
import XXLargeStoneETH from 'assets/svgs/stones_xxlarge/ETH.svg';
import XXLargeStoneSOL from 'assets/svgs/stones_xxlarge/SOL.svg';
import XXLargeStoneUSDC from 'assets/svgs/stones_xxlarge/USDC.svg';
import XXLargeStoneUSDT from 'assets/svgs/stones_xxlarge/USDT.svg';
import XXLargeStoneLET from 'assets/svgs/stones_xxlarge/LET.svg';
import XXLargeStoneRAY from 'assets/svgs/stones_xxlarge/RAY.svg';
import XXLargeStoneETC from 'assets/svgs/stones_xxlarge/ETC.svg';

import { TokenName } from "../types";

export const SMALL_STONES: { [key: string]: string } = {
  BTC: SmallStoneBTC,
  ETH: SmallStoneETH,
  SOL: SmallStoneSOL,
  USDC: SmallStoneUSDC,
  USDT: SmallStoneUSDT,
  LET: SmallStoneLET,
  RAY: SmallStoneRAY,
  ETC: SmallStoneETC,
}

export const LARGE_STONES: { [key: string]: string } = {
  BTC: StoneBTC,
  ETH: StoneETH,
  SOL: StoneSOL,
  USDC: StoneUSDC,
  USDT: StoneUSDT,
  LET: StoneLET,
  RAY: StoneRAY,
  ETC: StoneETC,
}

interface StoneAsset {
  normal: string;
  small: string;
  xlarge: string;
  xlargeBgEffect: string;
  xlargeDeactivated: string;
  xlargeOutline: string;
  xxlarge: string,
}

export const STONES: { [key in TokenName | string]: StoneAsset } = {
  BTC: {
    normal: StoneBTC,
    small: SmallStoneBTC,
    xlarge: XLargeStoneBTC,
    xlargeBgEffect: XLargeStoneBgEffectBTC,
    xlargeDeactivated: XLargeStoneDeactivatedBTC,
    xlargeOutline: XLargeStoneOutlineBTC,
    xxlarge: XXLargeStoneBTC,
  },
  ETH: {
    normal: StoneETH,
    small: SmallStoneETH,
    xlarge: XLargeStoneETH,
    xlargeBgEffect: XLargeStoneBgEffectETH,
    xlargeDeactivated: XLargeStoneDeactivatedETH,
    xlargeOutline: XLargeStoneOutlineETH,
    xxlarge: XXLargeStoneETH,
  },
  SOL: {
    normal: StoneSOL,
    small: SmallStoneSOL,
    xlarge: XLargeStoneSOL,
    xlargeBgEffect: XLargeStoneBgEffectSOL,
    xlargeDeactivated: XLargeStoneDeactivatedSOL,
    xlargeOutline: XLargeStoneOutlineSOL,
    xxlarge: XXLargeStoneSOL,
  },
  USDC: {
    normal: StoneUSDC,
    small: SmallStoneUSDC,
    xlarge: XLargeStoneUSDC,
    xlargeBgEffect: XLargeStoneBgEffectUSDC,
    xlargeDeactivated: XLargeStoneDeactivatedUSDC,
    xlargeOutline: XLargeStoneOutlineUSDC,
    xxlarge: XXLargeStoneUSDC,
  },
  USDT: {
    normal: StoneUSDT,
    small: SmallStoneUSDT,
    xlarge: XLargeStoneUSDT,
    xlargeBgEffect: XLargeStoneBgEffectUSDT,
    xlargeDeactivated: XLargeStoneDeactivatedUSDT,
    xlargeOutline: XLargeStoneOutlineUSDT,
    xxlarge: XXLargeStoneUSDT,
  },
  LET: {
    normal: StoneLET,
    small: SmallStoneLET,
    xlarge: XLargeStoneLET,
    xlargeBgEffect: XLargeStoneBgEffectLET,
    xlargeDeactivated: XLargeStoneDeactivatedLET,
    xlargeOutline: XLargeStoneOutlineLET,
    xxlarge: XXLargeStoneLET,
  },
  RAY: {
    normal: StoneRAY,
    small: SmallStoneRAY,
    xlarge: XLargeStoneRAY,
    xlargeBgEffect: XLargeStoneBgEffectRAY,
    xlargeDeactivated: XLargeStoneDeactivatedRAY,
    xlargeOutline: XLargeStoneOutlineRAY,
    xxlarge: XXLargeStoneRAY,
  },
  ETC: {
    normal: StoneETC,
    small: SmallStoneETC,
    xlarge: XLargeStoneETC,
    xlargeBgEffect: XLargeStoneBgEffectETC,
    xlargeDeactivated: XLargeStoneDeactivatedETC,
    xlargeOutline: XLargeStoneOutlineETC,
    xxlarge: XXLargeStoneETC,
  },
}
