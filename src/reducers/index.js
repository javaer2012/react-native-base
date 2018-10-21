import { combineReducers, createStore } from "redux";
import * as home from './home'
import * as education from './education'
import {myPageReducer} from './myPage'
import {appReducer} from "./appReducer";
import {historyKey} from './historyKeys'
import {bankCard} from './bankCard'
import {find} from './find'


// const common = (state = { cardInfo: {} }, action) => {
//     switch (action.type) {
//         case "LOADING_STATUS":
//             return Object.assign({}, { ...state, loading: { ...action.data } })
//         default:
//             return state
//     }
// }

function common(state = {}, action) {
    switch (action.type) {
        case 'CHANGE_LOADING':
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
    common,
    ...home,
    ...education
});


export default rootReducers