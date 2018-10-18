import { delay } from 'redux-saga'
import { put, takeEvery, call } from 'redux-saga/effects'
import api from '../service/api'
// getBannerAndListAsync

const { getBannerAndNav, hotProducts } = api

export function* getHotProductsAsync(action) {
  const { params: { provinceCode, cityCode } } = action
  try {
    const response= yield call(hotProducts, {
      provinceCode,
      cityCode
    })
    yield put({ type: 'GET_HOT_PRODUCTS_SUCCESS', response: response.data });
  } catch (e) {
    console.log(e);
  }
}
export function* getBannerAndListAsync(action) {
  // const { params: { provinceCode, cityCode } } = action
  try {
    const response = yield call(getBannerAndNav, {})
    // debugger
    yield put({ type: 'GET_BANNER_AND_NAV_SUCCESS', response: response.data });
  } catch (e) {
    console.log(e);
  }
}