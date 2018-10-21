import { delay } from 'redux-saga'
import { put, takeEvery, call, select } from 'redux-saga/effects'
import api from '../service/api'
// getBannerAndListAsync

const { getBannerAndNav, hotProducts, isCityOpen } = api

export function* getHotProductsAsync(action) {
  // debugger
  try {
    const params = yield select(state=>{
      return ({
        openId: state.app.openId,
        userId: state.app.userId,
        provinceCode: state.locationReducer.locationInfos.provinceCode,
        cityCode: state.locationReducer.locationInfos.cityCode,
      })
    })
    const response= yield call(hotProducts, params);
    yield put({ type: 'GET_HOT_PRODUCTS_SUCCESS', response: response.data });

  } catch (error) {
    console.log('=======> ',error)
  }
}
export function* getBannerAndListAsync(action) {
  try {
    const params = yield select(state=>({
      openId:state.app.openId,
      userId:state.app.userId,
      // provinceCode: state.locationReducer.locationInfos.provinceCode,
      // cityCode: state.locationReducer.locationInfos.cityCode,
    }))
    const response = yield call(getBannerAndNav, {})
    yield put({ type: 'GET_BANNER_AND_NAV_SUCCESS', response: response.data });
  } catch (error) {
    console.log('=======> ',error)
  }
}
export function* isOpenAsync(action) {
  try {
    const params = yield select(state => ({
      openId: state.app.openId,
      provinceCode: state.locationReducer.locationInfos.provinceCode,
      cityCode: state.locationReducer.locationInfos.cityCode,
    }))
   
    const response = yield call(isCityOpen, params)
    console.log(response, "FFFFFSSSSSS")
    yield put({ type: 'IS_OPEN', playload: response.data });
  } catch (error) {
    console.log('=======> ', error)
  }
}
