import { ReactNode, useEffect, useRef, useState } from "react";
import Slider from "react-slick";

export default function Stack({
  children,
  boxOpen,
}: {
  children: ReactNode[];
  boxOpen?: boolean;
}) {
  const [slideIndex, setSlideIndex] = useState(0);
  const sliderRef = useRef<Slider | null>(null);

  useEffect(() => {
    if (boxOpen) {
      sliderRef.current?.slickGoTo(1);
    }
  }, [boxOpen]);

  return (
    <div className="vh-100 vw-100">
      <Slider
        ref={sliderRef}
        className="slider-fullscreen"
        // className="vh-100 vw-100"
        vertical={!boxOpen}
        slidesToShow={1}
        slidesToScroll={1}
        arrows={!boxOpen || slideIndex === 0}
        dots={!boxOpen || slideIndex === 0}
        speed={500}
        beforeChange={(_, next) => setSlideIndex(next)}
      >
        {...children}
      </Slider>
    </div>
  );
}
