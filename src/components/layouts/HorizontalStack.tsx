import { PageData } from "../../constants/content";

export default function HorizontalStackLayout({ data }: { data: PageData }) {
  const titleData = data.content.find((c) => c.type === "title");
  const titleList = data.content.find((c) => c.type === "list");

  return (
    <div className="w-100 h-100 d-flex">
      <div className="flex-grow-1 d-flex flex-column gap-3 align-items-center justify-content-center">
        {titleData && (
          <div className="w-100">
            <h2 className="text-start">{titleData.text}</h2>
          </div>
        )}
        {titleList && (
          <ul>
            {titleList.list?.map((li) => (
              <li>{li}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex-grow-1 d-flex flex-column gap-3 align-items-center justify-content-center"></div>
    </div>
  );
}
