import { connect } from "react-redux";
import { DiscoverActions, FirebaseActions } from "../actions/";
import { DiscoverScene } from "../scenes/discover";

const stateToProps = state => {
  return {
    images: state.FirebaseReducer.voteImagesTop.map(item => item.image)
  };
};

const actionsToProps = dispatch => {
  return {};
};

export const DiscoverContainer = connect(stateToProps, actionsToProps)(
  DiscoverScene
);
