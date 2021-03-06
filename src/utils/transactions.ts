// @ts-ignore
import { nu64, struct, u8 } from 'buffer-layout';
import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
  SYSVAR_CLOCK_PUBKEY,
} from '@solana/web3.js';

import { Farm, Strategy, Vault } from 'types';
import { LiquidityPoolInfo } from 'utils/pools';
import {
  TOKEN_PROGRAM_ID,
  GAUNTLET_PROGRAM_ID,
  GAUNTLET_STATE_ACCOUNT,
  GAUNTLET_USDC_TOKEN_ACCOUNT,
  GAUNTLET_PDA_ACCOUNT,
} from 'utils/ids';
import {
  createAssociatedTokenAccountIfNotExist,
  createGauntletUserAccountIfNotExist,
  findAssociatedTokenAddress,
  getGauntletUserAccount,
} from 'utils/web3';

export async function harvest(
  connection: Connection | undefined | null,
  owner: PublicKey,
  vaultInfo: Vault,
  strategyInfo: Strategy,
  farmInfo: Farm,
): Promise<Transaction> {
  if (!connection) throw Error("HARVEST: Connection failed")

  const transaction = new Transaction()

  const depositorUserAccount = await createGauntletUserAccountIfNotExist(
    connection,
    new PublicKey(vaultInfo.stateAccount),
    owner,
    new PublicKey(strategyInfo.stateAccount),
    new PublicKey(GAUNTLET_PROGRAM_ID),
    transaction
  )
  transaction.add(
    harvestInstruction(
      new PublicKey(GAUNTLET_PROGRAM_ID),
      owner,
      new PublicKey(GAUNTLET_STATE_ACCOUNT),
      depositorUserAccount,
      new PublicKey(vaultInfo.stateAccount),
      new PublicKey(vaultInfo.vaultStrategyAccount),
      new PublicKey(farmInfo.programId),
      new PublicKey(farmInfo.poolId),
      new PublicKey(farmInfo.poolAuthority),
      new PublicKey(vaultInfo.vaultRaydiumStateAccount),
      new PublicKey(GAUNTLET_PDA_ACCOUNT),
      new PublicKey(vaultInfo.vaultDepositTokenAccount),
      new PublicKey(farmInfo.poolLpTokenAccount),
      new PublicKey(vaultInfo.farmRewardTokenAccount),
      new PublicKey(farmInfo.poolRewardTokenAccount),
    )
  )
  let { blockhash } = await connection.getRecentBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = owner;
  return transaction
}

export async function harvestV4(
  connection: Connection | undefined | null,
  owner: PublicKey,
  vaultInfo: Vault,
  strategyInfo: Strategy,
  farmInfo: Farm,
): Promise<Transaction> {
  if (!connection) throw Error("HARVEST V4: Connection failed")

  const transaction = new Transaction()

  if (!vaultInfo.farmRewardTokenAccountB) throw Error("HARVEST V4: Not dual yield vault")
  if (!farmInfo.poolRewardTokenAccountB) throw Error("HARVEST V4: Not dual yield farm")

  const depositorUserAccount = await createGauntletUserAccountIfNotExist(
    connection,
    new PublicKey(vaultInfo.stateAccount),
    owner,
    new PublicKey(strategyInfo.stateAccount),
    new PublicKey(GAUNTLET_PROGRAM_ID),
    transaction
  )
  transaction.add(
    harvestInstructionV4(
      new PublicKey(GAUNTLET_PROGRAM_ID),
      owner,
      new PublicKey(GAUNTLET_STATE_ACCOUNT),
      depositorUserAccount,
      new PublicKey(vaultInfo.stateAccount),
      new PublicKey(vaultInfo.vaultStrategyAccount),
      new PublicKey(farmInfo.programId),
      new PublicKey(farmInfo.poolId),
      new PublicKey(farmInfo.poolAuthority),
      new PublicKey(vaultInfo.vaultRaydiumStateAccount),
      new PublicKey(GAUNTLET_PDA_ACCOUNT),
      new PublicKey(vaultInfo.vaultDepositTokenAccount),
      new PublicKey(farmInfo.poolLpTokenAccount),
      new PublicKey(vaultInfo.farmRewardTokenAccount),
      new PublicKey(farmInfo.poolRewardTokenAccount),
      new PublicKey(vaultInfo.farmRewardTokenAccountB),
      new PublicKey(farmInfo.poolRewardTokenAccountB),
    )
  )
  let { blockhash } = await connection.getRecentBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = owner;
  return transaction
}

export async function swapRewardToUsdc(
  connection: Connection | undefined | null,
  owner: PublicKey,
  vaultInfo: Vault,
  strategyInfo: Strategy,
  poolInfo: LiquidityPoolInfo,
  secondReward: boolean,
): Promise<Transaction> {
  if (!connection) throw Error("SWAP TO USDC: Connection failed")

  const transaction = new Transaction()

  if (!poolInfo.serumBids || !poolInfo.serumAsks || !poolInfo.serumEventQueue) {
    throw Error("SWAP TO USDC: Serum related infos not found")
  }

  const depositorUserAccount = await getGauntletUserAccount(
    new PublicKey(vaultInfo.stateAccount),
    owner,
    new PublicKey(strategyInfo.stateAccount),
    new PublicKey(GAUNTLET_PROGRAM_ID)
  );
  let vaultRewardTokenAccount = vaultInfo.farmRewardTokenAccount
  if (secondReward) {
    if (!vaultInfo.farmRewardTokenAccountB) throw new Error('Miss infomations');
    vaultRewardTokenAccount = vaultInfo.farmRewardTokenAccountB;
  }
  transaction.add(
    swapRewardToUsdcInstruction(
      new PublicKey(GAUNTLET_PROGRAM_ID),
      owner,
      new PublicKey(GAUNTLET_STATE_ACCOUNT),
      depositorUserAccount,
      new PublicKey(vaultInfo.stateAccount),
      new PublicKey(vaultInfo.vaultStrategyAccount),
      new PublicKey(strategyInfo.stateAccount),
      new PublicKey(poolInfo.programId),
      new PublicKey(poolInfo.ammId),
      new PublicKey(poolInfo.ammAuthority),
      new PublicKey(poolInfo.ammOpenOrders),
      new PublicKey(poolInfo.ammTargetOrders),
      new PublicKey(poolInfo.poolCoinTokenAccount),
      new PublicKey(poolInfo.poolPcTokenAccount),
      new PublicKey(poolInfo.serumProgramId),
      new PublicKey(poolInfo.serumMarket),
      new PublicKey(poolInfo.serumBids),
      new PublicKey(poolInfo.serumAsks),
      new PublicKey(poolInfo.serumEventQueue),
      new PublicKey(poolInfo.serumCoinVaultAccount),
      new PublicKey(poolInfo.serumPcVaultAccount),
      new PublicKey(poolInfo.serumVaultSigner),
      new PublicKey(vaultRewardTokenAccount),
      new PublicKey(GAUNTLET_USDC_TOKEN_ACCOUNT),
      new PublicKey(GAUNTLET_PDA_ACCOUNT),
    )
  )
  let { blockhash } = await connection.getRecentBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = owner;
  return transaction
}

