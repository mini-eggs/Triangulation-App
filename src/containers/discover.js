import { connect } from "react-redux";
import { DiscoverActions, FirebaseActions } from "../actions/";
import { DiscoverScene } from "../scenes/discover";

const stateToProps = state => {
  return {
    images: state.FirebaseReducer.featured,
    image: state.DiscoverReducer.image
  };
};

const actionsToProps = dispatch => {
  return {
    getFeaturedImages: () => dispatch(FirebaseActions.getFeaturedImages())
  };
};

export const DiscoverContainer = connect(stateToProps, actionsToProps)(
  DiscoverScene
);
