import Map, {
  Layer,
  LngLatBoundsLike,
  Marker,
  Source,
} from "react-map-gl/maplibre";
import { useEffect, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";

type Layer = { name: string; index: number; data: object };

async function loadMap(
  {
    name,
    layerIndex,
    fileName,
  }: { name: string; layerIndex: number; fileName: string },
  setData: React.Dispatch<React.SetStateAction<Layer[]>>
) {
  const res = await fetch(`/maps/${fileName}.geojson`);

  const json = await res.json();

  setData((input) => {
    const current = input.filter((i) => i.name !== name);

    return [
      ...current.filter((l) => l.index < layerIndex),
      { name, index: layerIndex, data: json },
      ...current.filter((l) => l.index >= layerIndex),
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
    //   { name: "basemap", layerIndex: 0, fileName: "old_britain" },
    //   setMapLayers
    // );
    loadMap(
      { name: "coalSeams", layerIndex: 1, fileName: "coal_seams" },
      setMapLayers
    );
  }, []);

  console.log(mapLayers);

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
      {mapLayers.map(({ name, data }) => (
        <Source type="geojson" key={name} data={data}>
          <Layer id={name} type="fill" />
        </Source>
      ))}
      <Marker longitude={-2.7608274} latitude={54.6633126} color="red" />
    </Map>
  );
}
