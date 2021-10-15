import { PublicKey, Connection, AccountInfo } from '@solana/web3.js'
import BigNumber from 'bignumber.js'
import { GAUNTLET_PROGRAM_ID } from 'utils/ids'
import { GAUNTLET_USER_LAYOUT } from 'utils/layouts'
import {
  getMultipleAccounts,
  findProgramAddressBulk,
} from 'utils/web3'
import { STRATEGIES } from 'utils/strategies'
import { TOKENS } from 'utils/tokens'
import { User } from 'types'

export const fetchUserState = async (conn: Connection, seed: any): Promise<Array<User>> => {
  const userStateAddressList = await findProgramAddressBulk(seed, new PublicKey(GAUNTLET_PROGRAM_ID))
  const accounts = await getMultipleAccounts(conn, userStateAddressList);
  const filteredAccounts: Array<{ publicKey: PublicKey; account: AccountInfo<Buffer> }> = accounts.filter((a): a is { publicKey: PublicKey; account: AccountInfo<Buffer> } => a !== null)
  return filteredAccounts.map(account => {
    const decodeValue = GAUNTLET_USER_LAYOUT.decode(account.account.data)
    const strategy = STRATEGIES.filter(strategy => strategy.stateAccount === decodeValue.strategy_account.toBase58())
    const rewardToken = Object.keys(TOKENS).find(key => TOKENS[key].mintAddress === strategy[0].strategyTokenMintAccount)
    return {
      stateAccount: account.publicKey.toString(),
      strategyStateAccount: decodeValue.strategy_account.toBase58(),
      vaultStateAccount: decodeValue.vault_account.toBase58(),
      rewardToken: TOKENS[rewardToken!],
      amount: new BigNumber(decodeValue.amount),
      reward: new BigNumber(decodeValue.reward),
      rewardDebt: new BigNumber(decodeValue.rewardDebt),
      totalReward: 0,
      totalRewardInUSD: 0,
      totalApr: 0,
    }
  })
}
