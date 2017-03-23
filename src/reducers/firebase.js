const initialState = {
  featured: [],
  voteImages: [],
  voteImagesRecent: [],
  voteImagesRecentEligible: [],
  voteImagesTop: [],
  voteImagesTopEligible: [],
  voteImagesYours: [],
  voteImagesYoursEligible: []
};

export const FirebaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_VOTE_IMAGES_FIREBASE":
    case "SET_IMAGES_FIREBASE": {
      return Object.assign({}, state, action.payload);
    }
    default: {
      return state;
    }
  }
};
