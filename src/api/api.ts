import BigNumber from 'bignumber.js';
import { PublicKey, Connection } from '@solana/web3.js';
import { cloneDeep } from 'lodash';
import { getAddressForWhat, LiquidityPoolInfo, LIQUIDITY_POOLS } from 'utils/pools';
import { TokenAmount } from 'utils/safe-math';
import { getMultipleAccounts } from 'utils/web3';
import { 
  getBigNumber, 
  TOKEN_ACCOUNT_LAYOUT, 
  AMM_INFO_LAYOUT_V4, 
  MINT_LAYOUT,
} from 'utils/layouts';


export const requestFarmInfo = async (conn: Connection) => {

}
