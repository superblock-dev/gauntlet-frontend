import { TokenName } from "types";
import { STONES } from "utils/stones";
import { REWARD_LP_TOKENS } from "utils/tokens";

interface StoneProps {
  tokenName: TokenName;
  size: 'small' | 'normal' | 'xlarge' | 'xxlarge';
  style?: {[key: string]: any},
}

export default function Stone({ tokenName, size, style }: StoneProps) {
  let length = 48;
  switch (size) {
    case 'small':
      length = 24;
      break;
    case 'xlarge':
      length = 80;
      break;
    case 'xxlarge':
      length = 120;
      break;
    default:
      length = 48;
      break;
  }

  if (REWARD_LP_TOKENS.includes(tokenName)) {
    const firstToken = tokenName.split("-")[0];
    const secondToken = tokenName.split("-")[1];
    const stone1 = STONES[firstToken][size];
    const stone2 = STONES[secondToken][size];

    return (
      <div style={{
        position: 'relative',
        width: `${length * 3 / 2}px`,
        height: `${length}px`,
        ...style,
      }}>
        <img
          src={stone2}
          style={{
            position: "absolute",
            top: '50%',
            right: "33.3%",
            transform: "translate(50%, -50%)",
          }}
        />
        <img
          src={stone1}
          style={{
            position: "absolute",
            top: '50%',
            left: '33.3%',
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    )
  }
  const stone = STONES[tokenName][size]
  return (
    <div style={{
      position: 'relative',
      width: `${length}px`,
      height: `${length}px`,
      ...style,
    }}>
      <img src={stone}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }} />
    </div>
  )
}