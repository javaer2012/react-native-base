import { combineReducers, createStore } from "redux";
import * as home from './home'
import * as education from './education'
import {myPageReducer} from './myPage'
import {appReducer} from "./appReducer";
import {historyKey} from './historyKeys'
import {bankCard} from './bankCard'
import {find} from './find'
import {orderReducer} from './orderList'

const rootReducers = combineReducers({
    my:myPageReducer,
    app:appReducer,
    historyKey,
    bankCard,
    find,
    order:orderReducer,
    ...home,
    ...education
});


export default rootReducers