import React from "react";
import { Scene, Router } from "react-native-router-flux";
import { DiscoverContainer } from "../containers/discover";
import { WorkshopContainer } from "../containers/workshop";

export const RoutingLayer = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene hideNavBar key="discover" component={DiscoverContainer} />
        <Scene hideNavBar key="workshop" component={WorkshopContainer} />
      </Scene>
    </Router>
  );
};
