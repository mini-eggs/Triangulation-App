import React, { Component } from "react";
import { View, Image, Text } from "react-native";
import FadeIn from "@expo/react-native-fade-in-image";
import { CustomSpinner } from "./swiper";

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

  constructor (props) {
    super(props)
    this.state = { show: true }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.image !== this.props.image) {
      this.setState(() => {
        return { show: false }
      }, () => {
        this.setState(() => {
          return { show: true }
        })
      })
    }
  }
  
  image () {
    return (
      <FadeIn
        renderPlaceholderContent={<CustomSpinner />}
        placeholderStyle={styles.placeholderStyle}
        style={styles.FadeIn}
      >
        <Image
          style={styles.Image}
          resizeMode="contain"
          source={{ uri: this.props.image }}
        />
      </FadeIn>
    );
  }

  render () {
    // hax to show the user
    // we're loading on setting
    // change after use hits
    // the apply button
    return this.state.show ? this.image() : null
  }

};
