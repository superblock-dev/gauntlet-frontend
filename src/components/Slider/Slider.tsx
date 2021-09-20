import React, { useEffect, useState } from "react";
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";
import { v4 as uuidv4 } from "uuid";
import styled from "@emotion/styled";
import { Slide } from "./Slide";
import Flag from "components/Vaults/Flag";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

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

const urls = [
    "https://images.unsplash.com/photo-1590004953392-5aba2e72269a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
    "https://images.unsplash.com/photo-1590004845575-cc18b13d1d0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
    "https://images.unsplash.com/photo-1590005176489-db2e714711fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
    "https://images.unsplash.com/photo-1590004953392-5aba2e72269a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
    "https://images.unsplash.com/photo-1590004845575-cc18b13d1d0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
    "https://images.unsplash.com/photo-1590005176489-db2e714711fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
    "https://images.unsplash.com/photo-1590004953392-5aba2e72269a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
    "https://images.unsplash.com/photo-1590004845575-cc18b13d1d0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
    "https://images.unsplash.com/photo-1590005176489-db2e714711fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
    "https://images.unsplash.com/photo-1590004953392-5aba2e72269a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
    "https://images.unsplash.com/photo-1590004845575-cc18b13d1d0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
    "https://images.unsplash.com/photo-1590005176489-db2e714711fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
];

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
    onChange?: (index: number) => void
}

export default function Slider({ onChange }: SliderProps) {
    const [ slideIndex, setSlideIndex ] = useState(0);

    useEffect(() => {
        if (onChange) onChange(slideIndex);
    }, [slideIndex])

    const slides = urls.map((_, i) => {
        return createSlide(slideIndex, i, () => setSlideIndex(i));
    });

    return (
        <CustomCarousel
            slides={slides}
            goToSlide={slideIndex}
            offsetRadius={3}
            showNavigation={true}
            animationConfig={config.gentle}>
        </CustomCarousel>
    );
}
