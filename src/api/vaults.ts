import { PublicKey, Connection } from '@solana/web3.js'
import BigNumber from 'bignumber.js'
import { GAUNTLET_VAULT_LAYOUT } from 'utils/layouts'
import {
  getMultipleAccounts,
} from 'utils/web3'
import { Vault } from 'types'
import { VAULTS } from 'utils/vaults'
import { TokenAmount } from 'utils/safe-math'

const denominator = new BigNumber(2).pow(64);

// : Promise<Vault[]> 
export const requestVaultsState = async (conn: Connection) => {
  const publicKeys = [] as any

  VAULTS.forEach(v => {
    const { stateAccount } = v;
    publicKeys.push(new PublicKey(stateAccount))
  })

  const vaults = await getMultipleAccounts(conn, publicKeys, 'confirmed');
  const newVaults: Vault[] = vaults.map((vault, idx) => {
    const v = VAULTS[idx];
    if (vault) {
      const data = vault.account.data
      const decodedValue = GAUNTLET_VAULT_LAYOUT.decode(data);
      return {
        ...v,
        totalDepositAmount: new TokenAmount(new BigNumber(decodedValue.total_deposit_amount), v.depositToken.decimals),
        // @ts-ignore
        accPerShares: decodedValue.accumulated_reward_per_shares.map((i) => new BigNumber(i).dividedBy(denominator))
      }
    }
    return v
  })

  console.log("New vaults: ", newVaults)

  return newVaults
}
