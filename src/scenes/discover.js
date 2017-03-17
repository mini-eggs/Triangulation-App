import React, { Component } from "react";
import { Container, Icon, Footer, Header, Left, Button, Body, Title, Right, FooterTab } from "native-base";
import { DiscoverSwiper } from "./components/swiper";
import { styles } from "./styles/topLevel";

export class DiscoverScene extends Component {
  
  componentDidMount() {
    this.props.getFeaturedImages();
  }

  /**
   * Check if we should go to workshop component
   */
  componentDidUpdate() {
    if (typeof this.props.image === "string") {
      this.props.history.push("/workshop");
    }
  }

  render() {
    return (
      <Container>

        <Header>
          <Left />
          <Body>
            <Title>
              Triangly
            </Title>
          </Body>
          <Right />
        </Header>

        <DiscoverSwiper 
          images={this.props.images} 
        />

        <Footer style={styles.Footer}>
          <FooterTab>
            <Button transparent onPress={() => { this.props.chooseImage() }}>
              <Icon
                active
                name="md-camera"
                style={{ color: '#000' }}
              />
            </Button>
          </FooterTab>
        </Footer>

      </Container>
    );
  }
}
