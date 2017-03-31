import { connect } from "react-redux";
import {
  DiscoverActions,
  TriangulateActions,
  ModalActions,
  WorkshopActions,
  FirebaseActions
} from "../actions/";
import { WorkshopScene } from "../scenes/workshop";

const stateToProps = state => {
  return {
    initialImage: state.DiscoverReducer.image,
    image: state.TriangulateReducer.imageComplete,
    options: state.WorkshopReducer.options,
    imageUrl: state.WorkshopReducer.image
  };
};

const actionsToProps = dispatch => {
  return {
    setMessage: message => dispatch(ModalActions.setMessage(message)),
    resetImage: () => {
      dispatch(TriangulateActions.resetImage());
    },
    removeInitialImage: () => dispatch(DiscoverActions.setImage(undefined)),
    trianguleImage: (image, options) =>
      dispatch(TriangulateActions.setImageSrcAndOptions(image, options)),
    submitVote: image => dispatch(FirebaseActions.submitVote(image)),
    uploadPhoto: base64 => dispatch(WorkshopActions.uploadPhoto(base64))
  };
};

export const WorkshopContainer = connect(stateToProps, actionsToProps)(
  WorkshopScene
);
