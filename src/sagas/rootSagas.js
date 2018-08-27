import * as homeSagas from './Home'
import { takeEvery } from 'redux-saga'

export default function* rootSagas() {
  yield takeEvery('INCREMENT_ASYNC', homeSagas.incrementAsync)
}