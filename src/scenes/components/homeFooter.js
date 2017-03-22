import React from "react";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { DiscoverActions } from "../../actions/";
import { Footer, FooterTab, Button, Icon, Text } from "native-base";

function FooterComponent({ activeIndex, chooseImage }) {
  const buttons = [
    { onPress: Actions.vote, icon: "md-create", text: "Vote" },
    { onPress: Actions.discover, icon: "md-star", text: "Featured" },
    { onPress: chooseImage, icon: "md-camera", text: "Create" },
    { onPress: Actions.about, icon: "md-information-circle", text: "About" }
  ];

  return (
    <Footer style={{ borderColor: "transparent" }}>
      <FooterTab>
        {buttons.map((button, index) => {
          return (
            <Button
              key={index}
              active={index === activeIndex}
              onPress={button.onPress}
            >
              <Icon name={button.icon} />
              <Text>{button.text}</Text>
            </Button>
          );
        })}
      </FooterTab>
    </Footer>
  );
}

export const HomeFooter = connect(
  () => {
    return {};
  },
  dispatch => {
    return {
      chooseImage: () => dispatch(DiscoverActions.chooseImage())
    };
  }
)(FooterComponent);
