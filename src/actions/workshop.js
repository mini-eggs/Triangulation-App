import { Imgur } from "../utilities/";

export function uploadPhoto(base64) {
  return async dispatch => {
    try {
      dispatch(setImage(await Imgur.uploadPhoto(base64)));
    } catch (err) {
      // do not notify the user here
      // notify them if they try to access the photo
    }
  };
}

export function setImage(image) {
  return {
    type: "SET_IMGUR_IMAGE",
    payload: { image: image }
  };
}
