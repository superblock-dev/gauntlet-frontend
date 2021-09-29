import React from "react";
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";
import styled from "@emotion/styled";
import { Slide } from "./Slide";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 760px;
`;

class CustomCarousel extends Carousel {
  render() {
    const { animationConfig, offsetRadius } = this.props;

    return (
      <React.Fragment>
        <Wrapper>
          {this.getPresentableSlides().map(
            (slide: any, presentableIndex: number) => (
              <Slide
                key={slide.key}
                content={slide.content}
                onClick={slide.onClick}
                offsetRadius={this.clampOffsetRadius(offsetRadius)}
                index={presentableIndex}
                animationConfig={animationConfig}
              />
            )
          )}
        </Wrapper>
      </React.Fragment>
    );
  }
}

interface SliderProps {
  slides: any[]
  index: number
}

export default function Slider({ slides, index }: SliderProps) {
  return (
    <CustomCarousel
      slides={slides}
      goToSlide={index}
      offsetRadius={3}
      showNavigation={true}
      animationConfig={config.gentle}>
    </CustomCarousel>
  );
}
