import { BoxData, PageData } from "../constants/content";
import TitleLayout from "./layouts/Title";
import HorizontalStackLayout from "./layouts/HorizontalStack";

export default function Box({
  data,
}: //   overflow,
//   page,
{
  //   overflow: boolean;
  data: BoxData;
  //   page?: number;
}) {
  //   const elementsRef = useRef(data.content.map(() => createRef()));
  const getLayout = (pageData: PageData) => {
    switch (pageData.layout) {
      case "title":
        return <TitleLayout data={pageData} />;
      case "horizontal-stack":
        return <HorizontalStackLayout data={pageData} />;
    }
  };

  const noOfPages = data.content.length;
  return (
    <div
      style={{ width: "100vw", height: "100vh" }}
      className="overflow-scroll"
    >
      <div
        style={{
          backgroundColor: data.colour ?? "",
          height: "100vh",
          width: `${noOfPages}00vw`,
        }}
        className="d-flex"
      >
        {data.content.map((pageData) => (
          <div
            key={pageData.id}
            style={{ width: "100vw", height: "100vh" }}
            // ref={elementsRef.current[i]}
          >
            {getLayout(pageData)}
          </div>
        ))}
      </div>
    </div>
  );
}
