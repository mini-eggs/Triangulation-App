import * as API from "../utilities/";
import io from "socket.io-client";
import { setMessage } from "./modal";

export const resetImage = () => {
  return {
    type: "RESET_IMAGE"
  };
};

export const setImage = image => {
  return {
    type: "SET_IMAGE",
    payload: {
      image: image
    }
  };
};

const defaultTriangulationOptions = {
  accuracy: 0.7,
  blur: 40,
  threshold: 50,
  vertexCount: 700,
  fill: true,
  stroke: true,
  strokeWidth: 0.5,
  gradients: true,
  gradientStops: 4,
  lineJoin: "miter",
  transparentColor: false
};

export const trianguleImage = (image, userOptions) => {
  const options = Object.assign({}, defaultTriangulationOptions, userOptions);
  const props = { image: image, options: options };
  return dispatch => {
    const socket = io.connect(API.SOCKET, { transports: ["websocket"] });
    socket.on("connect", () => {
      socket.on("triangly/triangulate/complete", data => {
        dispatch(setImage(data.image));
      });
      socket.on("triangly/triangulate/failure", err => {
        dispatch(setMessage({ text: "Unexpected error", time: 2000 }));
        dispatch(setImage(undefined));
      });
      socket.emit("triangly/triangulate/create", props);
    });
  };
};
