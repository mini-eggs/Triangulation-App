import { connect } from "react-redux";
import { FirebaseActions } from "../actions/";
import { VoteScene } from "../scenes/vote";

const stateToProps = state => {
  return {
    image: state.DiscoverReducer.image
  };
};

const actionsToProps = dispatch => {
  return {
    getFeaturedImages: () => dispatch(FirebaseActions.getFeaturedImages())
  };
};

export const VoteContainer = connect(stateToProps, actionsToProps)(VoteScene);
