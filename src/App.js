import React, { useContext, useEffect, useState } from "react";
import Map from "./components/Map";
import Drawer from "./components/Drawer";
import NasaService from "./services/NasaService";
import { NasaContext } from "./NasaContext/NasaContext";
import { LOAD_CATEGORIES, LOAD_EVENTS } from "./NasaContext/NasaContextActionsType";

const App = () => {
  const [currentEvent, setCurrentEvent] = useState();
  const { state, dispatch } = useContext(NasaContext);

  useEffect(() => {
    NasaService.getEvents(5).then((events) => {
      if (!events) return;
      dispatch({ type: LOAD_EVENTS, payload: events });
    });
    NasaService.getCategories().then((categories)=>{
      if (!categories) return;
      dispatch({type:LOAD_CATEGORIES, payload: categories})
    })
  }, []);

  return (
    <div className="app">
      <Map onClick={setCurrentEvent} data={state.events?.events} />
      <Drawer data={currentEvent} />
    </div>
  );
};

export default App;
