import React from "react";
import { Scene, Router } from "react-native-router-flux";
import { DiscoverContainer } from "../containers/discover";
import { VoteContainer } from "../containers/vote";
import { AboutContainer } from "../containers/about";
import { WorkshopContainer } from "../containers/workshop";

export const RoutingLayer = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene
          type="replace"
          hideNavBar
          key="discover"
          component={DiscoverContainer}
        />
        <Scene type="replace" hideNavBar key="vote" component={VoteContainer} />
        <Scene hideNavBar key="workshop" component={WorkshopContainer} />
        <Scene
          type="replace"
          hideNavBar
          key="about"
          component={AboutContainer}
        />
      </Scene>
    </Router>
  );
};
