import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import Thunk from "redux-thunk";
import { Reducers } from "../reducers/";

const middlewares = applyMiddleware(Thunk);
const store = createStore(Reducers, middlewares);

export const ReduxLayer = props => {
  return (
    <Provider store={store}>
      {props.children}
    </Provider>
  );
};
