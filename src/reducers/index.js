import { combineReducers, createStore } from "redux";
import * as home from './home'
import {myPageReducer} from './myPage'
import {appReducer} from "./appReducer";

const rootReducers = combineReducers({
    my:myPageReducer,
    app:appReducer,
    ...home
});


export default rootReducers