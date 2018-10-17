import { delay } from 'redux-saga'
import { put, takeEvery, select } from 'redux-saga/effects'
import api from '../service/api'
import {AsyncStorage} from 'react-native'

export function* myPageInit(action) {

    console.log("MyPageInit", action)

}

export function* getUserInfo(action) {

    try {
        const infos = yield select(state => ({
            provinceCode: state.locationReducer.locationInfos.provinceCode,
            cityCode: state.locationReducer.locationInfos.cityCode,
            openId: state.app.openId,
            userId: state.app.userId
        }))

        console.log("Infos", infos)

        const userInfo = yield api.getUserInfo({
            ...infos
        })

        console.log("New User Info",userInfo)

       const {data} = userInfo

       if(data.errcode === 1) {
           yield AsyncStorage.setItem("userInfo",JSON.stringify(data.userInfo))
           yield put({
            type:"SET_USERINFO",
            payload:data.userInfo
        })
       }

    } catch (e) { }

}