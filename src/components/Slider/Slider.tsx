import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";
import styled from "@emotion/styled";
import { Slide } from "./Slide";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: inherit;
  min-height: 760px;
`;

class CustomCarousel extends Carousel {
  render() {
    const { animationConfig, offsetRadius } = this.props;

    return (
      <Wrapper>
        {this.getPresentableSlides().map(
          (slide: any, presentableIndex: number) => (
            <Slide
              key={slide.key}
              content={slide.content}
              onClick={slide.onClick}
              isParellel={slide.isParellel}
              offsetRadius={this.clampOffsetRadius(offsetRadius)}
              index={presentableIndex}
              animationConfig={animationConfig}
            />
          )
        )}
      </Wrapper>
    );
  }
}

interface SliderProps {
  slides: any[]
  index: number
  style?: { [key: string]: any }
}

export default function Slider({ slides, index, style }: SliderProps) {
  return (
    <div style={{
      ...style,
    }}>
      <CustomCarousel
        slides={slides}
        goToSlide={index}
        offsetRadius={3}
        showNavigation={true}
        animationConfig={config.gentle}
      />
    </div>
  );
}
