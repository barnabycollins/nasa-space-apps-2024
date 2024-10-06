import { PageData } from "../../constants/content";

export default function TitleLayout({ data }: { data: PageData }) {
  const titleData = data.content.find((c) => c.type === "title");
  return (
    <div className="d-flex w-100 h-100 align-items-center justify-content-center">
      {titleData && <h1>{titleData.text}</h1>}
    </div>
  );
}
