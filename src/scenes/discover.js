import React from "react";
import { Container, Left, Right } from "native-base";
import { HomeScreen } from "./components/homeScreen";
import { HomeFooter } from "./components/homeFooter";
import { HeaderText } from "./components/headerText";
import { HeaderContainer } from "./components/headerContainer";
import { DiscoverCube } from "./components/cube";

export class DiscoverScene extends HomeScreen {
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
