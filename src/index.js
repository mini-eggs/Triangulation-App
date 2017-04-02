import React from "react";
import { AppRegistry } from "react-native";
import { ReduxLayer } from "./configs/redux";
import { FirebaseLayer } from "./configs/firebase";
import { ModalLayer } from "./configs/modal";
import { StylesLayer } from "./configs/styles";
import { TriangulateLayer } from "./configs/triangulate";
import { RoutingLayer } from "./routes/";

function Triangly() {
  return (
    <ReduxLayer>
      <StylesLayer>
        <RoutingLayer />
        <ModalLayer />
        <FirebaseLayer />
        <TriangulateLayer />
      </StylesLayer>
    </ReduxLayer>
  );
}

AppRegistry.registerComponent("Triangly", () => Triangly);
