import React, { Component } from "react";
import { View, Image, Dimensions, Animated } from "react-native";
import { Container, Text } from "native-base";
import SwipeCards from "react-native-swipe-cards";

// fix the swipe cards module
alert = () => {};

const width = Dimensions.get("window").width;
const offset = (Dimensions.get("window").height - width) / 2 - 100;

const styles = {
  FadeIn: {
    backgroundColor: "transparent"
  },
  Image: {
    height: width,
    width: width,
    backgroundColor: "white"
  }
};

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = { fade: new Animated.Value(0) };
  }
  fadeIn = () => {
    Animated.timing(this.state.fade, {
      toValue: 1,
      duration: 250
    }).start();
  };
  render() {
    return (
      <View style={{ backgroundColor: "white" }}>
        <Animated.View style={{ opacity: this.state.fade }}>
          <Image
            onLoadEnd={this.fadeIn}
            style={styles.Image}
            resizeMode="cover"
            source={{ uri: this.props.image }}
          />
        </Animated.View>
      </View>
    );
  }
}

class Empty extends Component {
  constructor(props) {
    super(props);
    this.state = { fade: new Animated.Value(0), text: this.getRandomText() };
  }
  componentDidMount() {
    Animated.timing(this.state.fade, {
      toValue: 1,
      duration: 500
    }).start();
  }
  getRandomText() {
    let text = [
      "Nothing more to see here 🙃",
      "Empty! 😱",
      "Where did they go? 🦑",
      "We can't seem to find anymore 👀",
      "The 🌎 is a very small place after all"
    ];
    text = text.concat(text);
    text = text.concat(text);
    text = text.concat(text);
    return text[Math.round(Math.random() * text.length)];
  }
  render() {
    return (
      <Animated.View style={{ opacity: this.state.fade }}>
        <Text>{this.state.text}</Text>
      </Animated.View>
    );
  }
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
    this.props.incrementScore(card, 0);
  };

  onSwipeRight = card => {
    this.props.incrementScore(card, 1);
  };

  CoolWord() {
    let words = ["Woah!", "Awesome!", "Like", "Reblog", "Fav", "OMG"];
    words = words.concat(words);
    words = words.concat(words);
    words = words.concat(words);
    return words[Math.round(Math.random() * words.length)];
  }

  LameWord() {
    let words = ["Lame", "Yikes", "Uhh", "Weird", "No way!", "Ugh"];
    words = words.concat(words);
    words = words.concat(words);
    words = words.concat(words);
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
          cards={this.props.cards}
          renderCard={props => <Card {...props} />}
          renderNoMoreCards={() => <Empty />}
          handleNope={this.onSwipeLeft}
          handleYup={this.onSwipeRight}
          cardRemoved={this.chooseWords}
          showYup={true}
          showNope={true}
          showMaybe={false}
          hasMaybeAction={false}
          dragY={false}
          nopeText={this.state.LameWord}
          yupText={this.state.CoolWord}
        />
      </Container>
    );
  }
}
