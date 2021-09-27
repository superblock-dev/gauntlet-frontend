import { useWallet } from '@solana/wallet-adapter-react';
import Countup from 'react-countup';
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
  lpValueInUSD: number;
}

function VaultSummary({ balance, lpValueInUSD }: VaultSummaryProps) {
  const classes = useStyles();
  const { connected } = useWallet();
  const setPopupState = useSetRecoilState(popupState);

  const handleConnect = () => {
    // address check
    setPopupState(<WalletConnectPopup />);
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
        <div className={classes.summaryHeader}>APY</div>
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
        <div className={classes.summaryBody}>95.39%</div>
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
        <div className={classes.summarySubBody}>0.05% daily</div>
      </div>
      <div className={classes.summaryContent}>
        <div className={classes.summaryHeader}>Share of pool</div>
      </div>
      <div className={classes.summaryContent}>
        <div className={classes.summaryBody} style={{ marginBottom: 0, }}>20%</div>
      </div>
    </div>
  )
};

export default VaultSummary;
