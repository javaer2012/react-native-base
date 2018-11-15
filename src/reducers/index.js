import { combineReducers, createStore } from "redux";
import * as home from './home'
import * as education from './education'
import {myPageReducer} from './myPage'
import {appReducer} from "./appReducer";
import {historyKey} from './historyKeys'
import {bankCard} from './bankCard'
import {find} from './find'
import {orderReducer} from './orderList'
import {search} from './search'


function common(state = {}, action) {
    switch (action.type) {
        case 'CHANGE_LOADING': // 改变loading状态
            return Object.assign({}, state, {
                loading: action.data
            })
        default:
            return state
    }
}


const rootReducers = combineReducers({
    my:myPageReducer,
    app:appReducer,
    historyKey,
    bankCard,
    find,
    order:orderReducer,
    common,
    search,
    ...home,
    ...education
});


export default rootReducers