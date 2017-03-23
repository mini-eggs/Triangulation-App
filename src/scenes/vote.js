import React from "react";
import { Container, Left, Right, Button, Icon } from "native-base";
import { HomeScreen } from "./components/homeScreen";
import { HomeFooter } from "./components/homeFooter";
import { HeaderText } from "./components/headerText";
import { HeaderContainer } from "./components/headerContainer";
import { VoteSwiper } from "./components/voteSwiper";
import ActionSheet from "react-native-actionsheet";

export class VoteScene extends HomeScreen {
  menuPress = () => {
    this.ActionSheet.show();
  };

  menuOptions = option => {
    switch (option) {
      case 0: {
        alert("sort by recent");
        break;
      }
      case 1: {
        alert("sort by top");
        break;
      }
      case 2: {
        alert("sort by yours");
        break;
      }
      default: {
        break;
      }
    }
  };

  render() {
    return (
      <Container>
        <HeaderContainer>
          <Left />
          <HeaderText title="Triangly" subtitle="Vote" />
          <Right>
            <Button transparent onPress={this.menuPress}>
              <Icon style={{ color: "#000" }} name="md-more" />
            </Button>
          </Right>
        </HeaderContainer>
        <VoteSwiper {...this.props} />
        <HomeFooter activeIndex={0} />
        <ActionSheet
          ref={o => this.ActionSheet = o}
          options={["Recent", "Top", "Yours", "Cancel"]}
          cancelButtonIndex={3}
          onPress={this.menuOptions}
        />
      </Container>
    );
  }
}
