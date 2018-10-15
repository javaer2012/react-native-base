import { delay } from 'redux-saga'
import { put, takeEvery,select } from 'redux-saga/effects'
import {AsyncStorage} from 'react-native'

export function* historyKeys (action) {
    const keys = yield select(state=>{
        console.log(state)
        return state.historyKey.keys
    })
    const set = new Set(keys)
    set.add(action.payload)
    const newKeys = Array.from(set)
    if(newKeys.length > 10) newKeys.shift()
    const keyString = JSON.stringify(newKeys)
    yield AsyncStorage.setItem("historyKeys",keyString)
    yield put({
        type:"INIT_HISTORY_KEYS",
        payload:newKeys
    })
}