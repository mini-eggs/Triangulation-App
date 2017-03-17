import React from "react";
import { Container } from "native-base";
import { MemoryRouter, Route } from "react-router";
import { DiscoverContainer } from "../containers/discover";
import { WorkshopContainer } from "../containers/workshop";

export const RoutingLayer = () => {
  return (
    <MemoryRouter>
      <Container>
        <Route exact path="/" component={DiscoverContainer} />
        <Route exact path="/workshop" component={WorkshopContainer} />
      </Container>
    </MemoryRouter>
  );
};
