import React from "react";
import DeckGL from "@deck.gl/react";
import { Map as MapBox } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { IconLayer } from "deck.gl";
import { MAP_STYLE, MAP_ICON } from "../constants";


const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 128, height: 128, mask: true },
};

const Map = ({ data, onClick}) => {
  // Viewport settings
  const INITIAL_VIEW_STATE = {
    longitude: 23.319941,
    latitude: 42.698334,
    zoom: 5,
  };


 
  const layer = new IconLayer({
    id: "IconLayer",
    data,
    getIcon: () => "marker",
    getPosition: (currentData) => {
      const coordinates =  currentData.geometries.map((el)=>{
        return el.coordinates;
      })
      return coordinates;
    },
    onClick,
    getSize: () => 5,
    iconAtlas: MAP_ICON,
    iconMapping: ICON_MAPPING,
    sizeScale: 8,
    pickable: true,
  });

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      getTooltip={({object}) => object && `${object.name}\n${object.address}`} 
      layers={layer}
    >
      <MapBox
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle={MAP_STYLE}
      />
    </DeckGL>
  );
};

export default Map;