export async function swapUsdcToStrategy(
  connection: Connection | undefined | null,
  owner: PublicKey,
  vaultInfo: Vault,
  strategyInfo: Strategy,
  poolInfo: LiquidityPoolInfo,
): Promise<Transaction> {
  if (!connection) throw Error("SWAP TO STRATEGY: Connection failed")

  const transaction = new Transaction()

  if (!poolInfo.serumBids || !poolInfo.serumAsks || !poolInfo.serumEventQueue) {
    throw Error("SWAP TO STRATEGY: Serum related infos not found")
  }

  const depositorUserAccount = await getGauntletUserAccount(
    new PublicKey(vaultInfo.stateAccount),
    owner,
    new PublicKey(strategyInfo.stateAccount),
    new PublicKey(GAUNTLET_PROGRAM_ID)
  );
  transaction.add(
    swapUsdcToStrategyInstruction(
      new PublicKey(GAUNTLET_PROGRAM_ID),
      owner,
      new PublicKey(GAUNTLET_STATE_ACCOUNT),
      depositorUserAccount,
      new PublicKey(vaultInfo.stateAccount),
      new PublicKey(vaultInfo.vaultStrategyAccount),
      new PublicKey(strategyInfo.stateAccount),
      new PublicKey(poolInfo.programId),
      new PublicKey(poolInfo.ammId),
      new PublicKey(poolInfo.ammAuthority),
      new PublicKey(poolInfo.ammOpenOrders),
      new PublicKey(poolInfo.ammTargetOrders),
      new PublicKey(poolInfo.poolCoinTokenAccount),
      new PublicKey(poolInfo.poolPcTokenAccount),
      new PublicKey(poolInfo.serumProgramId),
      new PublicKey(poolInfo.serumMarket),
      new PublicKey(poolInfo.serumBids),
      new PublicKey(poolInfo.serumAsks),
      new PublicKey(poolInfo.serumEventQueue),
      new PublicKey(poolInfo.serumCoinVaultAccount),
      new PublicKey(poolInfo.serumPcVaultAccount),
      new PublicKey(poolInfo.serumVaultSigner),
      new PublicKey(GAUNTLET_USDC_TOKEN_ACCOUNT),
      new PublicKey(strategyInfo.strategyTokenAccount),
      new PublicKey(GAUNTLET_PDA_ACCOUNT),
    )
  )
  let { blockhash } = await connection.getRecentBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = owner;
  return transaction
}

export async function swapRewardToStrategy(
  connection: Connection | undefined | null,
  owner: PublicKey,
  vaultInfo: Vault,
  strategyInfo: Strategy,
  poolInfo: LiquidityPoolInfo,
  secondReward: boolean,
): Promise<Transaction> {
  if (!connection) throw Error("SWAP TO STRATEGY: Connection failed")

  const transaction = new Transaction()

  if (!poolInfo.serumBids || !poolInfo.serumAsks || !poolInfo.serumEventQueue) {
    throw Error("SWAP TO STRATEGY: Serum related infos not found")
  }

  const depositorUserAccount = await getGauntletUserAccount(
    new PublicKey(vaultInfo.stateAccount),
    owner,
    new PublicKey(strategyInfo.stateAccount),
    new PublicKey(GAUNTLET_PROGRAM_ID)
  );
  let vaultRewardTokenAccount = vaultInfo.farmRewardTokenAccount
  if (secondReward) {
    if (!vaultInfo.farmRewardTokenAccountB) throw new Error('Miss infomations');
    vaultRewardTokenAccount = vaultInfo.farmRewardTokenAccountB;
  }
  transaction.add(
    swapRewardToStrategyInstruction(
      new PublicKey(GAUNTLET_PROGRAM_ID),
      owner,
      new PublicKey(GAUNTLET_STATE_ACCOUNT),
      depositorUserAccount,
      new PublicKey(vaultInfo.stateAccount),
      new PublicKey(vaultInfo.vaultStrategyAccount),
      new PublicKey(strategyInfo.stateAccount),
      new PublicKey(poolInfo.programId),
      new PublicKey(poolInfo.ammId),
      new PublicKey(poolInfo.ammAuthority),
      new PublicKey(poolInfo.ammOpenOrders),
      new PublicKey(poolInfo.ammTargetOrders),
      new PublicKey(poolInfo.poolCoinTokenAccount),
      new PublicKey(poolInfo.poolPcTokenAccount),
      new PublicKey(poolInfo.serumProgramId),
      new PublicKey(poolInfo.serumMarket),
      new PublicKey(poolInfo.serumBids),
      new PublicKey(poolInfo.serumAsks),
      new PublicKey(poolInfo.serumEventQueue),
      new PublicKey(poolInfo.serumCoinVaultAccount),
      new PublicKey(poolInfo.serumPcVaultAccount),
      new PublicKey(poolInfo.serumVaultSigner),
      new PublicKey(vaultRewardTokenAccount),
      new PublicKey(strategyInfo.strategyTokenAccount),
      new PublicKey(GAUNTLET_PDA_ACCOUNT),
    )
  )
  let { blockhash } = await connection.getRecentBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = owner;
  return transaction
}

