import Map, {
  Layer,
  LngLatBoundsLike,
  // Marker,
  Source,
  LayerProps,
} from "react-map-gl/maplibre";
import { useEffect, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import { Stack } from "react-bootstrap";

const NO2_LEFT_EDGE = -11.6895;
const NO2_TOP_EDGE = 60.3369;
const NO2_RIGHT_EDGE = 3.8672;
const NO2_BOTTOM_EDGE = 48.3838;

const NO2_IMAGE_COORDS: [
  [number, number],
  [number, number],
  [number, number],
  [number, number]
] = [
  [NO2_LEFT_EDGE, NO2_TOP_EDGE],
  [NO2_RIGHT_EDGE, NO2_TOP_EDGE],
  [NO2_RIGHT_EDGE, NO2_BOTTOM_EDGE],
  [NO2_LEFT_EDGE, NO2_BOTTOM_EDGE],
];

type Layer = {
  index: number;
  data: object;
  layerProps: LayerProps;
};

async function loadMap(
  layerProps: LayerProps,
  layerIndex: number,
  fileName: string,
  setData: React.Dispatch<React.SetStateAction<Layer[]>>
) {
  const res = await fetch(`/maps/${fileName}.geojson`);

  const json = await res.json();

  setData((input) => {
    const current = input.filter((i) => i.layerProps.id !== layerProps.id);

    return [
      ...current.filter((l) => l.index <= layerIndex),
      {
        index: layerIndex,
        data: json,
        layerProps,
      },
      ...current.filter((l) => l.index > layerIndex),
    ];
  });
}

const UK_BOUNDS: LngLatBoundsLike = [
  { lat: 49.070649, lng: -24 },
  { lat: 61.106236, lng: 16 },
];

export function MapWrapper() {
  const [mapLayers, setMapLayers] = useState<Layer[]>([]);
  const [shownImage, setShownImage] = useState<string | null>(null);

  useEffect(() => {
    // loadMap(
    //   { name: "basemap", layerIndex: 0, fileName: "britain_standard" },
    //   setMapLayers
    // );
    loadMap(
      {
        id: "coalSeams",
        type: "fill",
        paint: {
          "fill-color": ["rgba", 0, 0, 0, 0.15],
        },
      },
      1,
      "coal_seams",
      setMapLayers
    );
    loadMap(
      {
        id: "income",
        type: "fill",
        paint: {
          "fill-color": [
            "rgba",
            128,
            0,
            0,
            // min: 13000, max 63300
            // ["-", 1, ["/", ["-", ["get", "GDHI"], 13000], 63300 - 13000]],
            // log scale
            [
              "-",
              1,
              [
                "*",
                [
                  "/",
                  ["log2", ["-", ["get", "GDHI"], 13000 - 1]],
                  ["log2", 63300 - 12999],
                ],
                1,
              ],
            ],
          ],
        },
      },
      2,
      "gros_domestic_household_income_by_region",
      setMapLayers
    );
  }, []);

  return (
    <Stack direction="horizontal">
      <Map
        // initialViewState={{
        //   latitude: 54.6633126,
        //   longitude: -2.7608274,
        //   zoom: 5,
        // }}
        style={{ width: "60vw", height: "100vh" }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        maxBounds={UK_BOUNDS}
      >
        {mapLayers.map(({ data, layerProps }) => (
          <Source type="geojson" key={layerProps.id} data={data}>
            <Layer {...layerProps} />
          </Source>
        ))}
        <Source
          type="image"
          url={`/NO2_images/${shownImage ?? "2005"} NO2 crop.png`}
          coordinates={NO2_IMAGE_COORDS}
        >
          <Layer
            id="geoff"
            type="raster"
            paint={{ "raster-opacity": shownImage !== null ? 1 : 0 }}
          />
        </Source>
        {/* <Marker longitude={-2.7608274} latitude={54.6633126} color="red" /> */}
      </Map>
      <select
        onChange={(e) => {
          setShownImage(e.target.value === "none" ? null : e.target.value);
        }}
      >
        <option value="none">none</option>
        <option value="2005">2005</option>
        <option value="2010">2010</option>
        <option value="2015">2015</option>
        <option value="2020">2020</option>
        <option value="2023">2023</option>
      </select>
    </Stack>
  );
}
