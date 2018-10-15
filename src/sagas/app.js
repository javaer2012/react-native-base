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