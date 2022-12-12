import React from "react";
import { Drawer as MaterialDrawer } from "@material-ui/core";
import { DRAWER_ANCHOR } from "../constants";

function Drawer({ data }) {
  return (
    <MaterialDrawer
      variant="persistent"
      anchor={DRAWER_ANCHOR}
      open={!!data}
    //   onClose={toggleDrawer(anchor, false)}
    >
      data
    </MaterialDrawer>
  );
}

export default Drawer;
