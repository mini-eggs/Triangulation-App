import * as firebase from "firebase";
import * as Keys from "../keys/";

const credentials = {
  apiKey: Keys.FIREBASE_API_KEY,
  databaseURL: Keys.FIREBASE_DATABASE_URL
};

firebase.initializeApp(credentials);
firebase.database();

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
    firebase.database().ref("featured_images").on("value", snap => {
      const data = snap.val();
      const arr = Object.keys(data);
      const featuredImages = arr.map(key => data[key]);
      dispatch(setFeaturedImages(featuredImages));
    });
  };
};
