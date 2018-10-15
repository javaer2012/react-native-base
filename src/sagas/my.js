import { delay } from 'redux-saga'
import { put, takeEvery } from 'redux-saga/effects'

export function* myPageInit(action){

    console.log("MyPageInit",action)

}