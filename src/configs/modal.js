import React, { Component } from "react";
import { Platform, View, Dimensions, Animated } from "react-native";
import { Text, Grid, Col, Button } from "native-base";
import { connect } from "react-redux";
import { ModalActions } from "../actions/";

const styles = {
  ToastContainer: {
    position: "absolute",
    zIndex: 99,
    width: Dimensions.get("window").width,
    alignItems: "center"
  },
  Button: {
    backgroundColor: "rgba(0,0,0,0.9)"
  },
  Text: {
    color: "white",
    textAlign: "center"
  }
};

const posBase = 50;

class ModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
      positionAnim: new Animated.Value(-999),
      message: "No message has been entered",
      midTransition: false
    };
  }

  start() {
    Animated.sequence([
      Animated.timing(this.state.positionAnim, {
        toValue: posBase,
        duration: 0
      }),
      Animated.parallel([
        Animated.timing(this.state.fadeAnim, { toValue: 1, duration: 300 }),
        Animated.timing(this.state.positionAnim, {
          toValue: posBase + 10,
          duration: 300
        })
      ])
    ]).start();
  }

  remove() {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(this.state.fadeAnim, { toValue: 0, duration: 300 }),
        Animated.timing(this.state.positionAnim, {
          toValue: posBase,
          duration: 300
        })
      ]),
      Animated.timing(this.state.positionAnim, {
        toValue: -999,
        duration: 0
      })
    ]).start();
  }

  shouldComponentUpdate() {
    return !this.state.midTransition;
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.messages.length > 0 && !this.state.midTransition) {
      const message = nextprops.messages[0];
      this.setState(
        () => {
          return { message: message.text, midTransition: true };
        },
        () => {
          this.start();
          setTimeout(
            () => {
              this.remove();
              this.props.removeMessage();
              this.setState(() => {
                return { midTransition: false };
              });
            },
            message.time + 600
          );
        }
      );
    }
  }

  render() {
    const containerStyles = Object.assign({}, styles.ToastContainer, {
      opacity: this.state.fadeAnim,
      bottom: this.state.positionAnim
    });
    return (
      <Animated.View style={containerStyles}>
        <View>
          <Button rounded style={styles.Button}>
            <Text style={styles.Text}>
              {this.state.message}
            </Text>
          </Button>
        </View>
      </Animated.View>
    );
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
