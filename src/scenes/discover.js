import React, { Component } from "react";
import { Container, Left, Right } from "native-base";
import { HomeFooter } from "./components/homeFooter";
import { HeaderText } from "./components/headerText";
import { HeaderContainer } from "./components/headerContainer";
import { DiscoverCube } from "./components/cube";

export class DiscoverScene extends Component {
  render() {
    return (
      <Container>
        <HeaderContainer>
          <Left />
          <HeaderText title="Triangly" subtitle="Top" />
          <Right />
        </HeaderContainer>
        <DiscoverCube images={this.props.images} />
        <HomeFooter activeIndex={1} />
      </Container>
    );
  }
}
