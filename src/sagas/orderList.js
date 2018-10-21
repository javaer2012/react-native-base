import { delay } from 'redux-saga'
import { put, takeEvery,select } from 'redux-saga/effects'
import api from '../service/api'

export function* orderList(action){

    try{

        const infos = yield select(state=>({
            openId:state.app.openId,
            userId:state.app.userId,
            provinceCode: state.locationReducer.locationInfos.provinceCode,
            cityCode: state.locationReducer.locationInfos.cityCode
        }))

        const order = yield api.myOrderList({
            ...infos,
            pageNum:1,
            pageSize:20,
        })

        const {data} = order

        if(data.errcode === 1){
            yield put({
                type:"SET_ORDER_LIST",
                payload:data.orderList
            })
        }

    } catch(e){

    }
}