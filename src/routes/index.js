import React from "react";
import { View, Text } from "react-native";
import { MemoryRouter, Route } from "react-router";
import { DiscoverContainer } from "../containers/discover";
import { WorkshopContainer } from "../containers/workshop";

export const RoutingLayer = () => {
  return (
    <MemoryRouter>
      <View style={{ flex: 1 }}>
        <Route exact path="/" component={DiscoverContainer} />
        <Route exact path="/workshop" component={WorkshopContainer} />
        <Route exact path="/test" component={() => <Text>test</Text>} />
      </View>
    </MemoryRouter>
  );
};
