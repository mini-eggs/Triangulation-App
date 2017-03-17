const initialState = {
  featured: ["https://something.really.cool/"]
};

export const FirebaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_IMAGES_FIREBASE": {
      return Object.assign({}, state, action.payload);
    }
    default: {
      return state;
    }
  }
};
