const initialState = {
  imageComplete: undefined,
  imageSource: undefined,
  options: undefined
};

export const TriangulateReducer = (state = initialState, action) => {
  switch (action.type) {
    case "IMAGE_TRIANGULATION_SET_DATA":
    case "IMAGE_TRIANGULATION_COMPLETE": {
      return Object.assign({}, state, action.payload);
    }
    case "IMAGE_TRIANGULATION_RESET": {
      return Object.assign({}, state, { imageComplete: undefined });
    }
    default: {
      return state;
    }
  }
};
