import "./styles/App.css";
import Box from "./components/Box";
import Stack from "./components/Stack";
import { MapWrapper } from "./components/MapWrapper";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import Slider from "react-slick";
import { boxesData } from "./constants/content";
import { Alert } from "react-bootstrap";

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
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      slideTo(slideIndex + 1);
    }
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
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

  const images = Array(13)
    .fill(0)
    .map((_, i) => (
      <img
        src={`./The British Coal Story - prototype-${i + 1}.svg`}
        height={100}
        width={100}
        style={{ height: "90%", width: "90%" }}
      />
    ));

  // push into 2nd last position
  const show = images.slice(0, images.length - 2);
  show.push(
    <div style={{ height: "90%", width: "90%" }}>
      <MapWrapper />
    </div>
  );
  const last = images.pop();
  if (last) show.push(last);

  return (
    <main onKeyDown={(e) => handleControls(e)} autoFocus>
      <Slider
        ref={(slider) => {
          sliderRef = slider;
        }}
        className="slider-fullscreen"
        {...settings}
      >
        <div className="vh-100 vw-100 d-flex justify-content-center align-items-center">
          <Alert>
            Please press the <strong>arrow keys</strong> to continue
          </Alert>
        </div>
        {show.map((component) => (
          <div key={component.toString()} className="vh-100 vw-100">
            <div className="w-100 h-100 p-1 d-flex justify-content-center align-items-center">
              {component}
            </div>
          </div>
        ))}
        {/* Original plan to make a modular grid sheet, with topics in rows and titles of each topic in the first column */}
        {/* {boxesData.map((box, i) => (
          <Box key={box.id} data={box} />
        ))} */}
      </Slider>
    </main>
  );
}

export default App;
