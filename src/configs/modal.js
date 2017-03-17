import React, { Component } from "react";
import { connect } from "react-redux";
import Toast from "react-native-root-toast";
import { ModalActions } from "../actions/";

class ModalComponent extends Component {
  shouldComponentUpdate() {
    return false;
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.messages.length > 0) {
      const message = nextprops.messages[0];
      Toast.show(message.text, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: false,
        animation: true,
        hideOnPress: true,
        onHidden: () => {
          nextprops.removeMessage();
        }
      });
    }
  }

  render() {
    return null;
  }
}

const stateToProps = state => {
  return {
    messages: state.ModalReducer.messages
  };
};

const actionsToProps = dispatch => {
  return {
    removeMessage: () => dispatch(ModalActions.removeMessage())
  };
};

export const ModalLayer = connect(stateToProps, actionsToProps)(ModalComponent);
