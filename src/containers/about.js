import { connect } from "react-redux";
import { FirebaseActions } from "../actions/";
import { AboutScene } from "../scenes/about";

// TODO: move this into a firebase layer

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

export const AboutContainer = connect(stateToProps, actionsToProps)(AboutScene);
