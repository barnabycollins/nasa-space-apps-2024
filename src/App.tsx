import "./styles/App.css";
import Box from "./components/Box";
import Stack from "./components/Stack";
import { MapWrapper } from "./components/MapWrapper";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import Slider from "react-slick";
import { boxesData } from "./constants/content";

/**
 *
 * @returns Modes:
 */
function App() {
  const [slideIndex, setSlideIndex] = useState(0);
  let sliderRef = useRef(null);
  const slideTo = (num: number) => sliderRef.slickGoTo(num);

  const boxOpen = false;

  // get title page of every box
  const boxCovers: ReactNode[] = boxesData.map((box) => (
    <Box key={box.id} data={box.content[0]} colour={box.colour} />
  ));

  const getBoxSlides = (index) =>
    boxesData[index].content.map((c) => (
      <Box key={c.id} data={c} colour={boxesData[index].colour} />
    ));

  // const openBoxContent = boxOpen
  //   ? boxesData[openBoxIndex].content.map((c) => (
  //       <Box key={c.id} data={c} colour={boxesData[openBoxIndex].colour} />
  //     ))
  //   : null;

  const [slides, setSlides] = useState(boxCovers);

  // useEffect(() => setSlides(openBoxContent ?? boxCovers), [openBoxContent]);

  // useEffect(() => {
  //   if (boxOpen && slideIndex === 0) {
  //     setSlides(boxCovers);
  //   }
  // }, [boxCovers, boxOpen, slideIndex]);

  const [boxPage, setBoxPage] = useState(0);

  useEffect(() => setBoxPage(0), [slideIndex]);

  const handleControls = (e) => {
    if (e.key === "ArrowDown") {
      slideTo(slideIndex + 1);
    }
    if (e.key === "ArrowUp") {
      slideTo(slideIndex - 1);
    }

    // if (e.key === "ArrowRight") {
    //   console.log("ting");
    //   setBoxPage(boxPage + 1);
    // }
    // if (e.key === "ArrowLeft") {
    //   slideTo(slideIndex - 1);
    // }
  };

  const settings = useMemo(() => {
    return {
      vertical: !boxOpen,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      dots: true,
      accessibility: false,
      speed: 500,
      beforeChange: (current, next) => setSlideIndex(next),
    };
  }, [boxOpen, slideIndex]);

  return (
    <main onKeyDown={(e) => handleControls(e)}>
      <MapWrapper />
      <Slider
        ref={(slider) => {
          sliderRef = slider;
        }}
        className="slider-fullscreen"
        {...settings}
      >
        {/* Original plan to make a modular grid sheet, with topics in rows and titles of each topic in the first column */}
        {/* {boxesData.map((box, i) => (
          <Box key={box.id} data={box} />
        ))} */}
      </Slider>
    </main>
  );
}

export default App;
