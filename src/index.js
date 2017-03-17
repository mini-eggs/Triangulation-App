import React from "react";
import { AppRegistry } from "react-native";
import { CodePushLayer } from "./configs/codepush";
import { ReduxLayer } from "./configs/redux";
import { FirebaseLayer } from "./configs/firebase";
import { ModalLayer } from "./configs/modal";
import { StylesLayer } from "./configs/styles";
import { RoutingLayer } from "./routes/";

const Triangly = () => {
  return (
    <CodePushLayer>
      <ReduxLayer>
        <FirebaseLayer>
          <StylesLayer>
            <RoutingLayer />
            <ModalLayer />
          </StylesLayer>
        </FirebaseLayer>
      </ReduxLayer>
    </CodePushLayer>
  );
};

AppRegistry.registerComponent("Triangly", () => Triangly);
