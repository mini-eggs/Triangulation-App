import * as firebase from "firebase";
import * as Keys from "../keys/";
import { sortBy } from "lodash";
import { setMessage } from "./modal";
import { getUniqueID } from "react-native-device-info";

const user = getUniqueID();

function getTable(table) {
  return new Promise((resolve, reject) => {
    firebase.database().ref(table).on("value", snap => {
      const data = snap.val();
      if (!data) {
        reject();
      } else {
        const rows = Object.entries(data);
        const fixed = rows.map(row => {
          const aRow = row[1];
          aRow["key"] = row[0];
          return aRow;
        });
        resolve(fixed);
      }
    });
  });
}

function buildRow(location, props) {
  const key = firebase.database().ref().child("photo").push().key;
  const updates = {};
  const time = new Date().getTime();
  updates[location + key] = {
    ...props,
    user: user,
    time: time,
    timeDesc: 0 - time
  };
  return updates;
}

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

export function submitVote(image) {
  return dispatch => {
    const data = buildRow("/vote/", { image: image, voted: [], score: 0 });
    firebase.database().ref().update(data, err => {
      if (null) {
        const msg = { text: "Unexpected error", time: 1000 };
        dispatch(setMessage(msg));
      } else {
        const msg = { text: "Submitted", time: 1000 };
        dispatch(setMessage(msg));
      }
    });
  };
}

function sortImagesByTop(voteImages) {
  return sortBy(voteImages, ["score"]).reverse();
}

function sortImagesByYours(voteImages) {
  let yours = [];
  voteImages.forEach(image => {
    if (image.user === user) {
      yours.push(image);
    }
  });
  return yours;
}

function sortImagesByEligible(voteImages) {
  let fixed = [];
  voteImages.forEach(image => {
    if (typeof image.voted === "undefined") {
      fixed.push(image);
    } else if (!image.voted.includes(user)) {
      fixed.push(image);
    }
  });
  return fixed;
}

export function setVoteImages(voteImages) {
  return {
    type: "SET_VOTE_IMAGES_FIREBASE",
    payload: {
      voteImagesRecent: voteImages.reverse(),
      voteImagesRecentEligible: sortImagesByEligible(voteImages.reverse()),
      voteImagesTop: sortImagesByTop(voteImages),
      voteImagesYours: sortImagesByYours(voteImages)
    }
  };
}

export function getVoteImages() {
  return async dispatch => {
    try {
      const data = await getTable("vote");
      dispatch(setVoteImages(data));
    } catch (err) {
      if (__DEV__) {
        console.log("error get table");
        console.log(err);
      }
    }
  };
}

export function incrementScore(voteData, score) {
  return dispath => {
    // build data
    const key = voteData.key;
    const data = voteData;
    data.score = parseInt(data.score) + score;
    if (typeof data.voted === "undefined") {
      data.voted = [user];
    } else {
      data.voted = data.voted.concat([user]);
    }
    delete data.key;
    const updates = {};
    updates[key] = data;
    // push data
    firebase.database().ref("vote").update(updates, err => {
      if (null) {
        const msg = { text: "Unexpected error", time: 1000 };
        dispatch(setMessage(msg));
      } else {
        console.log("complete");
      }
    });
  };
}
