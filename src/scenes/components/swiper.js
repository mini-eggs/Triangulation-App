import React from "react";
import { View, Text, Dimensions, Image } from "react-native";
import { Spinner } from "native-base";
import Swiper from "react-native-swiper";
import FadeIn from "@expo/react-native-fade-in-image";

const styles = {
  Swiper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold"
  },
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
    margin: 25,
    marginBottom: 60
  }
};

const height = Dimensions.get("window").height - 65 - 55;

const swiperOptions = {
  height: height,
  showsButtons: false,
  autoplay: true,
  loop: true,
  dotColor: "rgba(0,0,0,0.25)",
  activeDotColor: "rgba(0,0,0,0.5)"
};

export const CustomSpinner = () => {
  return <Spinner color="black" />;
};

const RenderImage = props => {
  return (
    <FadeIn
      renderPlaceholderContent={<CustomSpinner />}
      placeholderStyle={styles.placeholderStyle}
      style={styles.FadeIn}
    >
      <Image
        style={styles.Image}
        resizeMode="cover"
        source={{ uri: props.image }}
      />
    </FadeIn>
  );
};

export const DiscoverSwiper = props => {
  return (
    <Swiper style={styles.Swiper} {...swiperOptions}>
      {
        props.images.map((image, index) => {
          return <RenderImage key={index} image={image} />;
        })
      }
    </Swiper>
  );
};
