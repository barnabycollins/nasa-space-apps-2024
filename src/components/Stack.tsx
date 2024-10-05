import { ReactNode } from "react";
import Slider from "react-slick";

export default function BoxTree({ children }: { children: ReactNode[] }) {
  const settings = {
    vertical: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // speed: 500,
    arrows: false,
    dots: true,
  };

  return (
    <div className="vh-100 vw-100 overflow-hidde">
      <Slider
        className="slider-fullscreen"
        // className="vh-100 vw-100"
        {...settings}
      >
        {...children}
      </Slider>
    </div>
  );
}
