import React, { useContext, useEffect, useMemo, useState } from "react";
import Map from "./components/Map";
import Drawer from "./components/Drawer";
import NasaService from "./services/NasaService";
import { NasaContext } from "./NasaContext/NasaContext";
import {
  LOAD_CATEGORIES,
  LOAD_EVENTS,
} from "./NasaContext/NasaContextActionsType";

const App = () => {
  const [currentEvent, setCurrentEvent] = useState();
  const { state, dispatch } = useContext(NasaContext);

  useEffect(() => {
    NasaService.getEvents(10).then((events) => {
      if (!events) return;
      dispatch({ type: LOAD_EVENTS, payload: events });
    });

    NasaService.getCategories().then((categories) => {
      if (!categories) return;
      dispatch({ type: LOAD_CATEGORIES, payload: categories });
    });
  }, [dispatch]);

  const mapOptions = useMemo(() => {
    const coordinates = currentEvent?.coordinate;
    return {
      longitude: currentEvent ? coordinates[0] : 0,
      latitude: currentEvent ? coordinates[1] : 0,
      zoom: currentEvent ? 5 : 0,
    };
  }, [currentEvent]);

  return (
    <div className="app">
      <Map
        onClick={setCurrentEvent}
        viewStateOptions={mapOptions}
        picking
        data={state.events?.events}
        onMapClick={(e) => !e.picked && setCurrentEvent(null)}
      />
      <Drawer data={currentEvent} />
    </div>
  );
};

export default App;
