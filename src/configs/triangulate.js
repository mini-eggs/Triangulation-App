import React, { Component } from "react";
import { WebView } from "react-native";
import { connect } from "react-redux";
import Styled from "styled-components/native";
import { TriangulateActions, ModalActions } from "../actions/";

const WebViewContainer = Styled.View`
  position: absolute;
  top: -9999;
  left: -9999;
  height: 0;
  width: 0;
  overflow: hidden;
`;

class TriangulateComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: false
    };
  }

  componentWillReceiveProps({ image }) {
    if (typeof image !== "string") return;

    if (this.state.render) {
      this.setState(
        () => {
          return { render: false };
        },
        this.rerender
      );
    } else {
      this.rerender();
    }
  }

  rerender() {
    this.setState(() => {
      return { render: true };
    });
  }

  onMessage = event => {
    const message = JSON.parse(event.nativeEvent.data);
    if (message.status) {
      this.props.complete(message.image);
    } else {
      this.props.setMessage({
        text: "Unexpected error",
        time: 1250
      });
    }
  };

  injectedJavaScript() {
    return `
      // set props
      var imageSource = 'data:image/png;base64,${this.props.image}';
      var imageOptions = ${JSON.stringify(this.props.options)};
      // main work
      function Triangulate(imgSrc, options) {
        var image = new Image();
        image.onload = function () {
          triangulate(options)
            .fromImage(image)
            .toDataURL()
            .then(function(imageData) {
              postMessage(JSON.stringify({ status: true, image: imageData }));
            })
            .catch(function(err) {
              Triangulate(imgSrc, {});
            })
        };
        image.onerror = function() {
          postMessage(JSON.stringify({ status: false }));
        }
        image.src = imgSrc;
      }
      // call function
      Triangulate(imageSource, imageOptions);
    `;
  }

  render() {
    // ensure we're injected updates javascript
    // each time image is updated
    if (!this.state.render) return null;

    return (
      <WebViewContainer>
        <WebView
          injectedJavaScript={this.injectedJavaScript()}
          onMessage={this.onMessage}
          source={{
            html: "<script src='https://evanjones.xyz/dist/triangulate-image.min.js'></script>"
          }}
        />
      </WebViewContainer>
    );
  }
}

const stateToProps = state => {
  return {
    image: state.TriangulateReducer.imageSource,
    options: state.TriangulateReducer.options
  };
};

const actionsToProps = dispatch => {
  return {
    setMessage: message => dispatch(ModalActions.setMessage(message)),
    complete: image => dispatch(TriangulateActions.triangulationComplete(image))
  };
};

export const TriangulateLayer = connect(stateToProps, actionsToProps)(
  TriangulateComponent
);
