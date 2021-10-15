import { bool, publicKey, struct, u128, u32, u64, u8, vec, array, i64 } from '@project-serum/borsh'
// @ts-ignore
import { blob } from 'buffer-layout';

// https://github.com/solana-labs/solana-program-library/blob/master/token/js/client/token.js#L210
export const TOKEN_ACCOUNT_LAYOUT = struct([
  publicKey('mint'),
  publicKey('owner'),
  u64('amount'),
  u32('delegateOption'),
  publicKey('delegate'),
  u8('state'),
  u32('isNativeOption'),
  u64('isNative'),
  u64('delegatedAmount'),
  u32('closeAuthorityOption'),
  publicKey('closeAuthority')
])

export const ACCOUNT_LAYOUT = struct([
  publicKey('mint'),
  publicKey('owner'),
  u64('amount'),
  u32('delegateOption'),
  publicKey('delegate'),
  u8('state'),
  u32('isNativeOption'),
  u64('isNative'),
  u64('delegatedAmount'),
  u32('closeAuthorityOption'),
  publicKey('closeAuthority')
])

export const MINT_LAYOUT = struct([
  u32('mintAuthorityOption'),
  publicKey('mintAuthority'),
  u64('supply'),
  u8('decimals'),
  bool('initialized'),
  u32('freezeAuthorityOption'),
  publicKey('freezeAuthority')
])

export function getBigNumber(num: any) {
  return parseFloat(num.toString())
}

export const AMM_INFO_LAYOUT = struct([
  u64('status'),
  u64('nonce'),
  u64('orderNum'),
  u64('depth'),
  u64('coinDecimals'),
  u64('pcDecimals'),
  u64('state'),
  u64('resetFlag'),
  u64('fee'),
  u64('minSize'),
  u64('volMaxCutRatio'),
  u64('pnlRatio'),
  u64('amountWaveRatio'),
  u64('coinLotSize'),
  u64('pcLotSize'),
  u64('minPriceMultiplier'),
  u64('maxPriceMultiplier'),
  u64('needTakePnlCoin'),
  u64('needTakePnlPc'),
  u64('totalPnlX'),
  u64('totalPnlY'),
  u64('systemDecimalsValue'),
  publicKey('poolCoinTokenAccount'),
  publicKey('poolPcTokenAccount'),
  publicKey('coinMintAddress'),
  publicKey('pcMintAddress'),
  publicKey('lpMintAddress'),
  publicKey('ammOpenOrders'),
  publicKey('serumMarket'),
  publicKey('serumProgramId'),
  publicKey('ammTargetOrders'),
  publicKey('ammQuantities'),
  publicKey('poolWithdrawQueue'),
  publicKey('poolTempLpTokenAccount'),
  publicKey('ammOwner'),
  publicKey('pnlOwner')
])

export const AMM_INFO_LAYOUT_V3 = struct([
  u64('status'),
  u64('nonce'),
  u64('orderNum'),
  u64('depth'),
  u64('coinDecimals'),
  u64('pcDecimals'),
  u64('state'),
  u64('resetFlag'),
  u64('fee'),
  u64('min_separate'),
  u64('minSize'),
  u64('volMaxCutRatio'),
  u64('pnlRatio'),
  u64('amountWaveRatio'),
  u64('coinLotSize'),
  u64('pcLotSize'),
  u64('minPriceMultiplier'),
  u64('maxPriceMultiplier'),
  u64('needTakePnlCoin'),
  u64('needTakePnlPc'),
  u64('totalPnlX'),
  u64('totalPnlY'),
  u64('poolTotalDepositPc'),
  u64('poolTotalDepositCoin'),
  u64('systemDecimalsValue'),
  publicKey('poolCoinTokenAccount'),
  publicKey('poolPcTokenAccount'),
  publicKey('coinMintAddress'),
  publicKey('pcMintAddress'),
  publicKey('lpMintAddress'),
  publicKey('ammOpenOrders'),
  publicKey('serumMarket'),
  publicKey('serumProgramId'),
  publicKey('ammTargetOrders'),
  publicKey('ammQuantities'),
  publicKey('poolWithdrawQueue'),
  publicKey('poolTempLpTokenAccount'),
  publicKey('ammOwner'),
  publicKey('pnlOwner'),
  publicKey('srmTokenAccount')
])

