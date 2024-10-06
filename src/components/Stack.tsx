import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import Slider from "react-slick";

export default function Stack({
  children,
  boxOpen,
}: {
  children: ReactNode[];
  boxOpen?: boolean;
}) {
  const [slideIndex, setSlideIndex] = useState(0);
  let sliderRef = useRef(null);

  const settings = useMemo(() => {
    return {
      vertical: !boxOpen,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: !boxOpen || slideIndex === 0,
      dots: !boxOpen || slideIndex === 0,
      speed: 500,
      beforeChange: (current, next) => setSlideIndex(next),
    };
  }, [boxOpen, slideIndex]);

  useEffect(() => {
    if (boxOpen) {
      sliderRef.slickGoTo(1);
    }
  }, [boxOpen]);
  return (
    <div className="vh-100 vw-100">
      <Slider
        ref={(slider) => {
          sliderRef = slider;
        }}
        className="slider-fullscreen"
        // className="vh-100 vw-100"
        {...settings}
      >
        {...children}
      </Slider>
    </div>
  );
}
