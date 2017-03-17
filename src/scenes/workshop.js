import React, { Component } from "react";
import { CameraRoll, Dimensions, View, TouchableHighlight } from "react-native";
import { Container, Grid, Row, Col, Icon, Footer, Header, Left, Button, Text, Body, Title, Right, Content } from "native-base";
import { styles } from "./styles/topLevel";
import { Exhibit } from "./components/exhibit";
import { Controls } from "./components/controls";

export class WorkshopScene extends Component {

  constructor (props) {
    super(props)
    this.state = { 
      options: props.options,
      initialOptionValues: props.options.map(option => option.value)
    }
  }

  componentDidMount() {
    this.props.trianguleImage(this.props.initialImage);
  }

  componentWillUnmount() {
    this.props.resetImage();
    this.props.removeInitialImage();
  }

  async download() {
    if (typeof this.props.image === "string") {
      try {
        await CameraRoll.saveToCameraRoll(this.props.image);
        this.props.setMessage({
          text: "Image has been saved",
          autohide: true,
          time: 1250
        });
      } catch (err) {
        console.log(err)
        this.props.setMessage({
          text: "Image could not be saved",
          autohide: true,
          time: 1250
        });
      }
    }
  }

  triangulate() {
    this.props.resetImage();
    const triangulateOptions = {}
    this.state.options.map((option) => {
      triangulateOptions[ option.name ] = option.value
    })
    this.props.trianguleImage(this.props.initialImage, triangulateOptions);
  }

  onChange(find, value) {
    const updatedOptions = this.state.options.map(option => {
      let newOption = option
      if (option.name === find.name) {
        newOption.value = value
      }
      return newOption
    })
    this.setState((state, props) => {
      return { options: updatedOptions }
    })
  }

  render() {
    return (
      <Container>
        
        <Header>
          <Left>
            <Button transparent onPress={() => { this.props.history.goBack(); }}>
              <Icon  style={{ color: '#000' }} name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>
              Edit
            </Title>
          </Body>
          <Right>
            <Button transparent onPress={() => { this.download(); }}>
              <Icon  style={{ color: '#000' }} name="md-download" />
            </Button>
          </Right>
        </Header>

          <Content>

            <View style={{ height: Dimensions.get("window").height * 3/5 }}>
              <Exhibit image={this.props.image} />
            </View>

            <Controls options={this.state.options} onChange={(option, value) => { this.onChange(option, value); }} />

            <Grid style={{ margin: 10, marginTop: 20 }}>
              <Col>
                <Button full style={{ margin: 10 }} danger rounded onPress={() => {
                  const resetOptions = this.state.options.map((option, index) => {
                    option.value = this.state.initialOptionValues[index]
                    return option
                  })
                  this.setState(() => {
                    options: resetOptions
                  })
                }}>
                  <Text> Reset </Text>
                </Button>
              </Col>
              <Col>
                <Button full style={{ margin: 10 }} primary rounded onPress={() => { this.setState((state, props) => { 
                  this.triangulate();
                })}}>
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
