import React, { Component } from "react";
import * as firebase from "firebase";
import { connect } from "react-redux";
import * as Keys from "../keys/";

/**
 * Documentation
 * https://firebase.google.com/docs/reference/js/firebase.database.Reference
 */

const credentials = {
  apiKey: Keys.FIREBASE_API_KEY,
  databaseURL: Keys.FIREBASE_DATABASE_URL
};

firebase.initializeApp(credentials);
firebase.database();

class FirebaseComponent extends Component {
  componentDidMount() {
    this.addEventListeners();
  }

  componentWillUnmount() {
    this.removeEventListeners();
  }

  addEventListeners() {}

  removeEventListeners() {}

  render() {
    return this.props.children;
  }
}

const stateToProps = state => {
  return {};
};

const actionsToProps = dispatch => {
  return {};
};

export const FirebaseLayer = connect(stateToProps, actionsToProps)(
  FirebaseComponent
);