export const AMM_INFO_LAYOUT_V4 = struct([
  u64('status'),
  u64('nonce'),
  u64('orderNum'),
  u64('depth'),
  u64('coinDecimals'),
  u64('pcDecimals'),
  u64('state'),
  u64('resetFlag'),
  u64('minSize'),
  u64('volMaxCutRatio'),
  u64('amountWaveRatio'),
  u64('coinLotSize'),
  u64('pcLotSize'),
  u64('minPriceMultiplier'),
  u64('maxPriceMultiplier'),
  u64('systemDecimalsValue'),
  // Fees
  u64('minSeparateNumerator'),
  u64('minSeparateDenominator'),
  u64('tradeFeeNumerator'),
  u64('tradeFeeDenominator'),
  u64('pnlNumerator'),
  u64('pnlDenominator'),
  u64('swapFeeNumerator'),
  u64('swapFeeDenominator'),
  // OutPutData
  u64('needTakePnlCoin'),
  u64('needTakePnlPc'),
  u64('totalPnlPc'),
  u64('totalPnlCoin'),
  u128('poolTotalDepositPc'),
  u128('poolTotalDepositCoin'),
  u128('swapCoinInAmount'),
  u128('swapPcOutAmount'),
  u64('swapCoin2PcFee'),
  u128('swapPcInAmount'),
  u128('swapCoinOutAmount'),
  u64('swapPc2CoinFee'),

  publicKey('poolCoinTokenAccount'),
  publicKey('poolPcTokenAccount'),
  publicKey('coinMintAddress'),
  publicKey('pcMintAddress'),
  publicKey('lpMintAddress'),
  publicKey('ammOpenOrders'),
  publicKey('serumMarket'),
  publicKey('serumProgramId'),
  publicKey('ammTargetOrders'),
  publicKey('poolWithdrawQueue'),
  publicKey('poolTempLpTokenAccount'),
  publicKey('ammOwner'),
  publicKey('pnlOwner')
])

export const STAKE_INFO_LAYOUT = struct([
  u64('state'),
  u64('nonce'),
  publicKey('poolLpTokenAccount'),
  publicKey('poolRewardTokenAccount'),
  publicKey('owner'),
  publicKey('feeOwner'),
  u64('feeY'),
  u64('feeX'),
  u64('totalReward'),
  u128('rewardPerShareNet'),
  u64('lastBlock'),
  u64('rewardPerBlock')
])

export const STAKE_INFO_LAYOUT_V4 = struct([
  u64('state'),
  u64('nonce'),
  publicKey('poolLpTokenAccount'),
  publicKey('poolRewardTokenAccount'),
  u64('totalReward'),
  u128('perShare'),
  u64('perBlock'),
  u8('option'),
  publicKey('poolRewardTokenAccountB'),
  blob(7),
  u64('totalRewardB'),
  u128('perShareB'),
  u64('perBlockB'),
  u64('lastBlock'),
  publicKey('owner')
])

export const USER_STAKE_INFO_ACCOUNT_LAYOUT = struct([
  u64('state'),
  publicKey('poolId'),
  publicKey('stakerOwner'),
  u64('depositBalance'),
  u64('rewardDebt')
])

export const USER_STAKE_INFO_ACCOUNT_LAYOUT_V4 = struct([
  u64('state'),
  publicKey('poolId'),
  publicKey('stakerOwner'),
  u64('depositBalance'),
  u64('rewardDebt'),
  u64('rewardDebtB')
])

export const GAUNTLET_STATUS_LAYOUT = struct([
  bool('is_initialized'),
  publicKey('admin'),
  u8('strategies_len'),
  u8('vaults_len'),
  publicKey('usdc_token_account'),
])

export const GAUNTLET_FEE_LAYOUT = struct([
  u64('performance_fee_numerator'),
  u64('performance_fee_denominator'),
  u64('withdrawal_fee_numerator'),
  u64('withdrawal_fee_denominator'),
])

export const GAUNTLET_VAULT_LAYOUT = struct([
  bool('is_initialized'),
  u8('index'),
  u8('status'),
  blob(GAUNTLET_FEE_LAYOUT.span, 'fees'),
  publicKey('gauntlet_state_account'),
  publicKey('deposit_token_account'),
  publicKey('reward_token_account'),
  publicKey('reward_token_b_account'),
  publicKey('withdraw_fee_account'),
  u64('total_deposit_amount'),
  array(u64(), 50, 'deposit_amounts'),
  array(u64(), 50, 'reward_token_remain_amounts'),
  array(u64(), 50, 'reward_token_b_remain_amounts'),
  array(u64(), 50, 'usdc_token_amounts'),
  array(u128(), 50, 'accumulated_reward_per_shares'),
  i64('last_reward_update_time'),
  publicKey('raydium_state_account'),
])

export const GAUNTLET_VAULT_STRATEGY_LAYOUT = struct([
  bool('is_initialized'),
  publicKey('vault_account'),
  vec(bool('length'), 'availabilities'),
  vec(u64('length'), 'strategy_token_amounts'),
])

export const GAUNTLET_STRATEGY_LAYOUT = struct([
  bool('is_initialized'),
  u8('index'),
  publicKey('gauntlet_state_account'),
  publicKey('admin'),
  publicKey('performance_fee_account'),
  u8('status'),
  i64('last_reward_update_time'),
  u64('total_deposit_amount'),
  array(u64('deposit_amounts'), 50),
  publicKey('strategy_token_account'),
])

export const GAUNTLET_USER_LAYOUT = struct([
  bool('is_initialized'),
  publicKey('user'),
  publicKey('vault_account'),
  publicKey('strategy_account'),
  u64('amount'),
  u64('reward'),
  u64('reward_debt'),
  u8('user_status'),
  i64('last_reward_update_time'),
])