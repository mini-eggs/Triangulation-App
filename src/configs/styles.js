import React from "react";
import { Container, StyleProvider, getTheme } from "native-base";
import variables from "../styles/theme";

export const StylesLayer = props => {
  return (
    <StyleProvider style={getTheme(variables)}>
      <Container>
        {props.children}
      </Container>
    </StyleProvider>
  );
};
