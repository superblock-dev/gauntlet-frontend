import React, { useEffect, useState } from "react";
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";
import styled from "@emotion/styled";
import { Slide } from "./Slide";

import leftNavigation from "../../assets/svgs/big-arrow-left.svg";
import rightNavigation from "../../assets/svgs/big-arrow-right.svg";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const NavigationButtons = styled.div`
  position: absolute;
  display: flex;
  height: 40px;
  top: 38.5%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  margin-top: 1rem;
  justify-content: space-between;
  img {
    height: 100%;
  }
`;

class CustomCarousel extends Carousel {
    render() {
        const { animationConfig, offsetRadius, showNavigation } = this.props;

        let navigationButtons = null;
        if (showNavigation) {
          navigationButtons = (
            <NavigationButtons>
              <img
                src={leftNavigation}
                onClick={() => this.moveSlide(-1)}
                style={{ marginRight: "2rem" }}
              />
    
              <img
                src={rightNavigation}
                onClick={() => this.moveSlide(1)}
                style={{ marginLeft: "2rem" }}
              />
            </NavigationButtons>
          );
        }

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
              {navigationButtons}
            </Wrapper>
          </React.Fragment>
        );
      }
}

interface SliderProps {
    slides: any[]
    index?: number
    // onChange?: (index: number) => void
}

export default function Slider({ slides, index }: SliderProps) {
    console.log(slides);
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
