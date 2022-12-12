import React, { useContext } from "react";
import { Button, Drawer as MaterialDrawer } from "@material-ui/core";
import {
  CATEGORIES,
  CATEGORY,
  DRAWER_ANCHOR,
  SOURCES_BUTTON_LABEL,
} from "../constants";
import "../styles/Drawer.css";
import { NasaContext } from "../NasaContext/NasaContext";
import { useId } from "react";

function Drawer({ data, onClose }) {
  const { state } = useContext(NasaContext);
  const id = useId();
  
  const getCategory = () => {
    return data?.object?.categories.map((category, index) => {
      const currentCategory =
        category.id &&
        state?.categories?.categories.find((e) => e.id === category.id);
      return (
        <div className="category" key={`${id}-${index}`}>
          <div className="title">{currentCategory?.title}</div>
          <div className="description">{currentCategory.description}</div>
        </div>
      );
    });
  };

  // implement only for demo
  const openAdditionalSources = () => {
    data?.object?.sources.forEach((source) => {
      window.open(source?.url);
    });
  };

  const categoryLabel =
    data?.object?.categories.lenght > 1 ? CATEGORIES : CATEGORY;

  return (
    <MaterialDrawer
      variant="persistent"
      anchor={DRAWER_ANCHOR}
      open={!!data}
      onClose={onClose}
    >
      <div className="drawerWrapper">
        <div className="informationWrapper">
          <div className="title">{data?.object?.title}</div>
          <div className="categoryLabel"> {`${categoryLabel}:`} </div>
          <div className="categoryWrapper">{getCategory()}</div>
        </div>
        <div className="sources-button">
          <Button variant="contained" onClick={openAdditionalSources}>
            {SOURCES_BUTTON_LABEL}
          </Button>
        </div>
      </div>
    </MaterialDrawer>
  );
}

export default Drawer;
