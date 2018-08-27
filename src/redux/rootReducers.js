import { combineReducers, createStore } from "redux";

// const theDefaultReducer = (state = 0, action) => state;
import { reducers as homeReducers } from '../containers/Home'

const rootReducers = combineReducers({
  ...homeReducers
});


export default rootReducers 