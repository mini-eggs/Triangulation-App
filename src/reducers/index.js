import { combineReducers } from "redux";
import { DiscoverReducer } from "./discover";
import { WorkshopReducer } from "./workshop";
import { ModalReducer } from "./modal";
import { FirebaseReducer } from "./firebase";

export const Reducers = combineReducers({
  DiscoverReducer,
  WorkshopReducer,
  ModalReducer,
  FirebaseReducer
});
