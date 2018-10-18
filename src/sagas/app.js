import { delay } from 'redux-saga'
import { put, takeEvery } from 'redux-saga/effects'
import {AsyncStorage} from 'react-native'

export function* app(action){

    try{

        console.log("GET STATUS~~~~~~~")

        const isLoggedIn = yield AsyncStorage.getItem('isLoggedIn')
        if(isLoggedIn === '1'){
           yield  put({type:'LOGGEDIN'})
        } else {
           yield put({type:'ANONIMOUS'})
        }

    } catch (e) {

    }

}

export function* logout(action) {

    try {

        yield AsyncStorage.removeItem('historyKeys')
        yield AsyncStorage.removeItem('isLoggedIn')
        yield AsyncStorage.removeItem('userInfo')
        yield put({
            type:'INIT_HISTORY_KEYS',
            payload:[]
        })
        yield put({
            type:'CLEAR_LOGGEDIN'
        })
        yield put({
            type:'USER_INFO'
        })
    } catch (e) {

    }

}