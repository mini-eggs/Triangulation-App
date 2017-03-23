import { connect } from "react-redux";
import {
  DiscoverActions,
  WorkshopActions,
  ModalActions,
  FirebaseActions
} from "../actions/";
import { WorkshopScene } from "../scenes/workshop";

const stateToProps = state => {
  return {
    initialImage: state.DiscoverReducer.image,
    image: state.WorkshopReducer.image,
    options: state.WorkshopReducer.options
  };
};

const actionsToProps = dispatch => {
  return {
    setMessage: message => dispatch(ModalActions.setMessage(message)),
    resetImage: () => {
      dispatch(WorkshopActions.resetImage());
    },
    removeInitialImage: () => dispatch(DiscoverActions.setImage(undefined)),
    trianguleImage: (image, options) =>
      dispatch(WorkshopActions.trianguleImage(image, options)),
    submitVote: image => dispatch(FirebaseActions.submitVote(image))
  };
};

export const WorkshopContainer = connect(stateToProps, actionsToProps)(
  WorkshopScene
);
