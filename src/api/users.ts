import { PublicKey, Connection, AccountInfo } from '@solana/web3.js'
import BigNumber from 'bignumber.js'
import { GAUNTLET_PROGRAM_ID } from 'utils/ids'
import {
  TOKEN_ACCOUNT_LAYOUT,
  GAUNTLET_USER_LAYOUT,
} from 'utils/layouts'
import {
  getMultipleAccounts,
  findProgramAddressBulk,
  getAssociatedTokenAccount,
} from 'utils/web3'
import { STRATEGIES } from 'utils/strategies'
import { TOKENS, LP_TOKENS} from 'utils/tokens'
import { User } from 'types'
import { TokenAmount } from 'utils/safe-math'
import { VAULTS } from 'utils/vaults'


export const fetchUserState = async (conn: Connection, seed: any): Promise<Array<User>> => {
  const userStateAddressList = await findProgramAddressBulk(seed, new PublicKey(GAUNTLET_PROGRAM_ID))
  const accounts = await getMultipleAccounts(conn, userStateAddressList);
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
      const vault = VAULTS.find(v => v.stateAccount === decodeValue.vault_account.toBase58())
      console.log(account.publicKey.toBase58())
      console.log(address);
      console.log(decodeValue.reward_debt)
      console.log(decodeValue.last_reward_update_time.toNumber())
      console.log(decodeValue.strategy_account.toBase58())
      const rewardToken = Object.keys(TOKENS).find(key => TOKENS[key].mintAddress === strategy!.strategyTokenMintAccount)

      return {
        stateAccount: account.publicKey.toString(),
        strategyStateAccount: decodeValue.strategy_account.toBase58(),
        vaultStateAccount: decodeValue.vault_account.toBase58(),
        rewardToken: TOKENS[rewardToken!],
        amount: new TokenAmount(new BigNumber(decodeValue.amount), vault!.depositToken.decimals),
        reward: new TokenAmount(new BigNumber(decodeValue.reward), TOKENS[rewardToken!].decimals),
        rewardDebt: new BigNumber(decodeValue.reward_debt),
        totalReward: 0,
        totalRewardInUSD: 0,
        totalApr: 0,
      }
    })
}


export const fetchUserDepositAssociatedTokenAccount = async (conn: Connection, owner: PublicKey, mintAddressList: PublicKey[]) => {
  const atas = await getAssociatedTokenAccount(owner, mintAddressList)
  const accounts = await getMultipleAccounts(conn, atas)
  const filteredAccounts = accounts.filter((a): a is { publicKey: PublicKey; account: AccountInfo<Buffer> } => a !== null)
  return filteredAccounts.map(tokenAccount => {
    const decodedValue = TOKEN_ACCOUNT_LAYOUT.decode(tokenAccount.account.data)
    const depositToken = Object.keys(LP_TOKENS).find(key => LP_TOKENS[key].mintAddress === decodedValue.mint.toString())
    return {
      amount: new BigNumber(decodedValue.amount),
      mint: decodedValue.mint,
      depositToken: LP_TOKENS[depositToken!].symbol,
    }
  })
}