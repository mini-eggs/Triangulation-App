import React, { Component } from "react";
import { Container, Left, Right, Button, Icon } from "native-base";
import { HomeFooter } from "./components/homeFooter";
import { HeaderText } from "./components/headerText";
import { HeaderContainer } from "./components/headerContainer";
import { VoteSwiper } from "./components/voteSwiper";
import ActionSheet from "react-native-actionsheet";

export class VoteScene extends Component {
  render() {
    return (
      <Container>
        <HeaderContainer>
          <Left />
          <HeaderText title="Triangly" subtitle="Vote - Swipe it!" />
          <Right />
        </HeaderContainer>
        <VoteSwiper
          incrementScore={this.props.incrementScore}
          cards={this.props.recent}
        />
        <HomeFooter activeIndex={0} />
      </Container>
    );
  }
}
