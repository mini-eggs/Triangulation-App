import React, { Component } from "react";
import { View, Image, Text, Animated } from "react-native";
import { Spinner } from "native-base";
import FadeIn from "@expo/react-native-fade-in-image";
import { fixImages } from "../../utilities/";

const time = 250;

const styles = {
  placeholderStyle: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  FadeIn: {
    backgroundColor: "white",
    flex: 1
  },
  Image: {
    flex: 1,
    margin: 25
  }
};

export class Exhibit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: props.image,
      show: false,
      fade: new Animated.Value(0)
    };
  }

  componentDidMount() {
    this.fadeIn();
  }

  componentWillReceiveProps(nextProps) {
    if (
      typeof nextProps.image === "undefined" &&
      typeof this.state.image !== "undefined"
    ) {
      this.fadeOut();
      setTimeout(
        () => {
          this.setState(
            () => {
              return { show: false, image: undefined };
            },
            () => {
              this.fadeIn();
            }
          );
        },
        time
      );
    } else if (nextProps.image !== this.state.image) {
      this.fadeOut();
      setTimeout(
        () => {
          this.setState(() => {
            return { image: nextProps.image, show: true };
          });
        },
        time
      );
    }
  }

  fadeOut() {
    Animated.timing(this.state.fade, {
      toValue: 0,
      duration: time
    }).start();
  }

  fadeIn() {
    Animated.timing(this.state.fade, {
      toValue: 1,
      duration: time
    }).start();
  }

  renderImage() {
    return (
      <Image
        onLoadEnd={() => {
          this.fadeIn();
        }}
        style={styles.Image}
        resizeMode="contain"
        source={{ uri: fixImages([this.state.image])[0] }}
      />
    );
  }

  render() {
    return (
      <Animated.View style={{ flex: 1, opacity: this.state.fade }}>
        {this.state.show
          ? this.renderImage()
          : <Spinner style={{ flex: 1 }} color="#000" />}
      </Animated.View>
    );
  }
}
