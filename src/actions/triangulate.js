export function triangulationComplete(image) {
  return {
    type: "IMAGE_TRIANGULATION_COMPLETE",
    payload: { imageComplete: image }
  };
}

export function resetImage() {
  return {
    type: "IMAGE_TRIANGULATION_RESET"
  };
}

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

export const setImageSrcAndOptions = (image, userOptions) => {
  let options = Object.assign({}, defaultTriangulationOptions, userOptions);
  // fix accuracy
  options.accuracy = (options.accuracy - 1) * -1;
  return {
    type: "IMAGE_TRIANGULATION_SET_DATA",
    payload: { imageSource: image, options: options }
  };
};
