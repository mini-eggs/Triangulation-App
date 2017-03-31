import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import {
  CameraRoll,
  Dimensions,
  View,
  TouchableHighlight,
  Platform,
  Share
} from "react-native";
import {
  Container,
  Grid,
  Row,
  Col,
  Icon,
  Footer,
  Header,
  Left,
  Button,
  Text,
  Body,
  Title,
  Right,
  Content
} from "native-base";
import FileSystem from "react-native-fs";
import ActionSheet from "react-native-actionsheet";
import RNFetchBlob from "react-native-fetch-blob"; // only used to snan files on android
import { Exhibit } from "./components/exhibit";
import { Controls } from "./components/controls";
import { HeaderText } from "./components/headerText";
import { HeaderContainer } from "./components/headerContainer";

export class WorkshopScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: props.options,
      initialOptionValues: props.options.map(option => option.value)
    };
  }

  componentWillReceiveProps({ image, uploadPhoto }) {
    if (typeof image === "string" && this.props.image !== image) {
      uploadPhoto(image);
    }
  }

  componentDidMount() {
    this.props.trianguleImage(this.props.initialImage);
  }

  componentWillUnmount() {
    this.reset();
    this.props.resetImage();
    this.props.removeInitialImage();
  }

  async download() {
    if (typeof this.props.image === "string") {
      try {
        if (Platform.OS === "ios") {
          await CameraRoll.saveToCameraRoll(this.props.image);
        } else {
          const dir = `${FileSystem.ExternalStorageDirectoryPath}/Pictures/Triangly/`;
          const imageLoc = `${dir}${this.props.image.split("/").reverse()[0]}`;
          await FileSystem.mkdir(dir);
          await FileSystem.downloadFile({
            fromUrl: this.props.image,
            toFile: imageLoc
          });
          await RNFetchBlob.fs.scanFile([{ path: imageLoc }]);
        }
        this.props.setMessage({
          text: "Image has been saved",
          time: 1250
        });
      } catch (err) {
        console.log(err);
        this.props.setMessage({
          text: "Image could not be saved",
          time: 1250
        });
      }
    }
  }

  triangulate() {
    this.props.resetImage();
    const triangulateOptions = {};
    this.state.options.map(option => {
      triangulateOptions[option.name] = option.value;
    });
    this.props.trianguleImage(this.props.initialImage, triangulateOptions);
  }

  onChange(find, value) {
    const updatedOptions = this.state.options.map(option => {
      let newOption = option;
      if (option.name === find.name) {
        newOption.value = value;
      }
      return newOption;
    });
    this.setState(
      () => {
        return { options: updatedOptions };
      },
      this.triangulate
    );
  }

  reset() {
    const resetOptions = this.state.options.map((option, index) => {
      option.value = this.state.initialOptionValues[index];
      return option;
    });
    this.setState(
      () => {
        return { options: resetOptions };
      },
      this.triangulate
    );
  }

  async share() {
    if (typeof this.props.imageUrl === "undefined") {
      this.props.setMessage({
        text: "Uploading image. Try again in a moment.",
        time: 1250
      });
      return;
    }

    const options = {
      message: `I made this image with the Triangly app! 🔺 ${this.props.imageUrl}`,
      title: "🔺🔻🔺 Triangly! 🔺🔻🔺"
    };

    const details = {
      dialogTitle: "Share your Triangly image"
    };

    try {
      await Share.share(options, details);
    } catch (err) {
      this.props.setMessage({
        text: "Unexpected error",
        time: 1250
      });
    }
  }

  menuPress = () => {
    if (this.props.image) {
      this.ActionSheet.show();
    }
  };

  menuOptions = option => {
    switch (option) {
      case 0: {
        this.share();
        break;
      }
      case 1: {
        // base64 works fine
        this.props.submitVote(this.props.image);
        break;
      }
      case 2: {
        this.download();
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
          <Left>
            <Button
              transparent
              onPress={() => {
                Actions.pop();
              }}
            >
              <Icon style={{ color: "#000" }} name="arrow-back" />
            </Button>
          </Left>
          <HeaderText title="Triangly" subtitle="Edit" />
          <Right>
            <Button transparent onPress={this.menuPress}>
              <Icon style={{ color: "#000" }} name="md-more" />
            </Button>
          </Right>
        </HeaderContainer>

        <Content>

          <View style={{ height: Dimensions.get("window").height * 3 / 5 }}>
            <Exhibit image={this.props.image} />
          </View>

          <Controls
            options={this.state.options}
            onChange={(option, value) => {
              this.onChange(option, value);
            }}
          />

          <Grid style={{ margin: 10, marginTop: 20 }}>
            <Col style={{ flex: 0.3 }} />
            <Col>
              <Button
                full
                style={{ margin: 10 }}
                danger
                rounded
                onPress={() => {
                  this.reset();
                }}
              >
                <Text> Reset </Text>
              </Button>
            </Col>
            <Col style={{ flex: 0.3 }} />
          </Grid>

          <View style={{ height: 100 }} />

        </Content>

        <ActionSheet
          ref={o => this.ActionSheet = o}
          options={["Share", "Submit for Voting", "Download", "Cancel"]}
          cancelButtonIndex={3}
          onPress={this.menuOptions}
        />

      </Container>
    );
  }
}
