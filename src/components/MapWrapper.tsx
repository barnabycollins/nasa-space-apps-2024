import Map, { Layer, Marker, Source } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useState } from "react";

async function loadMap(
  setData: React.Dispatch<React.SetStateAction<object | null>>
) {
  const res = await fetch("/maps/Britain_plan_map.geojson");

  const json = await res.json();

  setData(json);
}

export function MapWrapper() {
  const [mapData, setMapData] = useState<null | object>(null);

  useEffect(() => {
    loadMap(setMapData);
  }, []);

  return (
    <Map
      initialViewState={{
        latitude: 54.6633126,
        longitude: -2.7608274,
        zoom: 5,
      }}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
    >
      <Source type="geojson" data={mapData}>
        <Layer id="bob" type="fill" />
      </Source>
      <Marker longitude={54.6633126} latitude={-2.7608274} color="red" />
    </Map>
  );
}
