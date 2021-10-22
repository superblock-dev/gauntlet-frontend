import BigNumber from 'bignumber.js';
import { useWallet } from '@solana/wallet-adapter-react';
import Countup from 'react-countup';
import { useRecoilValue } from 'recoil';
import { liquidityPoolInfos } from "recoil/atoms";
import { makeStyles } from "@material-ui/core";
import BGVaultSummary from 'assets/svgs/BGVaultSummary.svg';
import WalletButton from 'components/Buttons/WalletButton';
import { useSetRecoilState } from 'recoil';
import { popupState } from 'recoil/atoms';
import WalletConnectPopup from 'components/WalletConnectPopup';

const useStyles = makeStyles({
  summaryContainer: {
    backgroundImage: `url(${BGVaultSummary})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: 816,
    height: 174,
    padding: '50px 80px 48px 80px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  connectFirstContainer: {
    position: 'absolute',
    width: '90%',
    height: 224,
    top: 24,
    left: '5%',
    background: 'rgba(32, 24, 48, 0.1);',
    backdropFilter: 'blur(6px);',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectFirstText: {
    fontFamily: 'Sen',
    fontSize: 16,
    color: '#CBA344',
    marginBottom: 32,
  },
  summaryContent: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  summaryHeader: {
    fontFamily: 'Sen',
    fontWeight: 400,
    fontSize: 12,
    height: 14,
    color: '#CBA344',
    marginBottom: 4,
  },
  summaryBody: {
    fontWeight: 700,
    fontSize: 20,
    height: 30,
    color: '#FFD271',
    marginBottom: 4,
  },
  summarySubBody: {
    fontSize: 16,
    fontWeight: 700,
    height: 24,
    color: '#CBA344',
  },
});

interface VaultSummaryProps {
  balance: number;
  vaultTotalAmount?: BigNumber;
  tokenMintAddress: string;
  apr: number;
  staked: boolean;
}

function VaultSummary({ balance, vaultTotalAmount, tokenMintAddress, apr, staked }: VaultSummaryProps) {
  const classes = useStyles();
  const liquidityPools = useRecoilValue(liquidityPoolInfos);
  const { connected } = useWallet();
  const setPopupState = useSetRecoilState(popupState);

  const handleConnect = () => {
    // address check
    setPopupState(<WalletConnectPopup />);
  }

  let lpValueInUSD = 0;

  if (tokenMintAddress in liquidityPools) {
    const lpValue = liquidityPools[tokenMintAddress].currentLpValue;
    lpValueInUSD = lpValue ? lpValue * balance : 0;
  }

  let shareOfPool = 0;
  if (vaultTotalAmount && vaultTotalAmount.toNumber() !== 0) {
    shareOfPool = new BigNumber(balance).dividedBy(vaultTotalAmount).multipliedBy(100).toNumber();
  }

  return (
    <div className={classes.summaryContainer}>
      {
        !connected ?
          <div className={classes.connectFirstContainer}>
            <div className={classes.connectFirstText}>Please Connect Your Wallet</div>
            <div onClick={handleConnect}>
              <WalletButton connected={connected} />
            </div>
          </div> :
          null
      }
      <div className={classes.summaryContent}>
        <div className={classes.summaryHeader}>Deposits</div>
        <div className={classes.summaryHeader}>{
          staked ?
            'APR' :
            'Max. APR'
        }</div>
      </div>
      <div className={classes.summaryContent}>
        <div className={classes.summaryBody}>
          <Countup
            start={0}
            end={balance}
            delay={0}
            duration={0.75}
            separator=","
            decimals={3}
            decimal="."
          /></div>
        <div className={classes.summaryBody}>
          <Countup
            start={0}
            end={apr}
            delay={0}
            duration={0.75}
            separator=","
            decimals={2}
            decimal="."
            suffix=" %"
          />
        </div>
      </div>
      <div className={classes.summaryContent} style={{ marginBottom: 50, }}>
        <div className={classes.summarySubBody}>
          <Countup
            start={0}
            end={lpValueInUSD}
            delay={0}
            duration={0.75}
            separator=","
            decimals={3}
            decimal="."
            prefix="$ "
          />
        </div>
        <div className={classes.summarySubBody}>
          <Countup
            start={0}
            end={apr / 365}
            delay={0}
            duration={0.75}
            separator=","
            decimals={3}
            decimal="."
            suffix=" % daily"
          />
        </div>
      </div>
      <div className={classes.summaryContent}>
        <div className={classes.summaryHeader}>Share of pool</div>
      </div>
      <div className={classes.summaryContent}>
        <div className={classes.summaryBody} style={{ marginBottom: 0, }}>
          <Countup
            start={0}
            end={shareOfPool}
            delay={0}
            duration={0.75}
            separator=","
            decimals={3}
            decimal="."
            suffix=" %"
          />
        </div>
      </div>
    </div>
  )
};

export default VaultSummary;
