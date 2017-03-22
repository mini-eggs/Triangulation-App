import React, { Component } from "react";
import { Actions } from "react-native-router-flux";

export class HomeScreen extends Component {
  componentDidMount() {
    this.props.getFeaturedImages();
  }

  componentDidUpdate() {
    if (typeof this.props.image === "string") {
      Actions.workshop();
    }
  }
}
