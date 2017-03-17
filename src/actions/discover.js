import { showImagePicker } from "react-native-image-picker";

const ImagePickerOptions = {
  maxWidth: 1000,
  maxHeight: 1000,
  quality: 0.1
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
      console.log(err);
      // TODO: figure this out
      // or maybe not
      // this most likely
      // signifies user hit cancel
    }
  };
};