// deposit
export async function deposit(
  connection: Connection | undefined | null,
  owner: PublicKey,
  vaultInfo: Vault,
  strategyInfo: Strategy,
  farmInfo: Farm,
  amount: string,
): Promise<Transaction> {
  if (!connection) throw Error("DEPOSIT: Connection failed")

  const transaction = new Transaction()

  const depositorUserAccount = await getGauntletUserAccount(
    new PublicKey(vaultInfo.stateAccount),
    owner,
    new PublicKey(strategyInfo.stateAccount),
    new PublicKey(GAUNTLET_PROGRAM_ID)
  );

  const depositorDepositTokenAccount = await findAssociatedTokenAddress(owner, new PublicKey(farmInfo.lp.mintAddress))
  transaction.add(
    depositInstruction(
      new PublicKey(GAUNTLET_PROGRAM_ID),
      owner,
      depositorUserAccount,
      depositorDepositTokenAccount,
      new PublicKey(GAUNTLET_STATE_ACCOUNT),
      new PublicKey(vaultInfo.stateAccount),
      new PublicKey(vaultInfo.vaultStrategyAccount),
      new PublicKey(strategyInfo.stateAccount),
      new PublicKey(farmInfo.programId),
      new PublicKey(farmInfo.poolId),
      new PublicKey(farmInfo.poolAuthority),
      new PublicKey(vaultInfo.vaultRaydiumStateAccount),
      new PublicKey(GAUNTLET_PDA_ACCOUNT),
      new PublicKey(vaultInfo.vaultDepositTokenAccount),
      new PublicKey(farmInfo.poolLpTokenAccount),
      new PublicKey(vaultInfo.farmRewardTokenAccount),
      new PublicKey(farmInfo.poolRewardTokenAccount),
      amount,
    )
  )
  let { blockhash } = await connection.getRecentBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = owner;
  return transaction
}

// depositV4
export async function depositV4(
  connection: Connection | undefined | null,
  owner: PublicKey,
  vaultInfo: Vault,
  strategyInfo: Strategy,
  farmInfo: Farm,
  amount: string,
): Promise<Transaction> {
  if (!connection) throw Error("DEPOSIT V4: Connection failed")

  const transaction = new Transaction()

  if (!vaultInfo.farmRewardTokenAccountB) throw Error("DEPOSIT V4: Not dual yield vault")
  if (!farmInfo.poolRewardTokenAccountB) throw Error("DEPOSIT V4: Not dual yield farm")

  const depositorUserAccount = await getGauntletUserAccount(
    new PublicKey(vaultInfo.stateAccount),
    owner,
    new PublicKey(strategyInfo.stateAccount),
    new PublicKey(GAUNTLET_PROGRAM_ID)
  );

  const depositorDepositTokenAccount = await findAssociatedTokenAddress(owner, new PublicKey(farmInfo.lp.mintAddress))
  transaction.add(
    depositInstructionV4(
      new PublicKey(GAUNTLET_PROGRAM_ID),
      owner,
      depositorUserAccount,
      depositorDepositTokenAccount,
      new PublicKey(GAUNTLET_STATE_ACCOUNT),
      new PublicKey(vaultInfo.stateAccount),
      new PublicKey(vaultInfo.vaultStrategyAccount),
      new PublicKey(strategyInfo.stateAccount),
      new PublicKey(farmInfo.programId),
      new PublicKey(farmInfo.poolId),
      new PublicKey(farmInfo.poolAuthority),
      new PublicKey(vaultInfo.vaultRaydiumStateAccount),
      new PublicKey(GAUNTLET_PDA_ACCOUNT),
      new PublicKey(vaultInfo.vaultDepositTokenAccount),
      new PublicKey(farmInfo.poolLpTokenAccount),
      new PublicKey(vaultInfo.farmRewardTokenAccount),
      new PublicKey(farmInfo.poolRewardTokenAccount),
      new PublicKey(vaultInfo.farmRewardTokenAccountB),
      new PublicKey(farmInfo.poolRewardTokenAccountB),
      amount,
    )
  )
  let { blockhash } = await connection.getRecentBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = owner;
  return transaction
}
// withdraw
export async function withdraw(
  connection: Connection | undefined | null,
  owner: PublicKey,
  vaultInfo: Vault,
  strategyInfo: Strategy,
  farmInfo: Farm,
  amount: string,
  rewardAmount: string,
): Promise<Transaction> {
  if (!connection) throw Error("WITHDRAW: Connection failed")

  const transaction = new Transaction()

  const depositorUserAccount = await getGauntletUserAccount(
    new PublicKey(vaultInfo.stateAccount),
    owner,
    new PublicKey(strategyInfo.stateAccount),
    new PublicKey(GAUNTLET_PROGRAM_ID)
  );

  const depositorDepositTokenAccount = await findAssociatedTokenAddress(owner, new PublicKey(farmInfo.lp.mintAddress))
  const depositorRewardTokenAccount =
    await createAssociatedTokenAccountIfNotExist(
      connection,
      owner,
      new PublicKey(strategyInfo.strategyTokenMintAccount),
      transaction
    )

  transaction.add(
    withdrawInstruction(
      new PublicKey(GAUNTLET_PROGRAM_ID),
      owner,
      depositorUserAccount,
      depositorDepositTokenAccount,
      depositorRewardTokenAccount,
      new PublicKey(GAUNTLET_STATE_ACCOUNT),
      new PublicKey(vaultInfo.stateAccount),
      new PublicKey(vaultInfo.vaultStrategyAccount),
      new PublicKey(strategyInfo.stateAccount),
      new PublicKey(strategyInfo.strategyTokenAccount),
      new PublicKey(vaultInfo.withdrawFeeTokenAccount),
      new PublicKey(strategyInfo.performanceFeeTokenAccount),
      new PublicKey(farmInfo.programId),
      new PublicKey(farmInfo.poolId),
      new PublicKey(farmInfo.poolAuthority),
      new PublicKey(vaultInfo.vaultRaydiumStateAccount),
      new PublicKey(GAUNTLET_PDA_ACCOUNT),
      new PublicKey(vaultInfo.vaultDepositTokenAccount),
      new PublicKey(farmInfo.poolLpTokenAccount),
      new PublicKey(vaultInfo.farmRewardTokenAccount),
      new PublicKey(farmInfo.poolRewardTokenAccount),
      amount,
      rewardAmount,
    )
  )
  let { blockhash } = await connection.getRecentBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = owner;
  return transaction
}

