import styled from "@emotion/styled";
import { Spring } from "react-spring/renderprops";

const SlideContainer = styled.div`
  position: absolute;
  height: 100%;
  top: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: 50% 50%;
  img {
    object-fit: scale-down;
    display: block;
    max-height: 100%;
  }
`;

interface IProps {
  content: JSX.Element;
  onClick?: () => void;
  offsetRadius: number;
  index: number;
  animationConfig: object;
}

export function Slide({
  content,
  offsetRadius,
  index,
  animationConfig,
  onClick
}: IProps) {
  const offsetFromCenter = index - offsetRadius;
  const totalPresentables = 2 * offsetRadius + 1;
  const distanceFactor = 1 - Math.abs(offsetFromCenter / (offsetRadius + 1));

  const translateXoffset =
    50 * (Math.abs(offsetFromCenter) / (offsetRadius + 1));
  let translateX = -50;

  if (offsetRadius !== 0) {
    if (index === 0) {
      translateX = 0;
    } else if (index === totalPresentables - 1) {
      translateX = -100;
    }
  }

  if (offsetFromCenter > 0) {
    translateX += translateXoffset;
  } else if (offsetFromCenter < 0) {
    translateX -= translateXoffset;
  }

  return (
    <Spring
      to={{
        transform: `translateY(${-50 - 0.25 * Math.abs(100 * offsetFromCenter / offsetRadius)}%) translateX(${translateX}%) scale(${distanceFactor})`,
        left: `${
          offsetRadius === 0 ? 50 : 50 + (offsetFromCenter * 50) / offsetRadius
        }%`,
        opacity: distanceFactor < 0.5 ? 0.0 : 1.0,
      }}
      config={animationConfig}
    >
      {style => (
        <SlideContainer
          style={{ ...style, zIndex: Math.abs(Math.abs(offsetFromCenter) - 2) }}
          onClick={onClick}
        >
          {content}
        </SlideContainer>
      )}
    </Spring>
  );
}