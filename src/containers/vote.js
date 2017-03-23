import { connect } from "react-redux";
import { FirebaseActions, ModalActions } from "../actions/";
import { VoteScene } from "../scenes/vote";

const stateToProps = state => {
  return {
    image: state.DiscoverReducer.image
  };
};

const actionsToProps = dispatch => {
  return {
    setMessage: message => dispatch(ModalActions.setMessage(message)),
    getFeaturedImages: () => dispatch(FirebaseActions.getFeaturedImages())
  };
};

export const VoteContainer = connect(stateToProps, actionsToProps)(VoteScene);
