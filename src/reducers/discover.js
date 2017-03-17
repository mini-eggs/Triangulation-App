const initialState = {
  image: undefined
};

export const DiscoverReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DISCOVER_LOADING":
    case "SET_IMAGE_ACTION":
    case "ADD_IMAGES_ACTION": {
      return Object.assign({}, state, action.payload);
    }
    default: {
      return state;
    }
  }
};
