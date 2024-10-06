import "./styles/App.css";
import Box from "./components/Box";
import Stack from "./components/Stack";
import { MapWrapper } from "./components/MapWrapper";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import Slider from "react-slick";
import { boxesData } from "./constants/content";
import { Alert, Button, FormLabel, FormSelect } from "react-bootstrap";

/**
 *
 * @returns Modes:
 */
function App() {
  const [slideIndex, setSlideIndex] = useState(0);
  let sliderRef = useRef(null);
  const slideTo = (num: number) => sliderRef.slickGoTo(num);

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

  const [lang, setLang] = useState("en");

  const settings = {
    vertical: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    // accessibility: false,
    speed: 500,
    beforeChange: (current, next) => setSlideIndex(next),
  };

  const images = Array(13)
    .fill(0)
    .map((_, i) => {
      const val = lang === "en" ? `-${i + 1}` : `, Cymraeg-${i + 1}`;
      return (
        <img
          src={`./The British Coal Story - prototype${val}.svg`}
          height={100}
          width={100}
          style={{ height: "90%", width: "90%" }}
        />
      );
    });

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
    <main
      onKeyDown={(e) => handleControls(e)}
      autoFocus
      className="position-relative"
    >
      <Slider
        ref={(slider) => {
          sliderRef = slider;
        }}
        className="slider-fullscreen"
        {...settings}
      >
        <div
          className="vw-100 vh-100 d-flex justify-content-center align-items-center"
          style={{ zIndex: 3 }}
        >
          <Alert variant="info">
            <div className="m2-3 d-flex justify-items-around align-items-center">
              {lang === "en" ? (
                <span>
                  {" "}
                  Please press this <strong>arrow button</strong> to continue
                </span>
              ) : (
                <span>
                  pwyswch y bysellau saeth i barhau, os gwelwch yn dda
                </span>
              )}

              <Button
                type="button"
                variant="none"
                className=""
                onClick={() => slideTo(slideIndex + 1)}
              >
                <i className="bi bi-arrow-down-square-fill"></i>
              </Button>
            </div>
            <div className="d-flex gap-3 align-items-center">
              Language:
              <FormSelect
                onChange={(e) => setLang(e.target.value)}
                style={{ width: 130 }}
              >
                <option value="en">English</option>
                <option value="cy">Cymraeg</option>
              </FormSelect>
            </div>
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

      {slideIndex !== 0 && (
        <div
          className="position-absolute top-0 end-0 m-2 p-1"
          style={{ zIndex: 3 }}
        >
          <Alert variant="info">
            <div>
              <FormSelect onChange={(e) => setLang(e.target.value)}>
                <option value="en">English</option>
                <option value="cy">Cymraeg</option>
              </FormSelect>
            </div>
            <div className="mt-3 d-flex justify-items-around">
              <Button
                type="button"
                variant="none"
                className=""
                onClick={() => slideTo(slideIndex + 1)}
              >
                <i className="bi bi-arrow-down-square-fill"></i>
              </Button>
              <Button
                type="button"
                variant="none"
                className=""
                onClick={() => slideTo(slideIndex - 1)}
              >
                <i className="bi bi-arrow-up-square-fill"></i>
              </Button>
            </div>
          </Alert>
        </div>
      )}
    </main>
  );
}

export default App;
