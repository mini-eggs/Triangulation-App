import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { FirebaseActions } from "../actions/";

class FirebaseComponent extends Component {
  componentDidMount() {
    this.props.getVoteImages();
  }

  componentDidUpdate() {
    if (typeof this.props.image === "string") {
      Actions.workshop();
    }
  }

  render() {
    return <View />;
  }
}

export const FirebaseLayer = connect(
  state => {
    return {
      image: state.DiscoverReducer.image
    };
  },
  dispatch => {
    return {
      getVoteImages: () => dispatch(FirebaseActions.getVoteImages())
    };
  }
)(FirebaseComponent);
