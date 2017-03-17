import React from "react";
import { AppRegistry } from "react-native";
import { Container } from "native-base";
import { CodePushLayer } from "./configs/codepush";
import { ReduxLayer } from "./configs/redux";
import { FirebaseLayer } from "./configs/firebase";
import { ModalLayer } from "./configs/modal";
import { RoutingLayer } from "./routes/";

const Triangly = () => {
  return (
    <CodePushLayer>
      <ReduxLayer>
        <FirebaseLayer>
          <Container>
            <RoutingLayer />
            <ModalLayer />
          </Container>
        </FirebaseLayer>
      </ReduxLayer>
    </CodePushLayer>
  );
};

AppRegistry.registerComponent("Triangly", () => Triangly);
