import { delay } from 'redux-saga'
import { put, takeEvery,select } from 'redux-saga/effects'
import api from '../service/api'

export function* find(action){

    try{

        const infos = yield select(state=>({
            openId:state.app.openId,
            userId:state.app.userId,
            provinceCode: state.locationReducer.locationInfos.provinceCode,
            cityCode: state.locationReducer.locationInfos.cityCode,
            pageNum:state.find.pageNum,
            pageSize:state.find.pageSize
        }))

        const find = yield api.findItemList({
            ...infos,
            pageNum:infos.pageNum||1,
            pageSize:infos.pageSize||10,
        })

        const {data} = find

        if(data.errcode === 1){
            yield put({
                type:"SET_FIND_LIST",
                payload:data.findItemList
            })
        }

    } catch(e){

    }
}