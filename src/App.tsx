import "./styles/App.css";
import Box from "./components/Box";
import Stack from "./components/Stack";
import { MapWrapper } from "./components/MapWrapper";

/**
 *
 * @returns Modes:
 *
 * STACK
 * CONTENT
 * BUILDER (BUILD STACKS)
 */
function App() {
  // const boxContent = [
  //   { id: 1, colour: "red" },
  //   { id: 2, colour: "blue" },
  //   { id: 3, colour: "yellow" },
  // ];

  return (
    <main>
      {/* <Stack>
        {boxContent.map((content) => (
          <Box key={content.id} content={content} />
        ))}
      </Stack> */}
      <MapWrapper />
    </main>
  );
}

export default App;
