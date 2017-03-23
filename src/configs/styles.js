import React, { Component } from "react";
import { Animated, View } from "react-native";
import { Container, StyleProvider, getTheme } from "native-base";
import variables from "../styles/theme";

export class StylesLayer extends Component {
  constructor(props) {
    super(props);
    this.state = { fade: new Animated.Value(0) };
  }
  componentDidMount() {
    Animated.timing(this.state.fade, {
      toValue: 1,
      duration: 500
    }).start();
  }
  render() {
    return (
      <StyleProvider style={getTheme(variables)}>
        <Animated.View style={{ flex: 1, opacity: this.state.fade }}>
          {this.props.children}
        </Animated.View>
      </StyleProvider>
    );
  }
}
