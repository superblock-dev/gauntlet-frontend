import { PublicKey, Connection, AccountInfo } from '@solana/web3.js'

import { GAUNTLET_PROGRAM_ID } from 'utils/ids'
import { GAUNTLET_USER_LAYOUT } from 'utils/layouts'
import {
    getMultipleAccounts,
    findProgramAddressBulk,
} from 'utils/web3'
import { VAULTS } from 'utils/vaults'
import { STRATEGIES } from 'utils/strategies'
import { User } from 'types'

export const fetchUserState = async (conn: Connection, seed: any): Promise<Array<User>> => {
    const userStateAddressList = await findProgramAddressBulk(seed, new PublicKey(GAUNTLET_PROGRAM_ID))
    const accounts = await getMultipleAccounts(conn, userStateAddressList);
    const filteredAccounts: Array<{ publicKey: PublicKey; account: AccountInfo<Buffer> }> = accounts.filter((a): a is { publicKey: PublicKey; account: AccountInfo<Buffer> } => a !== null)
    return filteredAccounts.map(account => {
        const decodeValue = GAUNTLET_USER_LAYOUT.decode(account.account.data)
        const strategy = STRATEGIES.filter(strategy => strategy.stateAccount === decodeValue.strategy_account)
        const rewardToken = strategy[0].strategyTokenSymbol
        const vault = VAULTS.filter(vault => vault.stateAccount === decodeValue.vault_account)
        return {
            stateAccount: account.publicKey.toString(),
            vault: vault[0],
            strategyStateAccount: decodeValue.strategy_account,
            rewardToken: rewardToken,
            amount: 0,
            reward: 0,
            rewardDebt: 0,
            totalReward: 0,
            totalRewardInUSD: 0,
            totalApr: 0,
        }
    })
}