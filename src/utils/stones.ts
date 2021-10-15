import BgEffectBTC from 'assets/stones/bg_BTC.png';
import BgEffectETH from 'assets/stones/bg_ETH.png';
import BgEffectSOL from 'assets/stones/bg_SOL.png';
import BgEffectUSDC from 'assets/stones/bg_USDC.png';
import BgEffectUSDT from 'assets/stones/bg_USDT.png';
import BgEffectLET from 'assets/stones/bg_LET.png';
import BgEffectRAY from 'assets/stones/bg_RAY.png';

import DeactivatedBTC from 'assets/stones/inactive_BTC.png';
import DeactivatedETH from 'assets/stones/inactive_ETH.png';
import DeactivatedSOL from 'assets/stones/inactive_SOL.png';
import DeactivatedUSDC from 'assets/stones/inactive_USDC.png';
import DeactivatedUSDT from 'assets/stones/inactive_USDT.png';
import DeactivatedLET from 'assets/stones/inactive_LET.png';
import DeactivatedRAY from 'assets/stones/inactive_RAY.png';

import OutlineBTC from 'assets/stones/outline_BTC.png';
import OutlineETH from 'assets/stones/outline_ETH.png';
import OutlineSOL from 'assets/stones/outline_SOL.png';
import OutlineUSDC from 'assets/stones/outline_USDC.png';
import OutlineUSDT from 'assets/stones/outline_USDT.png';
import OutlineLET from 'assets/stones/outline_LET.png';
import OutlineRAY from 'assets/stones/outline_RAY.png';

import BTC from 'assets/stones/BTC.png';
import ETH from 'assets/stones/ETH.png';
import SOL from 'assets/stones/SOL.png';
import USDC from 'assets/stones/USDC.png';
import USDT from 'assets/stones/USDT.png';
import RAY from 'assets/stones/RAY.png';
import LET from 'assets/stones/LET.png';

export const STONES: { [key: string]: string } = {
  BTC: BTC,
  ETH: ETH,
  SOL: SOL,
  USDC: USDC,
  USDT: USDT,
  LET: LET,
  RAY: RAY,
}

interface StoneDisplayEffect {
  bgEffect: string;
  deactivated: string;
  outline: string;
}

export const STONE_BG_EFFECTS: { [key: string]: StoneDisplayEffect } = {
  BTC: {
    bgEffect: BgEffectBTC,
    deactivated: DeactivatedBTC,
    outline: OutlineBTC,
  },
  ETH: {
    bgEffect: BgEffectETH,
    deactivated: DeactivatedETH,
    outline: OutlineETH,
  },
  SOL: {
    bgEffect: BgEffectSOL,
    deactivated: DeactivatedSOL,
    outline: OutlineSOL,
  },
  USDC: {
    bgEffect: BgEffectUSDC,
    deactivated: DeactivatedUSDC,
    outline: OutlineUSDC,
  },
  USDT: {
    bgEffect: BgEffectUSDT,
    deactivated: DeactivatedUSDT,
    outline: OutlineUSDT,
  },
  LET: {
    bgEffect: BgEffectLET,
    deactivated: DeactivatedLET,
    outline: OutlineLET,
  },
  RAY: {
    bgEffect: BgEffectRAY,
    deactivated: DeactivatedRAY,
    outline: OutlineRAY,
  },
}
