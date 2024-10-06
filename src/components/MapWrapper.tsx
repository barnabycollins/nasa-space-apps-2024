import Map, {
  Layer,
  LngLatBoundsLike,
  Marker,
  Source,
  LayerProps,
} from "react-map-gl/maplibre";
import { useEffect, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";

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
      {/* <Marker longitude={-2.7608274} latitude={54.6633126} color="red" /> */}
    </Map>
  );
}
