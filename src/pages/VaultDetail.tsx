import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import LPTokenView from "components/Vaults/LPTokenView";
import { makeStyles } from "@material-ui/core";
import IconBackArrow from 'assets/svgs/IconBackArrow.svg';
import LineMixPurpleAndGold from 'assets/svgs/LineMixPurpleAndGold.svg';
import { FARMS } from 'utils/tokens';
import VaultSummary from "components/VaultDetail/VaultSummary";
import VaultDetails from "components/VaultDetail/VaultDetails";
import MediumButton from "components/Buttons/MediumButton";
import RewardList from "components/VaultDetail/RewardList";
import Slider from "components/Slider";
import CursorPointer from 'assets/CursorPointer.svg';
import Flag from "components/Vaults/Flag";
import { v4 as uuidv4 } from "uuid";
import FlagNavigation from "components/Vaults/FlagNavigation";
import StoneDisplay from "components/Vaults/StoneDisplay";
import { TokenName, VaultState } from "types";

function createItem(vaultState: VaultState, active: boolean) {
  return (
      <Flag vaultState={vaultState} active={active}/>
  );
}

function createSlide(vaultState: VaultState, active: boolean, onClick: () => void) {
  return {
      key: uuidv4(),
      content: createItem(vaultState, active),
      onClick: onClick
  }
}

interface VaultDetailParams {
  vaultId: string,
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    marginTop: 72,
    width: 976,
    marginBottom: 32,
  },
  backBtnContainer: {
    width: 165,
    height: 40,
    marginBottom: 32,
    display: 'flex',
    alignItems: 'center',
    cursor: `url(${CursorPointer}), pointer`,
  },
  iconBack: {
    width: 32,
    height: 32,
    backgroundImage: `url(${IconBackArrow})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  textBack: {
    fontSize: 14,
    marginLeft: 16,
    fontWeight: 700,
    background: 'linear-gradient(175.49deg, #FFD271 26.78%, #825900 103.29%)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
  },
  divider: {
    marginTop: 80,
    marginBottom: 80,
    height: 20,
    width: 388,
    backgroundImage: `url(${LineMixPurpleAndGold})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  sliderContainer: {
    width: 1440,
    height: 960,
    position: "relative",
  },
  stoneDisplayContainer: {
    width: 1440,
  }
});

function VaultDetail() {
  const classes = useStyles();
  const { goBack } = useHistory();
  const [slideIndex, setSlideIndex] = useState(0);
  
  const vaultStates: VaultState[] = [
    { tokenName: "BTC", balance: 1002.34, depositAmount: 11.1, withdrawAmount: 0.1, rewards: 1292.1 },
    { tokenName: "ETH", balance: 32602.34, depositAmount: 0.1, withdrawAmount: 1.21, rewards: 2.1 },
    { tokenName: "SOL", balance: 102.34, depositAmount: 981.1, withdrawAmount: 280.1, rewards: 0.000001 },
    { tokenName: "USDT", balance: 10083642.34, depositAmount: 0.0, withdrawAmount: 9127.1, rewards: 999912.1 },
    { tokenName: "USDC", balance: 90202.34, depositAmount: 1.0000001, withdrawAmount: 0.9999991, rewards: 123146.1235 },
  ]
  const flags = ([...vaultStates, ...vaultStates]).map((vaultState, i) => {
    return createSlide(vaultState, slideIndex === i, () => setSlideIndex(i));
  });

  const stones: { tokenName: TokenName, active: boolean }[] = [
    { tokenName: "BTC", active: true },
    { tokenName: "ETH", active: false },
    { tokenName: "SOL", active: true },
    { tokenName: "USDT", active: true },
    { tokenName: "USDC", active: false },
  ]

  let { vaultId } = useParams<VaultDetailParams>();
  let vId = parseInt(vaultId);
  if (vId === undefined) return <></> // TODO: Page not found
  let farm = FARMS.find(farm => farm.id === vId);
  if (farm === undefined) return <></> // TODO: Page not found

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.backBtnContainer} onClick={goBack}>
          <div className={classes.iconBack} />
          <div className={classes.textBack}>
            Back to Vaults
          </div>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: 960,
          marginLeft: 8,
        }}>
          <div style={{ width: 800, }}>
            <LPTokenView lp={farm.lp} linkVisible />
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            height: 45,
            marginRight: 16,
          }}>
            <div style={{ fontFamily: 'Sen', fontSize: 12, color: '#CBA344', }}>TVL</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#FFD271', }}>540.1M</div>
          </div>
        </div>
      </div>
      
      <VaultSummary />

      <div className={classes.divider} />

      <div className={classes.stoneDisplayContainer}>
        <StoneDisplay items={stones} />
      </div>

      <div className={classes.divider} />

      <div className={classes.sliderContainer}>
        <Slider index={slideIndex} slides={flags} />
        <FlagNavigation onClick={(direction: number) => {
          const index = slideIndex + direction;
          const nextIndex = index >= flags.length ? 0 : index < 0 ? flags.length - 1 : index;
          setSlideIndex(nextIndex);
        }} />
      </div>

      <RewardList />

      <VaultDetails />

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: 560,
        marginBottom: 340,
        marginTop: 52,
      }}>
        <MediumButton text="Create LP" link="https://raydium.io/" external/>
        <MediumButton text="Farm Contract" external/>
        <MediumButton text="Vault Contract" external/>
      </div>
    </div>
  )
};

export default VaultDetail;
