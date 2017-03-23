import React, { Component } from "react";
import { Container, Left, Right, Button, Icon } from "native-base";
import { HomeFooter } from "./components/homeFooter";
import { HeaderText } from "./components/headerText";
import { HeaderContainer } from "./components/headerContainer";
import { VoteSwiper } from "./components/voteSwiper";
import ActionSheet from "react-native-actionsheet";

const filterOptions = ["Recent", "Top", "Yours"];

export class VoteScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: filterOptions[0]
    };
  }

  menuOptions = option => {
    const filter = typeof filterOptions[option] !== "undefined"
      ? filterOptions[option]
      : filterOptions[0];
    this.setState(() => {
      return { filter: filter };
    });
  };

  menuPress = () => {
    this.ActionSheet.show();
  };

  render() {
    return (
      <Container>
        <HeaderContainer>
          <Left />
          <HeaderText
            title="Triangly"
            subtitle={`Vote - ${this.state.filter}`}
          />
          <Right>
            <Button transparent onPress={this.menuPress}>
              <Icon style={{ color: "#000" }} name="md-more" />
            </Button>
          </Right>
        </HeaderContainer>
        <VoteSwiper
          incrementScore={this.props.incrementScore}
          cards={this.props[this.state.filter.toLowerCase()]}
        />
        <HomeFooter activeIndex={0} />
        <ActionSheet
          title="Sort by"
          ref={o => this.ActionSheet = o}
          options={[...filterOptions, "Cancel"]}
          cancelButtonIndex={filterOptions.length}
          onPress={this.menuOptions}
        />
      </Container>
    );
  }
}
