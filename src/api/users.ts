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
import { TokenAmount } from 'utils/safe-math'

export const fetchUserState = async (conn: Connection, seed: any): Promise<Array<User>> => {
  const userStateAddressList = await findProgramAddressBulk(seed, new PublicKey(GAUNTLET_PROGRAM_ID))
  const accounts = await getMultipleAccounts(conn, userStateAddressList);
  console.log(accounts)
  const filteredAccounts: Array<{ publicKey: PublicKey; account: AccountInfo<Buffer> }> = accounts.filter((a): a is { publicKey: PublicKey; account: AccountInfo<Buffer> } => a !== null)
  return filteredAccounts
    .filter(account => {
      const decodeValue = GAUNTLET_USER_LAYOUT.decode(account.account.data)
      return decodeValue.is_initialized
    })
    .map(account => {
      const decodeValue = GAUNTLET_USER_LAYOUT.decode(account.account.data)
      const address = decodeValue.strategy_account.toBase58()
      const strategy = STRATEGIES.find(strategy => strategy.stateAccount === address)
      console.log(account.publicKey.toBase58())
      console.log(address);
      console.log(decodeValue)
      console.log(decodeValue.last_reward_update_time.toNumber())
      console.log(decodeValue.strategy_account.toBase58())
      const rewardToken = Object.keys(TOKENS).find(key => TOKENS[key].mintAddress === strategy!.strategyTokenMintAccount)

      return {
        stateAccount: account.publicKey.toString(),
        strategyStateAccount: decodeValue.strategy_account.toBase58(),
        vaultStateAccount: decodeValue.vault_account.toBase58(),
        rewardToken: TOKENS[rewardToken!],
        amount: new TokenAmount(new BigNumber(decodeValue.amount), TOKENS[rewardToken!].decimals),
        reward: new TokenAmount(new BigNumber(decodeValue.reward), TOKENS[rewardToken!].decimals),
        rewardDebt: new BigNumber(decodeValue.reward_debt),
        totalReward: 0,
        totalRewardInUSD: 0,
        totalApr: 0,
      }
    })
}
