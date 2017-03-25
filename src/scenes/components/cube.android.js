import React from "react";
import { View, Text, Dimensions, Image } from "react-native";
import { Spinner } from "native-base";
import Swiper from "react-native-swiper";
import FadeIn from "@expo/react-native-fade-in-image";

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
    margin: 25,
    marginBottom: 60
  }
};

const swiperOptions = {
  height: Dimensions.get("window").height - 65 - 65,
  showsButtons: false,
  autoplay: true,
  autoplayTimeout: 5,
  loop: true,
  dotStyle: { marginLeft: 5, marginRight: 5 },
  dotColor: "rgba(0,0,0,0.25)",
  activeDotStyle: { marginLeft: 5, marginRight: 5 },
  activeDotColor: "rgba(0,0,0,0.5)"
};

function RenderImage({ image }) {
  return (
    <FadeIn
      renderPlaceholderContent={<Spinner color="#000" />}
      placeholderStyle={styles.placeholderStyle}
      style={styles.FadeIn}
    >
      <Image style={styles.Image} resizeMode="cover" source={{ uri: image }} />
    </FadeIn>
  );
}

export function DiscoverCube({ images }) {
  return (
    <Swiper {...swiperOptions}>
      {images.slice(0, 6).map((image, index) => {
        return <RenderImage key={index} image={image} />;
      })}
    </Swiper>
  );
}
