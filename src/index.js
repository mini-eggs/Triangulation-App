import React from "react";
import { AppRegistry } from "react-native";
import { CodePushLayer } from "./configs/codepush";
import { ReduxLayer } from "./configs/redux";
import { FirebaseLayer } from "./configs/firebase";
import { ModalLayer } from "./configs/modal";
import { StylesLayer } from "./configs/styles";
import { TriangulateLayer } from "./configs/triangulate";
import { RoutingLayer } from "./routes/";

function Triangly() {
  return (
    <CodePushLayer>
      <ReduxLayer>
        <StylesLayer>
          <RoutingLayer />
          <ModalLayer />
          <FirebaseLayer />
          <TriangulateLayer />
        </StylesLayer>
      </ReduxLayer>
    </CodePushLayer>
  );
}

AppRegistry.registerComponent("Triangly", () => Triangly);
