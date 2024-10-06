import { Stack } from "react-bootstrap";

export default function Box({ content }: { content: any }) {
  return (
    <Stack
      justify-content-center
      align-items-center
      className="justify-content-center align-items-center vw-100 vh-100"
      //   style={
      //     {
      //       // backgroundColor: content.colour,
      //     }
      //   }
    >
      <h1>{content.id}</h1>
    </Stack>
  );
}
