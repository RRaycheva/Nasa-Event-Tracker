import React, { useCallback, useEffect, useMemo, useState } from "react";
import DeckGL from "@deck.gl/react";
import { Map as MapBox } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FlyToInterpolator, IconLayer } from "deck.gl";
import {
  MAP_STYLE,
  MAP_ICON,
  MAP_TRANSITION_DURATION,
  DEFAULT_ICON_SIZE,
} from "../constants";
import { getPosition } from "../utils";

const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 128, height: 128, mask: true },
};

const Map = ({ data, onClick, onMapClick, viewStateOptions }) => {
  const [viewState, setViewState] = useState({
    longitude: 0,
    latitude: 0,
    zoom: 0,
  });

  useEffect(() => {
    setViewState((current) => ({
      ...current,
      ...viewStateOptions,
      transitionDuration: MAP_TRANSITION_DURATION,
      transitionInterpolator: new FlyToInterpolator(),
    }));
  }, [viewStateOptions]);

  const layer = useMemo(
    () =>
      new IconLayer({
        id: "IconLayer",
        data,
        getIcon: () => "marker",
        getPosition,
        onClick,
        getSize: DEFAULT_ICON_SIZE,
        iconAtlas: MAP_ICON,
        iconMapping: ICON_MAPPING,
        sizeScale: 8,
        pickable: true,
      }),
    [data, onClick]
  );

  const getTooltip = useCallback(({ object }) => {
    return object && `${object.title}`;
  }, []);

  return (
    <DeckGL
      viewState={viewState}
      onViewStateChange={(e) => setViewState(e.viewState)}
      controller={true}
      getTooltip={getTooltip}
      layers={layer}
      onClick={onMapClick}
    >
      <MapBox
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle={MAP_STYLE}
      />
    </DeckGL>
  );
};

export default Map;
