import React from "react";
import { Scene, Router } from "react-native-router-flux";
import { DiscoverContainer as Discover } from "../containers/discover";
import { VoteContainer as Vote } from "../containers/vote";
import { AboutScene as About } from "../scenes/about";
import { WorkshopContainer as Workshop } from "../containers/workshop";

export const RoutingLayer = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene type="replace" hideNavBar key="discover" component={Discover} />
        <Scene type="replace" hideNavBar key="vote" component={Vote} />
        <Scene type="push" hideNavBar key="workshop" component={Workshop} />
        <Scene type="replace" hideNavBar key="about" component={About} />
      </Scene>
    </Router>
  );
};
