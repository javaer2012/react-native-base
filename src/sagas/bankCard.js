import { delay } from 'redux-saga'
import { put, takeEvery,select } from 'redux-saga/effects'
import api from '../service/api'

export function* initBankCard() {
  const infos = yield select(state=>({
      openId:state.app.openId,
      userId:state.app.userId
  }))
  const card = yield api.queryMyBank({...infos})

  const {data} = card
  if(data.errcode === 1)(
      yield put({
          type:"SET_BANK_CARD",
          payload:data.cardInfo
      })
  )
}
