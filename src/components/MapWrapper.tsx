import Map, {
  Layer,
  LngLatBoundsLike,
  Source,
  LayerProps,
} from "react-map-gl/maplibre";
import { Fragment, useEffect, useMemo, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import { Alert } from "react-bootstrap";

const NO2_LEFT_EDGE = -11.6895;
const NO2_TOP_EDGE = 60.3369;
const NO2_RIGHT_EDGE = 3.8672;
const NO2_BOTTOM_EDGE = 48.3838;

const allowedMapLayers = ["coalSeams", "income"] as const;
type AllowedMapLayer = (typeof allowedMapLayers)[number];

const mapTranslations: {
  [lang: string]: Record<AllowedMapLayer | "no2" | "none", string>;
} = {
  en: {
    coalSeams: "Coal seams",
    income: "Regional income",
    no2: "Show nitrogen dioxide data:",
    none: "none",
  },
  cy: {
    coalSeams: "Gwythiennau glo",
    income: "Incwm rhanbarthol",
    no2: "Dangos data nitrogen deuocsid:",
    none: "dim",
  },
};

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

export function MapWrapper({ lang }: { lang: string }) {
  const [mapLayers, setMapLayers] = useState<Layer[]>([]);
  const [shownImage, setShownImage] = useState<string | null>(null);

  const [shownMapLayers, setShownMapLayers] = useState<AllowedMapLayer[]>([
    "coalSeams",
    "income",
  ]);

  useEffect(() => {
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
            // linear scale
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

  const translation = useMemo(() => mapTranslations[lang], [lang]);

  return (
    <div
      style={{
        display: "flex",
        gap: 60,
        alignItems: "center",
      }}
    >
      <Map
        // initialViewState={{
        //   latitude: 54.6633126,
        //   longitude: -2.7608274,
        //   zoom: 5,
        // }}
        style={{ width: "100%", height: "90vh", flexGrow: 1 }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        maxBounds={UK_BOUNDS}
      >
        {mapLayers.map(({ data, layerProps }) => (
          <Source type="geojson" key={layerProps.id} data={data}>
            <Layer
              {...layerProps}
              layout={{
                ...layerProps.layout,
                visibility: shownMapLayers.includes(
                  layerProps.id as AllowedMapLayer
                )
                  ? "visible"
                  : "none",
              }}
            />
          </Source>
        ))}
        <Source
          type="image"
          url={`/NO2_images/${shownImage} NO2 crop.png`}
          coordinates={NO2_IMAGE_COORDS}
        >
          <Layer
            id="geoff"
            type="raster"
            paint={{ "raster-opacity": shownImage !== null ? 0.5 : 0 }}
          />
        </Source>
        {/* <Marker longitude={-2.7608274} latitude={54.6633126} color="red" /> */}
      </Map>
      <Alert variant="info" style={{ width: 400 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "260px 1fr",
            rowGap: 20,
          }}
        >
          {allowedMapLayers.map((l) => (
            <Fragment key={l}>
              <div className="py-1">{translation[l]}</div>
              <div>
                <input
                  type="checkbox"
                  id={`${l}-checkbox`}
                  checked={shownMapLayers.includes(l)}
                  onClick={() => {
                    setShownMapLayers((layers) => {
                      const layersWithoutCurrent = layers.filter(
                        (a) => a !== l
                      );

                      const value = (
                        document.getElementById(
                          `${l}-checkbox`
                        ) as HTMLInputElement
                      ).checked;

                      if (value) {
                        return [...layersWithoutCurrent, l];
                      }
                      return layersWithoutCurrent;
                    });
                  }}
                />
              </div>
            </Fragment>
          ))}
          <div className="py-1">{translation.no2}</div>
          <select
            onChange={(e) => {
              setShownImage(e.target.value === "none" ? null : e.target.value);
            }}
            style={{
              padding: "8px 10px",
              borderRadius: 0,
              border: "1px solid #aaaaaa",
            }}
          >
            {["none", "2005", "2010", "2015", "2020", "2023"].map((v) => (
              <option value={v}>{v === "none" ? translation.none : v}</option>
            ))}
          </select>
        </div>
      </Alert>
    </div>
  );
}
