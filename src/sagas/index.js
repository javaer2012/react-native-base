import * as homeSagas from './home'
import { takeEvery } from 'redux-saga'

export default function* rootSagas() {
  yield takeEvery('INCREMENT_ASYNC', homeSagas.incrementAsync)
  yield takeEvery('SET_LOCATION_ASYNC', homeSagas.setLocationFun)
}