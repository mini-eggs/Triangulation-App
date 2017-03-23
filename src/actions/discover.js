import { showImagePicker } from "react-native-image-picker";
import { setMessage } from "./modal";

const ImagePickerOptions = {
  maxWidth: 1200,
  maxHeight: 1200,
  quality: 1
};

export const setImage = image => {
  return {
    type: "SET_IMAGE_ACTION",
    payload: {
      image: image
    }
  };
};

const getImage = () => {
  return new Promise((resolve, reject) => {
    showImagePicker(ImagePickerOptions, response => {
      if (response.didCancel || response.error || response.customButton) {
        reject(response);
      } else {
        resolve(response.data);
      }
    });
  });
};

export const chooseImage = () => {
  return async dispatch => {
    try {
      dispatch(setImage(await getImage()));
    } catch (err) {
      if (!err.didCancel) {
        // we're assuming user did
        // not permit usage of camera
        // slash photos at this point
        dispatch(setMessage({ text: "Check permissions", time: 2000 }));
      }
    }
  };
};
