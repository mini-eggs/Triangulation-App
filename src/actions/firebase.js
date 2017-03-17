const initialImages = [
  "https://i.imgur.com/RO6LeVi.png",
  "https://i.imgur.com/5SWkcnw.png",
  "https://i.imgur.com/71AV5zt.png"
];

export const setFeaturedImages = featured => {
  return {
    type: "SET_IMAGES_FIREBASE",
    payload: {
      featured: featured
    }
  };
};

export const getFeaturedImages = () => {
  return dispatch => {
    dispatch(setFeaturedImages(initialImages));
  };
};
