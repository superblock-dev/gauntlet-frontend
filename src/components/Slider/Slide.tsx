import { Spring } from "react-spring/renderprops";

interface IProps {
  content: JSX.Element;
  onClick?: () => void;
  offsetRadius: number;
  isParellel?: boolean;
  index: number;
  animationConfig: object;
}

export function Slide({
  content,
  offsetRadius,
  index,
  animationConfig,
  isParellel,
  onClick
}: IProps) {
  const offsetFromCenter = index - offsetRadius;
  const totalPresentables = 2 * offsetRadius + 1;
  const distanceFactor = 1 - Math.abs(offsetFromCenter / (offsetRadius + 1));
  const translateXoffset =
    60 * Math.cos(Math.abs(offsetFromCenter * 2.5) / (offsetRadius + 1));
  const translateYoffset = 37.5 * Math.sin(Math.abs(offsetFromCenter) / (offsetRadius + 1));
  let translateX = -50;
  let translateY = -50;

  if (offsetRadius !== 0) {
    if (index === 0) {
      translateX = 0;
    } else if (index === totalPresentables - 1) {
      translateX = -100;
    }
  }

  if (offsetFromCenter > 0) {
    translateX += translateXoffset;
    translateY -= translateYoffset;
  } else if (offsetFromCenter < 0) {
    translateX -= translateXoffset;
    translateY -= translateYoffset;
  }

  const transform = isParellel ?
    `translateX(${translateX}%) scale(${Math.abs(offsetFromCenter) < 2 ? 1.0 : 0.813}` :
    `translateY(${translateY}%) translateX(${translateX}%) scale(${Math.abs(offsetFromCenter) < 2 ? 1.0 : 0.813})`

  return (
    <Spring
      to={{
        transform: transform,
        left: `${offsetRadius === 0 ? 50 : 50 + (offsetFromCenter * 50) / offsetRadius
          }%`,
        opacity: distanceFactor,
        transition: "0.3s ease-out",
      }}
      config={animationConfig}
    >
      {style => (
        <div
          style={{
            ...style,
            position: 'absolute',
            top: `${isParellel ? '0%' : '50%'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transformOrigin: '50% 50%',
            zIndex: Math.abs(Math.abs(offsetFromCenter) - 2),
            visibility: Math.abs(offsetFromCenter) < 3 ? "visible" : "hidden",
          }}
          onClick={onClick}
        >
          {content}
        </div>
      )
      }
    </Spring >
  );
}