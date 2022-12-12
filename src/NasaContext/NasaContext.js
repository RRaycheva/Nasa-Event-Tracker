import { createContext, useReducer } from "react";
import { LOAD_CATEGORIES, LOAD_EVENTS } from "./NasaContextActionsType";

const initialState = {
  events: [],
  categories: [],
};

export const NasaContext = createContext({});

const loadNasaEvents = (state, payload) => {
  const updateEvents = {
    events: payload,
  };
  return { ...state, ...updateEvents };
};

const loadNasaCategories = (state, payload) => {
  const updateCategories = {
    categories: payload,
  };
  return { ...state, ...updateCategories };
};

const reducer = (state, action) => {
  switch (action.type) {
    case LOAD_EVENTS:
      return loadNasaEvents(state, action.payload);
    case LOAD_CATEGORIES:
      return loadNasaCategories(state, action.payload);
    default:
      throw new Error("Unknown action type");
  }
};

export const NasaContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <NasaContext.Provider value={{ state, dispatch }}>
      {children}
    </NasaContext.Provider>
  );
};
