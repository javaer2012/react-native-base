import { combineReducers, createStore } from "redux";
import * as home from './home'
import {myPageReducer} from './myPage'
import {appReducer} from "./appReducer";
import {historyKey} from './historyKeys'
import {bankCard} from './bankCard'

const rootReducers = combineReducers({
    my:myPageReducer,
    app:appReducer,
    historyKey,
    bankCard,
    ...home
});


export default rootReducers