import BigNumber from 'bignumber.js';
import { PublicKey, Connection } from '@solana/web3.js';
import { cloneDeep } from 'lodash';
import { getAddressForWhat, LiquidityPoolInfo, LIQUIDITY_POOLS } from 'utils/pools';
import { TokenAmount } from 'utils/safe-math';
import { getMultipleAccounts } from 'utils/web3';
import { 
  getBigNumber, 
  TOKEN_ACCOUNT_LAYOUT, 
  AMM_INFO_LAYOUT_V4, 
  MINT_LAYOUT,
} from 'utils/layouts';


export const requestLiquidityInfo = async (conn: Connection) => {
  const liquidityPools = {} as any
  const publicKeys = [] as any

  Object.keys(LIQUIDITY_POOLS).forEach((key) => {
    const pool = LIQUIDITY_POOLS[key]
    const { poolCoinTokenAccount, poolPcTokenAccount, ammId, coin, pc, lp } = pool;

    publicKeys.push(
      new PublicKey(poolCoinTokenAccount),
      new PublicKey(poolPcTokenAccount),
      new PublicKey(ammId),
      new PublicKey(lp.mintAddress)
    );

    const poolInfo = cloneDeep(pool);

    poolInfo.target = key
    poolInfo.coin.balance = new TokenAmount(0, coin.decimals)
    poolInfo.pc.balance = new TokenAmount(0, pc.decimals)

    liquidityPools[lp.mintAddress] = poolInfo
  });

  const multipleInfo = await getMultipleAccounts(conn, publicKeys, "confirmed");

  multipleInfo.forEach((info) => {
    if (info) {
      const address = info.publicKey.toBase58()
      const data = Buffer.from(info.account.data)

      const { key, lpMintAddress, version } = getAddressForWhat(address)

      if (key && lpMintAddress) {
        const poolInfo = liquidityPools[lpMintAddress]

        switch (key) {
          case 'poolCoinTokenAccount': {
            const parsed = TOKEN_ACCOUNT_LAYOUT.decode(data)
            // quick fix: Number can only safely store up to 53 bits
            poolInfo.coin.balance.wei = poolInfo.coin.balance.wei.plus(getBigNumber(parsed.amount))

            break
          }
          case 'poolPcTokenAccount': {
            const parsed = TOKEN_ACCOUNT_LAYOUT.decode(data)

            poolInfo.pc.balance.wei = poolInfo.pc.balance.wei.plus(getBigNumber(parsed.amount))

            break
          }
          case 'ammId': {
            let parsed = AMM_INFO_LAYOUT_V4.decode(data)

            const { swapFeeNumerator, swapFeeDenominator } = parsed
            poolInfo.fees = {
              swapFeeNumerator: getBigNumber(swapFeeNumerator),
              swapFeeDenominator: getBigNumber(swapFeeDenominator)
            }

            const { status, needTakePnlCoin, needTakePnlPc } = parsed
            poolInfo.status = getBigNumber(status)
            poolInfo.coin.balance.wei = poolInfo.coin.balance.wei.minus(getBigNumber(needTakePnlCoin))
            poolInfo.pc.balance.wei = poolInfo.pc.balance.wei.minus(getBigNumber(needTakePnlPc))

            break
          }
          // getLpSupply
          case 'lpMintAddress': {
            const parsed = MINT_LAYOUT.decode(data)

            poolInfo.lp.totalSupply = new TokenAmount(getBigNumber(parsed.supply), poolInfo.lp.decimals)

            break
          }
        }
      }
    }
  })

  return liquidityPools;
}

export const requestFarmInfo = async (conn: Connection) => {

}
