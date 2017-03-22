import React from "react";
import { Container, Content, Left, Right } from "native-base";
import { HomeScreen } from "./components/homeScreen";
import { HomeFooter } from "./components/homeFooter";
import { HeaderText } from "./components/headerText";
import { HeaderContainer } from "./components/headerContainer";

export class AboutScene extends HomeScreen {
  render() {
    return (
      <Container>
        <HeaderContainer>
          <Left />
          <HeaderText title="Triangly" subtitle="About" />
          <Right />
        </HeaderContainer>
        <Content />
        <HomeFooter activeIndex={3} />
      </Container>
    );
  }
}
