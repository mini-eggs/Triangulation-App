import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import { Platform } from "react-native";
import {
  Container,
  Icon,
  Footer,
  Header,
  Left,
  Button,
  Body,
  Title,
  Right,
  FooterTab
} from "native-base";
import { DiscoverSwiper } from "./components/swiper";

export class DiscoverScene extends Component {
  componentDidMount() {
    this.props.getFeaturedImages();
  }

  /**
   * Check if we should go to workshop component
   */
  componentDidUpdate() {
    if (typeof this.props.image === "string") {
      Actions.workshop();
    }
  }

  render() {
    return (
      <Container>

        <Header noShadow>
          <Left />
          <Body>
            <Title>
              Triangly
            </Title>
          </Body>
          <Right />
        </Header>

        <DiscoverSwiper images={this.props.images} />

        <Footer>
          <FooterTab>
            <Button
              transparent
              onPress={() => {
                this.props.chooseImage();
              }}
            >
              <Icon
                name="md-camera"
                style={{
                  color: "#000",
                  marginTop: Platform.OS === "ios" ? 0 : -15
                }}
              />
            </Button>
          </FooterTab>
        </Footer>

      </Container>
    );
  }
}
