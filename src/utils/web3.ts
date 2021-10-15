import {
  Connection,
  PublicKey,
  Commitment,
  AccountInfo,
  Transaction,
  Account,
  SystemProgram,
  TransactionSignature,
  TransactionInstruction
} from '@solana/web3.js';
import { Token } from '@solana/spl-token';
import { struct, u8 } from '@project-serum/borsh'
import { initializeAccount } from '@project-serum/serum/lib/token-instructions';

import {
  ASSOCIATED_TOKEN_PROGRAM_ID, RENT_PROGRAM_ID, SYSTEM_PROGRAM_ID, TOKEN_PROGRAM_ID
} from './ids';
import { ACCOUNT_LAYOUT } from './layouts';

export const web3Config = {
  strategy: 'speed',
  rpcs: [
    { url: 'https://free.rpcpool.com', weight: 10 },
    { url: 'https://api.rpcpool.com', weight: 10 },
    { url: 'https://solana-api.projectserum.com', weight: 10 },
    { url: 'https://raydium.rpcpool.com', weight: 50 },
    // { url: 'https://api.mainnet-beta.solana.com', weight: 20 }
  ]
}

export const commitment: Commitment = 'confirmed'
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
export async function getFilteredProgramAccounts(
  connection: Connection,
  programId: PublicKey,
  filters: any
): Promise<{ publicKey: PublicKey; accountInfo: AccountInfo<Buffer> }[]> {
  // @ts-ignore
  const resp = await connection._rpcRequest('getProgramAccounts', [
    programId.toBase58(),
    {
      commitment: connection.commitment,
      filters,
      encoding: 'base64'
    }
  ])
  if (resp.error) {
    throw new Error(resp.error.message)
  }
  // @ts-ignore
  return resp.result.map(({ pubkey, account: { data, executable, owner, lamports } }) => ({
    publicKey: new PublicKey(pubkey),
    accountInfo: {
      data: Buffer.from(data[0], 'base64'),
      executable,
      owner: new PublicKey(owner),
      lamports
    }
  }))
}

export async function getFilteredProgramAccountsAmmOrMarketCache(
  cacheName: String,
  connection: Connection,
  programId: PublicKey,
  filters: any
): Promise<{ publicKey: PublicKey; accountInfo: AccountInfo<Buffer> }[]> {
  try {
    if (!cacheName) {
      throw new Error('cacheName error')
    }

    const resp = await (await fetch('https://api.raydium.io/cache/rpc/' + cacheName)).json()
    if (resp.error) {
      throw new Error(resp.error.message)
    }
    // @ts-ignore
    return resp.result.map(({ pubkey, account: { data, executable, owner, lamports } }) => ({
      publicKey: new PublicKey(pubkey),
      accountInfo: {
        data: Buffer.from(data[0], 'base64'),
        executable,
        owner: new PublicKey(owner),
        lamports
      }
    }))
  } catch (e) {
    return getFilteredProgramAccounts(connection, programId, filters)
  }
}

export async function findProgramAddress(seeds: Array<Buffer | Uint8Array>, programId: PublicKey) {
  const [publicKey, nonce] = await PublicKey.findProgramAddress(seeds, programId)
  return { publicKey, nonce }
}

export async function findProgramAddressBulk(seedsArray: Array<Buffer | Uint8Array>[], programId: PublicKey): Promise<Array<PublicKey>> {
  const data = await Promise.all(
    seedsArray.map(async seeds => {
      const { publicKey } = await findProgramAddress(seeds, programId)
      return publicKey
    })
  )
  return data
}

export async function createAmmAuthority(programId: PublicKey) {
  return await findProgramAddress(
    [new Uint8Array(Buffer.from('amm authority'.replace('\u00A0', ' '), 'utf-8'))],
    programId
  )
}

export async function createTokenAccountIfNotExist(
  connection: Connection,
  account: string | undefined | null,
  owner: PublicKey,
  mintAddress: string,
  lamports: number | null,

  transaction: Transaction,
  signer: Array<Account>
) {
  let publicKey

  if (account) {
    publicKey = new PublicKey(account)
  } else {
    publicKey = await createProgramAccountIfNotExist(
      connection,
      account,
      owner,
      TOKEN_PROGRAM_ID,
      lamports,
      ACCOUNT_LAYOUT,
      transaction,
      signer
    )

    transaction.add(
      initializeAccount({
        account: publicKey,
        mint: new PublicKey(mintAddress),
        owner
      })
    )
  }

  return publicKey
}

export async function createAssociatedTokenAccountIfNotExist(
  connection: Connection,
  owner: PublicKey,
  mintAddress: PublicKey,

  transaction: Transaction,
) {
  const depositorRewardTokenAccount = await findAssociatedTokenAddress(owner, mintAddress)
  const accountInfo = await connection.getAccountInfo(depositorRewardTokenAccount)
  if (accountInfo == null) {
    transaction.add(
      Token.createAssociatedTokenAccountInstruction(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        mintAddress,
        depositorRewardTokenAccount,
        owner,
        owner
      )
    )
  }

  return depositorRewardTokenAccount
}