// withdrawV4
export async function withdrawV4(
  connection: Connection | undefined | null,
  owner: PublicKey,
  vaultInfo: Vault,
  strategyInfo: Strategy,
  farmInfo: Farm,
  amount: string,
  rewardAmount: string,
): Promise<Transaction> {
  if (!connection) throw Error("WITHDRAW V4: Connection failed")

  const transaction = new Transaction()

  if (!vaultInfo.farmRewardTokenAccountB) throw Error("WITHDRAW V4: Not dual yield vault")
  if (!farmInfo.poolRewardTokenAccountB) throw Error("WITHDRAW V4: Not dual yield farm")

  const depositorUserAccount = await getGauntletUserAccount(
    new PublicKey(vaultInfo.stateAccount),
    owner,
    new PublicKey(strategyInfo.stateAccount),
    new PublicKey(GAUNTLET_PROGRAM_ID)
  );

  const depositorDepositTokenAccount = await findAssociatedTokenAddress(owner, new PublicKey(farmInfo.lp.mintAddress))
  const depositorRewardTokenAccount =
    await createAssociatedTokenAccountIfNotExist(
      connection,
      owner,
      new PublicKey(strategyInfo.strategyTokenMintAccount),
      transaction
    )

  transaction.add(
    withdrawInstructionV4(
      new PublicKey(GAUNTLET_PROGRAM_ID),
      owner,
      depositorUserAccount,
      depositorDepositTokenAccount,
      depositorRewardTokenAccount,
      new PublicKey(GAUNTLET_STATE_ACCOUNT),
      new PublicKey(vaultInfo.stateAccount),
      new PublicKey(vaultInfo.vaultStrategyAccount),
      new PublicKey(strategyInfo.stateAccount),
      new PublicKey(strategyInfo.strategyTokenAccount),
      new PublicKey(vaultInfo.withdrawFeeTokenAccount),
      new PublicKey(strategyInfo.performanceFeeTokenAccount),
      new PublicKey(farmInfo.programId),
      new PublicKey(farmInfo.poolId),
      new PublicKey(farmInfo.poolAuthority),
      new PublicKey(vaultInfo.vaultRaydiumStateAccount),
      new PublicKey(GAUNTLET_PDA_ACCOUNT),
      new PublicKey(vaultInfo.vaultDepositTokenAccount),
      new PublicKey(farmInfo.poolLpTokenAccount),
      new PublicKey(vaultInfo.farmRewardTokenAccount),
      new PublicKey(farmInfo.poolRewardTokenAccount),
      new PublicKey(vaultInfo.farmRewardTokenAccountB),
      new PublicKey(farmInfo.poolRewardTokenAccountB),
      amount,
      rewardAmount,
    )
  )
  let { blockhash } = await connection.getRecentBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = owner;
  return transaction
}

