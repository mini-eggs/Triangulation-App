import React, { Component, PropTypes } from "react";
import { Dimensions, PanResponder, View, Image } from "react-native";
import { Cube } from "../../utilities/";
const { transformOrigin, rotateXY, rotateXZ } = Cube;

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const squareSize = Dimensions.get("window").width * 0.65;

const styles = {
  container: {
    position: "absolute",
    left: (width - squareSize) / 2,
    top: (height - squareSize) / 2,
    width: squareSize,
    height: squareSize,
    backgroundColor: "transparent"
  },
  rectangle: {
    position: "absolute",
    left: 0,
    top: 0,
    width: squareSize,
    height: squareSize,
    zIndex: 10
  }
};

class CubeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dx: 0,
      dy: 0
    };
  }

  componentDidMount() {
    this.handlePanResponderMove(null, this.state);
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: this.handlePanResponderMove.bind(this),
      onPanResponderRelease: (evt, gestureState) => {
        const { dx, dy } = gestureState;
        this.setState(state => {
          return { dx: state.dx + dx, dy: state.dy + dy };
        });
      }
    });
  }

  handlePanResponderMove(e, gestureState) {
    const origin = { x: 0, y: 0, z: squareSize / -2 };
    const dx = gestureState.dx + this.state.dx - 45;
    const dy = gestureState.dy + this.state.dy - 45;

    let matrix = rotateXY(dx, dy);
    transformOrigin(matrix, origin);
    this.refViewFront.setNativeProps({
      style: { transform: [{ perspective: 1000 }, { matrix: matrix }] }
    });

    matrix = rotateXY(dx + 180, dy);
    transformOrigin(matrix, origin);
    this.refViewBack.setNativeProps({
      style: { transform: [{ perspective: 1000 }, { matrix: matrix }] }
    });

    matrix = rotateXY(dx + 90, dy);
    transformOrigin(matrix, origin);
    this.refViewRight.setNativeProps({
      style: { transform: [{ perspective: 1000 }, { matrix: matrix }] }
    });

    matrix = rotateXY(dx - 90, dy);
    transformOrigin(matrix, origin);
    this.refViewLeft.setNativeProps({
      style: { transform: [{ perspective: 1000 }, { matrix: matrix }] }
    });

    matrix = rotateXZ(dx, dy - 90);
    transformOrigin(matrix, origin);
    this.refViewTop.setNativeProps({
      style: { transform: [{ perspective: 1000 }, { matrix: matrix }] }
    });

    matrix = rotateXZ(-dx, dy + 90);
    transformOrigin(matrix, origin);
    this.refViewBottom.setNativeProps({
      style: { transform: [{ perspective: 1000 }, { matrix: matrix }] }
    });
  }

  renderLeft(image) {
    return (
      <Image
        ref={component => this.refViewRight = component}
        style={styles.rectangle}
        resizeMode="cover"
        source={{ uri: image }}
        {...this.panResponder.panHandlers}
      />
    );
  }

  renderRight(image) {
    return (
      <Image
        ref={component => this.refViewLeft = component}
        style={styles.rectangle}
        resizeMode="cover"
        source={{ uri: image }}
        {...this.panResponder.panHandlers}
      />
    );
  }

  renderFront(image) {
    return (
      <Image
        ref={component => this.refViewFront = component}
        style={styles.rectangle}
        resizeMode="cover"
        source={{ uri: image }}
        {...this.panResponder.panHandlers}
      />
    );
  }

  renderBack(image) {
    return (
      <Image
        ref={component => this.refViewBack = component}
        style={styles.rectangle}
        resizeMode="cover"
        source={{ uri: image }}
        {...this.panResponder.panHandlers}
      />
    );
  }

  renderTop(image) {
    return (
      <Image
        ref={component => this.refViewTop = component}
        style={styles.rectangle}
        resizeMode="cover"
        source={{ uri: image }}
        {...this.panResponder.panHandlers}
      />
    );
  }

  renderBottom(image) {
    return (
      <Image
        ref={component => this.refViewBottom = component}
        style={styles.rectangle}
        resizeMode="cover"
        source={{ uri: image }}
        {...this.panResponder.panHandlers}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderBack(this.props.images[0])}
        {this.renderLeft(this.props.images[1])}
        {this.renderRight(this.props.images[2])}
        {this.renderTop(this.props.images[3])}
        {this.renderBottom(this.props.images[4])}
        {this.renderFront(this.props.images[5])}
      </View>
    );
  }
}

export class DiscoverCube extends Component {
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
  }

  renderCube(images) {
    return <CubeContainer images={images} />;
  }

  render() {
    const images = [...this.props.images, ...this.props.images];
    return images.length >= 6 ? this.renderCube(images) : <View />;
  }
}
