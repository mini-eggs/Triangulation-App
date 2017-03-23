import React, { Component } from "react";
import { View } from "react-native";
import { Container, Content, Left, Right, H1, H2, Text } from "native-base";
import { HomeFooter } from "./components/homeFooter";
import { HeaderText } from "./components/headerText";
import { HeaderContainer } from "./components/headerContainer";

const BigSpace = () => <View style={{ height: 25 }} />;
const SmallSpace = () => <View style={{ height: 10 }} />;

const content = {
  header: "How to",
  sections: [
    {
      title: "1. Create a photo",
      description: "Navigate to the Create tab and choose a photo! Play with the options until you're happy."
    },
    {
      title: "2. Share, Download, or... Submit for Voting",
      description: "Consider submitting your photo and give others the ability to vote on your photo!"
    },
    {
      title: "3. Vote on Photos",
      description: "Navigate to the Vote tab and vote on other user's photos. The top six will appear on the Top tab's cube. You may only vote once per photo."
    }
  ]
};

export function AboutScene() {
  return (
    <Container>
      <HeaderContainer>
        <Left />
        <HeaderText title="Triangly" subtitle="About" />
        <Right />
      </HeaderContainer>
      <Content>
        <View style={{ padding: 25 }}>
          <H1 style={{ textAlign: "center" }}>{content.header}</H1>
          <BigSpace />
          {content.sections.map((section, index) => {
            return (
              <View key={index}>
                <H2>{section.title}</H2>
                <SmallSpace />
                <Text>{section.description}</Text>
                <BigSpace />
              </View>
            );
          })}
        </View>
      </Content>
      <HomeFooter activeIndex={3} />
    </Container>
  );
}