export function harvestInstruction(
  programId: PublicKey,
  owner: PublicKey,
  gauntletAccount: PublicKey,
  depositorUserAccount: PublicKey,
  vaultAccount: PublicKey,
  vaultStrategyAccount: PublicKey,
  stakingProgramId: PublicKey,
  poolId: PublicKey,
  poolAuthority: PublicKey,
  userInfoAccount: PublicKey,
  userOwner: PublicKey,
  userLpAccount: PublicKey,
  poolLpTokenAccount: PublicKey,
  userRewardTokenAccount: PublicKey,
  poolRewardTokenAccount: PublicKey,
): TransactionInstruction {
  const dataLayout = struct([u8('instruction'), u8('deposit_type')])

  const keys = [
    { pubkey: owner, isSigner: true, isWritable: false },
    { pubkey: gauntletAccount, isSigner: false, isWritable: false },
    { pubkey: depositorUserAccount, isSigner: false, isWritable: true },
    { pubkey: vaultAccount, isSigner: false, isWritable: true },
    { pubkey: vaultStrategyAccount, isSigner: false, isWritable: true },
    { pubkey: stakingProgramId, isSigner: false, isWritable: false },
    { pubkey: poolId, isSigner: false, isWritable: true },
    { pubkey: poolAuthority, isSigner: false, isWritable: false },
    { pubkey: userInfoAccount, isSigner: false, isWritable: true },
    { pubkey: userOwner, isSigner: false, isWritable: false },
    { pubkey: userLpAccount, isSigner: false, isWritable: true },
    { pubkey: poolLpTokenAccount, isSigner: false, isWritable: true },
    { pubkey: userRewardTokenAccount, isSigner: false, isWritable: true },
    { pubkey: poolRewardTokenAccount, isSigner: false, isWritable: true },
    { pubkey: SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
  ]

  const data = Buffer.alloc(dataLayout.span)
  dataLayout.encode(
    {
      instruction: 6,
      deposit_type: 0,
    },
    data
  )

  return new TransactionInstruction({
    keys,
    programId,
    data
  })
}

export function harvestInstructionV4(
  programId: PublicKey,
  owner: PublicKey,
  gauntletAccount: PublicKey,
  depositorUserAccount: PublicKey,
  vaultAccount: PublicKey,
  vaultStrategyAccount: PublicKey,
  stakingProgramId: PublicKey,
  poolId: PublicKey,
  poolAuthority: PublicKey,
  userInfoAccount: PublicKey,
  userOwner: PublicKey,
  userLpAccount: PublicKey,
  poolLpTokenAccount: PublicKey,
  userRewardTokenAccount: PublicKey,
  poolRewardTokenAccount: PublicKey,
  userRewardTokenAccountB: PublicKey,
  poolRewardTokenAccountB: PublicKey,
): TransactionInstruction {
  const dataLayout = struct([u8('instruction'), u8('deposit_type')])

  const keys = [
    { pubkey: owner, isSigner: true, isWritable: false },
    { pubkey: gauntletAccount, isSigner: false, isWritable: false },
    { pubkey: depositorUserAccount, isSigner: false, isWritable: true },
    { pubkey: vaultAccount, isSigner: false, isWritable: true },
    { pubkey: vaultStrategyAccount, isSigner: false, isWritable: true },
    { pubkey: stakingProgramId, isSigner: false, isWritable: false },
    { pubkey: poolId, isSigner: false, isWritable: true },
    { pubkey: poolAuthority, isSigner: false, isWritable: false },
    { pubkey: userInfoAccount, isSigner: false, isWritable: true },
    { pubkey: userOwner, isSigner: false, isWritable: false },
    { pubkey: userLpAccount, isSigner: false, isWritable: true },
    { pubkey: poolLpTokenAccount, isSigner: false, isWritable: true },
    { pubkey: userRewardTokenAccount, isSigner: false, isWritable: true },
    { pubkey: poolRewardTokenAccount, isSigner: false, isWritable: true },
    { pubkey: SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    { pubkey: userRewardTokenAccountB, isSigner: false, isWritable: true },
    { pubkey: poolRewardTokenAccountB, isSigner: false, isWritable: true },
  ]

  const data = Buffer.alloc(dataLayout.span)
  dataLayout.encode(
    {
      instruction: 6,
      deposit_type: 1,
    },
    data
  )

  return new TransactionInstruction({
    keys,
    programId,
    data
  })
}

export function swapRewardToUsdcInstruction(
  programId: PublicKey,
  owner: PublicKey,
  gauntletAccount: PublicKey,
  depositorUserAccount: PublicKey,
  vaultAccount: PublicKey,
  vaultStrategyAccount: PublicKey,
  strategyAccount: PublicKey,
  ammProgramId: PublicKey,
  ammId: PublicKey,
  ammAuthority: PublicKey,
  ammOpenOrders: PublicKey,
  ammTargetOrders: PublicKey,
  poolCoinTokenAccount: PublicKey,
  poolPcTokenAccount: PublicKey,
  serumProgramId: PublicKey,
  serumMarket: PublicKey,
  serumBids: PublicKey,
  serumAsks: PublicKey,
  serumEventQueue: PublicKey,
  serumCoinVaultAccount: PublicKey,
  serumPcVaultAccount: PublicKey,
  serumVaultSigner: PublicKey,
  userSourceTokenAccount: PublicKey,
  userDestTokenAccount: PublicKey,
  userOwner: PublicKey,
): TransactionInstruction {
  const dataLayout = struct([u8('instruction'), u8('swap_type')])

  const keys = [
    { pubkey: owner, isSigner: true, isWritable: false },
    { pubkey: gauntletAccount, isSigner: false, isWritable: false },
    { pubkey: depositorUserAccount, isSigner: false, isWritable: true },
    { pubkey: vaultAccount, isSigner: false, isWritable: true },
    { pubkey: vaultStrategyAccount, isSigner: false, isWritable: true },
    { pubkey: strategyAccount, isSigner: false, isWritable: false },
    // amm
    { pubkey: ammProgramId, isSigner: false, isWritable: false },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    { pubkey: ammId, isSigner: false, isWritable: true },
    { pubkey: ammAuthority, isSigner: false, isWritable: false },
    { pubkey: ammOpenOrders, isSigner: false, isWritable: true },
    { pubkey: ammTargetOrders, isSigner: false, isWritable: true },
    { pubkey: poolCoinTokenAccount, isSigner: false, isWritable: true },
    { pubkey: poolPcTokenAccount, isSigner: false, isWritable: true },
    // serum
    { pubkey: serumProgramId, isSigner: false, isWritable: false },
    { pubkey: serumMarket, isSigner: false, isWritable: true },
    { pubkey: serumBids, isSigner: false, isWritable: true },
    { pubkey: serumAsks, isSigner: false, isWritable: true },
    { pubkey: serumEventQueue, isSigner: false, isWritable: true },
    { pubkey: serumCoinVaultAccount, isSigner: false, isWritable: true },
    { pubkey: serumPcVaultAccount, isSigner: false, isWritable: true },
    { pubkey: serumVaultSigner, isSigner: false, isWritable: false },
    { pubkey: userSourceTokenAccount, isSigner: false, isWritable: true },
    { pubkey: userDestTokenAccount, isSigner: false, isWritable: true },
    { pubkey: userOwner, isSigner: false, isWritable: false }
  ]

  const data = Buffer.alloc(dataLayout.span)
  dataLayout.encode(
    {
      instruction: 7,
      swap_type: 0,
    },
    data
  )

  return new TransactionInstruction({
    keys,
    programId,
    data
  })
}

export function swapUsdcToStrategyInstruction(
  programId: PublicKey,
  owner: PublicKey,
  gauntletAccount: PublicKey,
  depositorUserAccount: PublicKey,
  vaultAccount: PublicKey,
  vaultStrategyAccount: PublicKey,
  strategyAccount: PublicKey,
  ammProgramId: PublicKey,
  ammId: PublicKey,
  ammAuthority: PublicKey,
  ammOpenOrders: PublicKey,
  ammTargetOrders: PublicKey,
  poolCoinTokenAccount: PublicKey,
  poolPcTokenAccount: PublicKey,
  serumProgramId: PublicKey,
  serumMarket: PublicKey,
  serumBids: PublicKey,
  serumAsks: PublicKey,
  serumEventQueue: PublicKey,
  serumCoinVaultAccount: PublicKey,
  serumPcVaultAccount: PublicKey,
  serumVaultSigner: PublicKey,
  userSourceTokenAccount: PublicKey,
  userDestTokenAccount: PublicKey,
  userOwner: PublicKey,
): TransactionInstruction {
  const dataLayout = struct([u8('instruction'), u8('swap_type')])

  const keys = [
    { pubkey: owner, isSigner: true, isWritable: false },
    { pubkey: gauntletAccount, isSigner: false, isWritable: false },
    { pubkey: depositorUserAccount, isSigner: false, isWritable: true },
    { pubkey: vaultAccount, isSigner: false, isWritable: true },
    { pubkey: vaultStrategyAccount, isSigner: false, isWritable: true },
    { pubkey: strategyAccount, isSigner: false, isWritable: true },
    // amm
    { pubkey: ammProgramId, isSigner: false, isWritable: false },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    { pubkey: ammId, isSigner: false, isWritable: true },
    { pubkey: ammAuthority, isSigner: false, isWritable: false },
    { pubkey: ammOpenOrders, isSigner: false, isWritable: true },
    { pubkey: ammTargetOrders, isSigner: false, isWritable: true },
    { pubkey: poolCoinTokenAccount, isSigner: false, isWritable: true },
    { pubkey: poolPcTokenAccount, isSigner: false, isWritable: true },
    // serum
    { pubkey: serumProgramId, isSigner: false, isWritable: false },
    { pubkey: serumMarket, isSigner: false, isWritable: true },
    { pubkey: serumBids, isSigner: false, isWritable: true },
    { pubkey: serumAsks, isSigner: false, isWritable: true },
    { pubkey: serumEventQueue, isSigner: false, isWritable: true },
    { pubkey: serumCoinVaultAccount, isSigner: false, isWritable: true },
    { pubkey: serumPcVaultAccount, isSigner: false, isWritable: true },
    { pubkey: serumVaultSigner, isSigner: false, isWritable: false },
    { pubkey: userSourceTokenAccount, isSigner: false, isWritable: true },
    { pubkey: userDestTokenAccount, isSigner: false, isWritable: true },
    { pubkey: userOwner, isSigner: false, isWritable: false }
  ]

  const data = Buffer.alloc(dataLayout.span)
  dataLayout.encode(
    {
      instruction: 8,
      swap_type: 0,
    },
    data
  )

  return new TransactionInstruction({
    keys,
    programId,
    data
  })
}

export function swapRewardToStrategyInstruction(
  programId: PublicKey,
  owner: PublicKey,
  gauntletAccount: PublicKey,
  depositorUserAccount: PublicKey,
  vaultAccount: PublicKey,
  vaultStrategyAccount: PublicKey,
  strategyAccount: PublicKey,
  ammProgramId: PublicKey,
  ammId: PublicKey,
  ammAuthority: PublicKey,
  ammOpenOrders: PublicKey,
  ammTargetOrders: PublicKey,
  poolCoinTokenAccount: PublicKey,
  poolPcTokenAccount: PublicKey,
  serumProgramId: PublicKey,
  serumMarket: PublicKey,
  serumBids: PublicKey,
  serumAsks: PublicKey,
  serumEventQueue: PublicKey,
  serumCoinVaultAccount: PublicKey,
  serumPcVaultAccount: PublicKey,
  serumVaultSigner: PublicKey,
  userSourceTokenAccount: PublicKey,
  userDestTokenAccount: PublicKey,
  userOwner: PublicKey,
): TransactionInstruction {
  const dataLayout = struct([u8('instruction'), u8('swap_type')])

  const keys = [
    { pubkey: owner, isSigner: true, isWritable: false },
    { pubkey: gauntletAccount, isSigner: false, isWritable: false },
    { pubkey: depositorUserAccount, isSigner: false, isWritable: true },
    { pubkey: vaultAccount, isSigner: false, isWritable: true },
    { pubkey: vaultStrategyAccount, isSigner: false, isWritable: true },
    { pubkey: strategyAccount, isSigner: false, isWritable: true },
    // amm
    { pubkey: ammProgramId, isSigner: false, isWritable: false },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    { pubkey: ammId, isSigner: false, isWritable: true },
    { pubkey: ammAuthority, isSigner: false, isWritable: false },
    { pubkey: ammOpenOrders, isSigner: false, isWritable: true },
    { pubkey: ammTargetOrders, isSigner: false, isWritable: true },
    { pubkey: poolCoinTokenAccount, isSigner: false, isWritable: true },
    { pubkey: poolPcTokenAccount, isSigner: false, isWritable: true },
    // serum
    { pubkey: serumProgramId, isSigner: false, isWritable: false },
    { pubkey: serumMarket, isSigner: false, isWritable: true },
    { pubkey: serumBids, isSigner: false, isWritable: true },
    { pubkey: serumAsks, isSigner: false, isWritable: true },
    { pubkey: serumEventQueue, isSigner: false, isWritable: true },
    { pubkey: serumCoinVaultAccount, isSigner: false, isWritable: true },
    { pubkey: serumPcVaultAccount, isSigner: false, isWritable: true },
    { pubkey: serumVaultSigner, isSigner: false, isWritable: false },
    { pubkey: userSourceTokenAccount, isSigner: false, isWritable: true },
    { pubkey: userDestTokenAccount, isSigner: false, isWritable: true },
    { pubkey: userOwner, isSigner: false, isWritable: false }
  ]

  const data = Buffer.alloc(dataLayout.span)
  dataLayout.encode(
    {
      instruction: 9,
      swap_type: 0,
    },
    data
  )

  return new TransactionInstruction({
    keys,
    programId,
    data
  })
}


export function depositInstruction(
  programId: PublicKey,
  owner: PublicKey,
  depositorUserAccount: PublicKey,
  depositorDepositTokenAccount: PublicKey,
  gauntletAccount: PublicKey,
  vaultAccount: PublicKey,
  vaultStrategyAccount: PublicKey,
  strategyAccount: PublicKey,
  stakingProgramId: PublicKey,
  poolId: PublicKey,
  poolAuthority: PublicKey,
  userInfoAccount: PublicKey,
  userOwner: PublicKey,
  userLpTokenAccount: PublicKey,
  poolLpTokenAccount: PublicKey,
  userRewardTokenAccount: PublicKey,
  poolRewardTokenAccount: PublicKey,
  // tokenProgramId: PublicKey,
  amount: string
): TransactionInstruction {
  const dataLayout = struct([u8('instruction'), nu64('amount'), u8('deposit_type')])

  const keys = [
    { pubkey: owner, isSigner: true, isWritable: false },
    { pubkey: depositorUserAccount, isSigner: false, isWritable: true },
    { pubkey: depositorDepositTokenAccount, isSigner: false, isWritable: true },
    { pubkey: gauntletAccount, isSigner: false, isWritable: false },
    { pubkey: vaultAccount, isSigner: false, isWritable: true },
    { pubkey: vaultStrategyAccount, isSigner: false, isWritable: false },
    { pubkey: strategyAccount, isSigner: false, isWritable: false },
    { pubkey: stakingProgramId, isSigner: false, isWritable: false },
    { pubkey: poolId, isSigner: false, isWritable: true },
    { pubkey: poolAuthority, isSigner: false, isWritable: false },
    { pubkey: userInfoAccount, isSigner: false, isWritable: true },
    { pubkey: userOwner, isSigner: false, isWritable: false },
    { pubkey: userLpTokenAccount, isSigner: false, isWritable: true },
    { pubkey: poolLpTokenAccount, isSigner: false, isWritable: true },
    { pubkey: userRewardTokenAccount, isSigner: false, isWritable: true },
    { pubkey: poolRewardTokenAccount, isSigner: false, isWritable: true },
    { pubkey: SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false }
  ]

  const data = Buffer.alloc(dataLayout.span)
  dataLayout.encode(
    {
      instruction: 4,
      amount: amount,
      deposit_type: 0,
    },
    data
  )

  return new TransactionInstruction({
    keys,
    programId,
    data
  })
}

export function depositInstructionV4(
  programId: PublicKey,
  owner: PublicKey,
  depositorUserAccount: PublicKey,
  depositorDepositTokenAccount: PublicKey,
  gauntletAccount: PublicKey,
  vaultAccount: PublicKey,
  vaultStrategyAccount: PublicKey,
  strategyAccount: PublicKey,
  stakingProgramId: PublicKey,
  poolId: PublicKey,
  poolAuthority: PublicKey,
  userInfoAccount: PublicKey,
  userOwner: PublicKey,
  userLpTokenAccount: PublicKey,
  poolLpTokenAccount: PublicKey,
  userRewardTokenAccount: PublicKey,
  poolRewardTokenAccount: PublicKey,
  userRewardTokenAccountB: PublicKey,
  poolRewardTokenAccountB: PublicKey,
  amount: string
): TransactionInstruction {
  const dataLayout = struct([u8('instruction'), nu64('amount'), u8('deposit_type')])

  const keys = [
    { pubkey: owner, isSigner: true, isWritable: false },
    { pubkey: depositorUserAccount, isSigner: false, isWritable: true },
    { pubkey: depositorDepositTokenAccount, isSigner: false, isWritable: true },
    { pubkey: gauntletAccount, isSigner: false, isWritable: false },
    { pubkey: vaultAccount, isSigner: false, isWritable: true },
    { pubkey: vaultStrategyAccount, isSigner: false, isWritable: false },
    { pubkey: strategyAccount, isSigner: false, isWritable: false },
    { pubkey: stakingProgramId, isSigner: false, isWritable: false },
    { pubkey: poolId, isSigner: false, isWritable: true },
    { pubkey: poolAuthority, isSigner: false, isWritable: false },
    { pubkey: userInfoAccount, isSigner: false, isWritable: true },
    { pubkey: userOwner, isSigner: false, isWritable: false },
    { pubkey: userLpTokenAccount, isSigner: false, isWritable: true },
    { pubkey: poolLpTokenAccount, isSigner: false, isWritable: true },
    { pubkey: userRewardTokenAccount, isSigner: false, isWritable: true },
    { pubkey: poolRewardTokenAccount, isSigner: false, isWritable: true },
    { pubkey: SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    { pubkey: userRewardTokenAccountB, isSigner: false, isWritable: true },
    { pubkey: poolRewardTokenAccountB, isSigner: false, isWritable: true },
  ]

  const data = Buffer.alloc(dataLayout.span)
  dataLayout.encode(
    {
      instruction: 4,
      amount: amount,
      deposit_type: 1,
    },
    data
  )

  return new TransactionInstruction({
    keys,
    programId,
    data
  })
}

export function withdrawInstruction(
  programId: PublicKey,
  owner: PublicKey,
  depositorUserAccount: PublicKey,
  depositorDepositTokenAccount: PublicKey,
  depositorRewardTokenAccount: PublicKey,
  gauntletAccount: PublicKey,
  vaultAccount: PublicKey,
  vaultStrategyAccount: PublicKey,
  strategyAccount: PublicKey,
  strategyTokenAccount: PublicKey,
  withdrawFeeTokenAccount: PublicKey,
  performanceFeeTokenAccount: PublicKey,
  stakingProgramId: PublicKey,
  poolId: PublicKey,
  poolAuthority: PublicKey,
  userInfoAccount: PublicKey,
  userOwner: PublicKey,
  userLpTokenAccount: PublicKey,
  poolLpTokenAccount: PublicKey,
  userRewardTokenAccount: PublicKey,
  poolRewardTokenAccount: PublicKey,
  amount: string,
  rewardAmount: string
): TransactionInstruction {
  const dataLayout = struct([u8('instruction'), nu64('amount'), nu64('reward_amount'), u8('withdraw_type')])

  const keys = [
    { pubkey: owner, isSigner: true, isWritable: false },
    { pubkey: depositorUserAccount, isSigner: false, isWritable: true },
    { pubkey: depositorDepositTokenAccount, isSigner: false, isWritable: true },
    { pubkey: depositorRewardTokenAccount, isSigner: false, isWritable: true },
    { pubkey: gauntletAccount, isSigner: false, isWritable: false },
    { pubkey: vaultAccount, isSigner: false, isWritable: true },
    { pubkey: vaultStrategyAccount, isSigner: false, isWritable: true },
    { pubkey: strategyAccount, isSigner: false, isWritable: true },
    { pubkey: strategyTokenAccount, isSigner: false, isWritable: true },
    { pubkey: withdrawFeeTokenAccount, isSigner: false, isWritable: true },
    { pubkey: performanceFeeTokenAccount, isSigner: false, isWritable: true },
    { pubkey: stakingProgramId, isSigner: false, isWritable: false },
    { pubkey: poolId, isSigner: false, isWritable: true },
    { pubkey: poolAuthority, isSigner: false, isWritable: false },
    { pubkey: userInfoAccount, isSigner: false, isWritable: true },
    { pubkey: userOwner, isSigner: false, isWritable: false },
    { pubkey: userLpTokenAccount, isSigner: false, isWritable: true },
    { pubkey: poolLpTokenAccount, isSigner: false, isWritable: true },
    { pubkey: userRewardTokenAccount, isSigner: false, isWritable: true },
    { pubkey: poolRewardTokenAccount, isSigner: false, isWritable: true },
    { pubkey: SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false }
  ]

  const data = Buffer.alloc(dataLayout.span)
  dataLayout.encode(
    {
      instruction: 5,
      amount: amount,
      reward_amount: rewardAmount,
      withdraw_type: 0,
    },
    data
  )

  return new TransactionInstruction({
    keys,
    programId,
    data
  })
}

export function withdrawInstructionV4(
  programId: PublicKey,
  owner: PublicKey,
  depositorUserAccount: PublicKey,
  depositorDepositTokenAccount: PublicKey,
  depositorRewardTokenAccount: PublicKey,
  gauntletAccount: PublicKey,
  vaultAccount: PublicKey,
  vaultStrategyAccount: PublicKey,
  strategyAccount: PublicKey,
  strategyTokenAccount: PublicKey,
  withdrawFeeTokenAccount: PublicKey,
  performanceFeeTokenAccount: PublicKey,
  stakingProgramId: PublicKey,
  poolId: PublicKey,
  poolAuthority: PublicKey,
  userInfoAccount: PublicKey,
  userOwner: PublicKey,
  userLpTokenAccount: PublicKey,
  poolLpTokenAccount: PublicKey,
  userRewardTokenAccount: PublicKey,
  poolRewardTokenAccount: PublicKey,
  userRewardTokenAccountB: PublicKey,
  poolRewardTokenAccountB: PublicKey,
  amount: string,
  rewardAmount: string
): TransactionInstruction {
  const dataLayout = struct([u8('instruction'), nu64('amount'), nu64('reward_amount'), u8('withdraw_type')])

  const keys = [
    { pubkey: owner, isSigner: true, isWritable: false },
    { pubkey: depositorUserAccount, isSigner: false, isWritable: true },
    { pubkey: depositorDepositTokenAccount, isSigner: false, isWritable: true },
    { pubkey: depositorRewardTokenAccount, isSigner: false, isWritable: true },
    { pubkey: gauntletAccount, isSigner: false, isWritable: false },
    { pubkey: vaultAccount, isSigner: false, isWritable: true },
    { pubkey: vaultStrategyAccount, isSigner: false, isWritable: true },
    { pubkey: strategyAccount, isSigner: false, isWritable: true },
    { pubkey: strategyTokenAccount, isSigner: false, isWritable: true },
    { pubkey: withdrawFeeTokenAccount, isSigner: false, isWritable: true },
    { pubkey: performanceFeeTokenAccount, isSigner: false, isWritable: true },
    { pubkey: stakingProgramId, isSigner: false, isWritable: false },
    { pubkey: poolId, isSigner: false, isWritable: true },
    { pubkey: poolAuthority, isSigner: false, isWritable: false },
    { pubkey: userInfoAccount, isSigner: false, isWritable: true },
    { pubkey: userOwner, isSigner: false, isWritable: false },
    { pubkey: userLpTokenAccount, isSigner: false, isWritable: true },
    { pubkey: poolLpTokenAccount, isSigner: false, isWritable: true },
    { pubkey: userRewardTokenAccount, isSigner: false, isWritable: true },
    { pubkey: poolRewardTokenAccount, isSigner: false, isWritable: true },
    { pubkey: SYSVAR_CLOCK_PUBKEY, isSigner: false, isWritable: false },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    { pubkey: userRewardTokenAccountB, isSigner: false, isWritable: true },
    { pubkey: poolRewardTokenAccountB, isSigner: false, isWritable: true },
  ]

  const data = Buffer.alloc(dataLayout.span)
  dataLayout.encode(
    {
      instruction: 5,
      amount: amount,
      reward_amount: rewardAmount,
      withdraw_type: 1,
    },
    data
  )

  return new TransactionInstruction({
    keys,
    programId,
    data
  })
}
