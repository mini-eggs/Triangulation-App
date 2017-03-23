import React, { Component, PropTypes } from "react";
import { Dimensions, PanResponder, View, Image, Animated } from "react-native";
import { Spinner } from "native-base";
import { Cube, fixImages } from "../../utilities/";
const { transformOrigin, rotateXY, rotateXZ } = Cube;

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const squareSize = Dimensions.get("window").width * 0.65;

const styles = {
  container: {
    position: "absolute",
    left: (width - squareSize) / 2,
    top: (height - squareSize) / 2.75,
    width: squareSize,
    height: squareSize,
    backgroundColor: "transparent"
  },
  rectangle: {
    backgroundColor: "white",
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
      dy: 0,
      auto: true,
      autoInterval: false, // this will be used to clear interval
      fadeAnim: new Animated.Value(0),
      loaded: 0
    };
  }

  componentDidMount() {
    this.handlePanResponderMove(null, this.state, true);
    this.autoRotate();
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

  autoRotate() {
    if (this.state.auto) {
      const autoInterval = setInterval(
        () => {
          this.setState(
            state => {
              return { dx: state.dx + 0.25 };
            },
            () => {
              this.handlePanResponderMove(null, { dx: 1, dy: 0 }, true);
            }
          );
        },
        10
      );
      this.setState(() => {
        return { autoInterval: autoInterval };
      });
    } else if (this.state.autoInterval) {
      clearInterval(this.state.autoInterval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.autoInterval);
  }

  handlePanResponderMove(e, gestureState, auto = false) {
    if (!auto && this.state.auto) {
      this.setState(
        () => {
          return { auto: false };
        },
        this.autoRotate
      );
    }

    const origin = { x: 0, y: 0, z: squareSize / -2 };
    const dx = gestureState.dx + this.state.dx - 45;
    const dy = gestureState.dy + this.state.dy + 20;

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
        onLoadEnd={this.onLoadEnd}
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
        onLoadEnd={this.onLoadEnd}
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
        onLoadEnd={this.onLoadEnd}
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
        onLoadEnd={this.onLoadEnd}
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
        onLoadEnd={this.onLoadEnd}
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
        onLoadEnd={this.onLoadEnd}
        ref={component => this.refViewBottom = component}
        style={styles.rectangle}
        resizeMode="cover"
        source={{ uri: image }}
        {...this.panResponder.panHandlers}
      />
    );
  }

  onLoadEnd = () => {
    this.setState(
      state => {
        return { loaded: state.loaded + 1 };
      },
      () => {
        if (this.state.loaded === 6) {
          Animated.timing(this.state.fadeAnim, {
            toValue: 1,
            duration: 250
          }).start();
        }
      }
    );
  };

  render() {
    return (
      <Animated.View
        style={[styles.container, { opacity: this.state.fadeAnim }]}
      >
        {this.renderBack(this.props.images[0])}
        {this.renderLeft(this.props.images[1])}
        {this.renderRight(this.props.images[2])}
        {this.renderTop(this.props.images[3])}
        {this.renderBottom(this.props.images[4])}
        {this.renderFront(this.props.images[5])}
      </Animated.View>
    );
  }
}

export class DiscoverCube extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(1),
      cubeFade: new Animated.Value(0),
      show: props.images.length >= 6
    };
  }

  componentDidMount() {
    this.checkShow(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.checkShow(nextProps);
  }

  checkShow(props) {
    if (props.images.length >= 6) {
      Animated.timing(this.state.fadeAnim, {
        toValue: 0,
        duration: 250
      }).start();
      setTimeout(
        () => {
          this.setState({
            show: true
          });
        },
        250
      );
    }
  }

  render() {
    const images = [...this.props.images, ...this.props.images];
    return this.state.show
      ? <View
          style={{
            flex: 1
          }}
        >
          <CubeContainer images={fixImages(images)} />
        </View>
      : <Animated.View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            opacity: this.state.fadeAnim
          }}
        >
          <Spinner color="#000" />
        </Animated.View>;
  }
}
