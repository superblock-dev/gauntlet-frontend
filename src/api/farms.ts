import axios from 'axios';
import { PublicKey, Connection } from '@solana/web3.js';
import { cloneDeep } from 'lodash';

import { TokenAmount } from 'utils/safe-math';
import { getMultipleAccounts } from 'utils/web3';
import {
  getBigNumber,
  STAKE_INFO_LAYOUT_V4,
  STAKE_INFO_LAYOUT,
  TOKEN_ACCOUNT_LAYOUT,
} from 'utils/layouts';
import { FARMS, getAddressForWhat } from 'utils/farms';

export const requestFarmInfo = async (conn: Connection) => {
  const farms = {} as any
  const publicKeys = [] as any

  FARMS.forEach((farm) => {
    const { lp, poolId, poolLpTokenAccount } = farm

    publicKeys.push(new PublicKey(poolId), new PublicKey(poolLpTokenAccount))

    const farmInfo = cloneDeep(farm)

    farmInfo.lp.balance = new TokenAmount(0, lp.decimals)

    farms[poolId] = farmInfo
  })

  const multipleInfo = await getMultipleAccounts(conn, publicKeys, "confirmed")
  multipleInfo.forEach((info) => {
    if (info) {
      const address = info.publicKey.toBase58()
      const data = Buffer.from(info.account.data)

      const { key, poolId } = getAddressForWhat(address);

      if (key && poolId) {
        const farmInfo = farms[poolId]

        switch (key) {
          // pool info
          case 'poolId': {
            let parsed

            if ([4, 5].includes(farmInfo.version)) {
              parsed = STAKE_INFO_LAYOUT_V4.decode(data)
            } else {
              parsed = STAKE_INFO_LAYOUT.decode(data)
            }

            farmInfo.poolInfo = parsed

            break
          }
          // staked balance
          case 'poolLpTokenAccount': {
            const parsed = TOKEN_ACCOUNT_LAYOUT.decode(data)

            farmInfo.lp.balance.wei = farmInfo.lp.balance.wei.plus(getBigNumber(parsed.amount))

            break
          }
        }
      }
    }
  })
  return farms;
}
