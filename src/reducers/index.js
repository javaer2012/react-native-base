import { combineReducers, createStore } from "redux";
import * as home from './home'
import {myPageReducer} from './myPage'
import {appReducer} from "./appReducer";
import {historyKey} from './historyKeys'

const rootReducers = combineReducers({
    my:myPageReducer,
    app:appReducer,
    historyKey,
    ...home
});


export default rootReducers