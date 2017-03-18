import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import {
  CameraRoll,
  Dimensions,
  View,
  TouchableHighlight,
  Platform
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
import { Exhibit } from "./components/exhibit";
import { Controls } from "./components/controls";

export class WorkshopScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: props.options,
      initialOptionValues: props.options.map(option => option.value)
    };
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
          await FileSystem.downloadFile({
            fromUrl: this.props.image,
            toFile: `${FileSystem.ExternalStorageDirectoryPath}/Download/${this.props.image
              .split("/")
              .reverse()[0]}`
          });
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
    this.setState((state, props) => {
      return { options: updatedOptions };
    });
  }

  reset() {
    const resetOptions = this.state.options.map((option, index) => {
      option.value = this.state.initialOptionValues[index];
      return option;
    });
    this.setState(() => {
      options: resetOptions;
    });
  }

  render() {
    return (
      <Container>

        <Header noShadow>
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
          <Body>
            <Title>
              Edit
            </Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                this.download();
              }}
            >
              <Icon style={{ color: "#000" }} name="md-download" />
            </Button>
          </Right>
        </Header>

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
            <Col>
              <Button
                full
                style={{ margin: 10 }}
                primary
                rounded
                onPress={() => {
                  this.setState((state, props) => {
                    this.triangulate();
                  });
                }}
              >
                <Text> Apply </Text>
              </Button>
            </Col>
          </Grid>

          <View style={{ height: 100 }} />

        </Content>

      </Container>
    );
  }
}
