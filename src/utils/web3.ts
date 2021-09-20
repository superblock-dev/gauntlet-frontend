import {
  Connection,
  PublicKey,
  Commitment,
  AccountInfo,
} from '@solana/web3.js';

export const web3Config = {
  strategy: 'speed',
  rpcs: [
    { url: 'https://free.rpcpool.com', weight: 10 },
    { url: 'https://api.rpcpool.com', weight: 10 },
    { url: 'https://solana-api.projectserum.com', weight: 10 },
    { url: 'https://raydium.rpcpool.com', weight: 50 },
    { url: 'https://api.mainnet-beta.solana.com', weight: 20 }
  ]
}

// getMultipleAccounts
export async function getMultipleAccounts(
  connection: Connection,
  publicKeys: PublicKey[],
  commitment?: Commitment
): Promise<Array<null | { publicKey: PublicKey; account: AccountInfo<Buffer> }>> {
  const keys: PublicKey[][] = []
  let tempKeys: PublicKey[] = []

  publicKeys.forEach((k) => {
    if (tempKeys.length >= 100) {
      keys.push(tempKeys)
      tempKeys = []
    }
    tempKeys.push(k)
  })
  if (tempKeys.length > 0) {
    keys.push(tempKeys)
  }

  const accounts: Array<null | {
    executable: any
    owner: PublicKey
    lamports: any
    data: Buffer
  }> = []

  const resArray: { [key: number]: any } = {}
  await Promise.all(
    keys.map(async (key, index) => {
      const res = await connection.getMultipleAccountsInfo(key, commitment)
      resArray[index] = res
    })
  )

  Object.keys(resArray)
    .sort((a, b) => parseInt(a) - parseInt(b))
    .forEach((itemIndex) => {
      const res = resArray[parseInt(itemIndex)]
      for (const account of res) {
        accounts.push(account)
      }
    })

  return accounts.map((account, idx) => {
    if (account === null) {
      return null
    }
    return {
      publicKey: publicKeys[idx],
      account
    }
  })
}