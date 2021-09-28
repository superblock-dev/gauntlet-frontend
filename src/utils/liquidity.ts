import { LP_TOKENS } from 'utils/tokens';
import { PublicKey } from '@solana/web3.js';
import {
  getMultipleAccounts,
} from 'utils/web3';
import { MINT_LAYOUT } from './layouts';

export async function getLpMintListDecimals(
  conn: any,
  mintAddressInfos: string[]
): Promise<{ [name: string]: number }> {
  const reLpInfoDict: { [name: string]: number } = {}
  const mintList = [] as PublicKey[]
  mintAddressInfos.forEach((item) => {
    let lpInfo = Object.values(LP_TOKENS).find((itemLpToken) => itemLpToken.mintAddress === item)
    if (!lpInfo) {
      mintList.push(new PublicKey(item))
      // @ts-ignore
      lpInfo = {
        decimals: 0
      }
    }
    // @ts-ignore
    reLpInfoDict[item] = lpInfo.decimals
  })

  const mintAll = await getMultipleAccounts(conn, mintList, "confirmed")
  for (let mintIndex = 0; mintIndex < mintAll.length; mintIndex += 1) {
    const itemMint = mintAll[mintIndex]
    if (itemMint) {
      const mintLayoutData = MINT_LAYOUT.decode(Buffer.from(itemMint.account.data))
      reLpInfoDict[mintList[mintIndex].toString()] = mintLayoutData.decimals
    }
  }
  const reInfo: { [name: string]: number } = {}
  for (const key of Object.keys(reLpInfoDict)) {
    if (reLpInfoDict[key] !== null) {
      reInfo[key] = reLpInfoDict[key]
    }
  }
  return reInfo
}
