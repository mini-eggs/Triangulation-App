import React from "react";
import { Actions } from "react-native-router-flux";
import {
  Container,
  Icon,
  Footer,
  Header,
  Left,
  Button,
  Body,
  Title,
  Subtitle,
  Right,
  FooterTab,
  Tab,
  Tabs,
  Text,
  Content
} from "native-base";
import { HomeScreen } from "./components/homeScreen";
import { HomeFooter } from "./components/homeFooter";
import { HeaderText } from "./components/headerText";
import { DiscoverCube } from "./components/cube";

export class DiscoverScene extends HomeScreen {
  render() {
    return (
      <Container>

        <Header
          noShadow
          style={{ borderColor: "transparent", borderBottomWidth: 0 }}
        >
          <Left />
          <HeaderText title="Triangly" subtitle="Featured" />
          <Right />
        </Header>

        <Content />

        <DiscoverCube images={this.props.images} />

        <HomeFooter
          icons={[{}, { active: true }, { onPress: this.props.chooseImage }]}
        />

      </Container>
    );
  }
}