export async function createProgramAccountIfNotExist(
  connection: Connection,
  account: string | undefined | null,
  owner: PublicKey,
  programId: PublicKey,
  lamports: number | null,
  layout: any,

  transaction: Transaction,
  signer: Array<Account>
) {
  let publicKey

  if (account) {
    publicKey = new PublicKey(account)
  } else {
    const newAccount = new Account()
    publicKey = newAccount.publicKey

    transaction.add(
      SystemProgram.createAccount({
        fromPubkey: owner,
        newAccountPubkey: publicKey,
        lamports: lamports ?? (await connection.getMinimumBalanceForRentExemption(layout.span)),
        space: layout.span,
        programId
      })
    )

    signer.push(newAccount)
  }

  return publicKey
}

export async function createGauntletUserAccountIfNotExist(
  connection: Connection,
  vaultAccount: PublicKey,
  depositor: PublicKey,
  strategyAccount: PublicKey,
  gauntletProgramId: PublicKey,
  transaction: Transaction,
) {
  const depositorUserAccount = await PublicKey.findProgramAddress([
    vaultAccount.toBuffer(),
    depositor.toBuffer(),
    strategyAccount.toBuffer(),
  ], gauntletProgramId);
  const depositorUserAccountPubkey = depositorUserAccount[0]
  const accountInfo = await connection.getAccountInfo(depositorUserAccountPubkey)
  if (accountInfo == null) {
    const createKeys = [
      { pubkey: depositor, isSigner: true, isWritable: false },
      { pubkey: vaultAccount, isSigner: false, isWritable: false },
      { pubkey: strategyAccount, isSigner: false, isWritable: false },
      { pubkey: depositorUserAccountPubkey, isSigner: false, isWritable: true },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    ]
    const createDataLayout = struct([u8('instruction')])
    const createtData = Buffer.alloc(createDataLayout.span)
    createDataLayout.encode(
      {
        instruction: 12,
      },
      createtData
    )
    const createInstruction = new TransactionInstruction({
      keys: createKeys,
      programId: gauntletProgramId,
      data: createtData
    })
    transaction.add(createInstruction);
  }
  return depositorUserAccountPubkey
}

export async function getGauntletUserAccount(
  vaultAccount: PublicKey,
  depositor: PublicKey,
  strategyAccount: PublicKey,
  gauntletProgramId: PublicKey,
) {
  const depositorUserAccount = await PublicKey.findProgramAddress([
    vaultAccount.toBuffer(),
    depositor.toBuffer(),
    strategyAccount.toBuffer(),
  ], gauntletProgramId);
  const depositorUserAccountPubkey = depositorUserAccount[0]
  return depositorUserAccountPubkey
}

export async function findAssociatedTokenAddress(walletAddress: PublicKey, tokenMintAddress: PublicKey) {
  const { publicKey } = await findProgramAddress(
    [walletAddress.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), tokenMintAddress.toBuffer()],
    ASSOCIATED_TOKEN_PROGRAM_ID
  )
  return publicKey
}

export async function createAssociatedTokenAccount(
  tokenMintAddress: PublicKey,
  owner: PublicKey,
  transaction: Transaction
) {
  const associatedTokenAddress = await findAssociatedTokenAddress(owner, tokenMintAddress)

  const keys = [
    {
      pubkey: owner,
      isSigner: true,
      isWritable: true
    },
    {
      pubkey: associatedTokenAddress,
      isSigner: false,
      isWritable: true
    },
    {
      pubkey: owner,
      isSigner: false,
      isWritable: false
    },
    {
      pubkey: tokenMintAddress,
      isSigner: false,
      isWritable: false
    },
    {
      pubkey: SYSTEM_PROGRAM_ID,
      isSigner: false,
      isWritable: false
    },
    {
      pubkey: TOKEN_PROGRAM_ID,
      isSigner: false,
      isWritable: false
    },
    {
      pubkey: RENT_PROGRAM_ID,
      isSigner: false,
      isWritable: false
    }
  ]

  transaction.add(
    new TransactionInstruction({
      keys,
      programId: ASSOCIATED_TOKEN_PROGRAM_ID,
      data: Buffer.from([])
    })
  )

  return associatedTokenAddress
}

export async function sendTransaction(
  connection: Connection,
  wallet: any,
  transaction: Transaction,
  signers: Array<Account> = []
) {
  const txid: TransactionSignature = await wallet.sendTransaction(transaction, connection, {
    signers,
    skipPreflight: true,
    preflightCommitment: commitment
  })

  return txid
}