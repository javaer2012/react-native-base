import { combineReducers, createStore } from "redux";
import * as home from './home'

const rootReducers = combineReducers({
    ...home,
});


export default rootReducers