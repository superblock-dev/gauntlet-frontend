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
import { TokenName } from "types";

function createItem(active: boolean) {
  return (
      <Flag active={active}/>
  );
}

function createSlide(curIdx: number, idx: number, onClick: () => void) {
  return {
      key: uuidv4(),
      content: createItem(curIdx === idx),
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
  const flags = ([1,2,3,4,5,5,5,55,5,5,5,5,5]).map((_, i) => {
    return createSlide(slideIndex, i, () => setSlideIndex(i));
  });

  const stones: { tokenName: TokenName, active: boolean }[] = [
    { tokenName: "BTC", active: true },
    { tokenName: "ETH", active: false },
    { tokenName: "SOL", active: true },
    { tokenName: "USDT", active: true },
    { tokenName: "USDC", active: false },
    { tokenName: "ETC", active: false },
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
        <FlagNavigation onClick={(direction: number) => setSlideIndex(slideIndex + direction)}/>
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
