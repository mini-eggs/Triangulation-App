import React, { Component } from "react";
import { View, Image, Dimensions } from "react-native";
import { Text, Container, Badge, Grid, Row, Right } from "native-base";
import FadeIn from "@expo/react-native-fade-in-image";
import SwipeCards from "react-native-swipe-cards";

const placeholder = "https://i.imgur.com/kcbFmVSm.jpg";

const Cards = [
  { text: "Tomato", backgroundColor: "red", score: 59 },
  { text: "Aubergine", backgroundColor: "purple", score: 59 },
  { text: "Courgette", backgroundColor: "green", score: 59 },
  { text: "Blueberry", backgroundColor: "blue", score: 59 },
  { text: "Umm...", backgroundColor: "cyan", score: 59 },
  { text: "orange", backgroundColor: "orange", score: 51 }
];

const width = Dimensions.get("window").width;
const offset = (Dimensions.get("window").height - width) / 2 - 100;

function Card({ score, backgroundColor }) {
  return (
    <FadeIn
      placeholderStyle={{
        backgroundColor: "transparent"
      }}
      style={{
        backgroundColor: "transparent"
      }}
    >
      <Image
        style={{ height: width, width: width }}
        resizeMode="cover"
        source={{ uri: placeholder }}
      />
    </FadeIn>
  );
}

function NoMoreCards() {
  return <Text>No more cards</Text>;
}

export class VoteSwiper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CoolWord: this.CoolWord(),
      LameWord: this.LameWord()
    };
  }

  chooseWords = () => {
    setTimeout(
      () => {
        this.setState(() => {
          return {
            CoolWord: this.CoolWord(),
            LameWord: this.LameWord()
          };
        });
      },
      500
    );
  };

  onSwipeLeft = card => {
    console.log("left");
  };

  onSwipeRight = card => {
    console.log("right");
  };

  CoolWord() {
    const words = ["Woah!", "Awesome!", "Like", "Reblog", "Fav", "OMG"];
    return words[Math.round(Math.random() * words.length)];
  }

  LameWord() {
    const words = ["Lame", "Yikes", "Uhh", "Weird", "No way!", "Ugh"];
    return words[Math.round(Math.random() * words.length)];
  }

  render() {
    return (
      <Container style={{ marginTop: offset }}>
        <SwipeCards
          loop={false}
          stack={true}
          stackOffsetX={0}
          stackOffsetY={0}
          cards={Cards}
          renderCard={Card}
          renderNoMoreCards={NoMoreCards}
          handleNope={this.onSwipeLeft}
          handleYup={this.onSwipeRight}
          cardRemoved={this.chooseWords}
          showYup={true}
          showNope={true}
          showMaybe={false}
          hasMaybeAction={false}
          nopeText={this.state.LameWord}
          yupText={this.state.CoolWord}
        />
      </Container>
    );
  }
}
