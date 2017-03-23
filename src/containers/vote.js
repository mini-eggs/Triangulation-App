import { connect } from "react-redux";
import { FirebaseActions, ModalActions } from "../actions/";
import { VoteScene } from "../scenes/vote";

const stateToProps = state => {
  return {
    recent: state.FirebaseReducer.voteImagesRecentEligible
  };
};

const actionsToProps = dispatch => {
  return {
    setMessage: message => dispatch(ModalActions.setMessage(message)),
    getFeaturedImages: () => dispatch(FirebaseActions.getFeaturedImages()),
    incrementScore: (voteData, score) =>
      dispatch(FirebaseActions.incrementScore(voteData, score))
  };
};

export const VoteContainer = connect(stateToProps, actionsToProps)(VoteScene);
