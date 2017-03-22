import React from "react";
import { View } from "react-native";
import { Container, Content, Left, Right, H1, H2, Text } from "native-base";
import { HomeScreen } from "./components/homeScreen";
import { HomeFooter } from "./components/homeFooter";
import { HeaderText } from "./components/headerText";
import { HeaderContainer } from "./components/headerContainer";

const BigSpace = () => <View style={{ height: 25 }} />;
const SmallSpace = () => <View style={{ height: 10 }} />;

export class AboutScene extends HomeScreen {
  content() {
    return (
      <Content>
        <View style={{ padding: 25 }}>
          <H1 style={{ textAlign: "center" }}>
            How To
          </H1>
          <BigSpace />
          <H2>
            1. Create a photo
          </H2>
          <SmallSpace />
          <Text>
            Navigate to the Create tab and choose a photo! Play with the options until you're happy.
          </Text>
          <BigSpace />
          <H2>
            2. Share, Download, or... Submit for Voting
          </H2>
          <SmallSpace />
          <Text>
            Consider submitting your photo and give others the ability to vote on your photo!
          </Text>
          <BigSpace />
          <H2>
            3. Vote on Photos
          </H2>
          <SmallSpace />
          <Text>
            Navigate to the Vote tab and vote on other user's photos. The top six will appear on the Featured tab's cube.
          </Text>
        </View>
      </Content>
    );
  }

  render() {
    return (
      <Container>
        <HeaderContainer>
          <Left />
          <HeaderText title="Triangly" subtitle="About" />
          <Right />
        </HeaderContainer>
        {this.content()}
        <HomeFooter activeIndex={3} />
      </Container>
    );
  }
}
