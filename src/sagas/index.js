import * as homeSagas from './home'
import * as mySaga from './my'
import * as appSaga from './app'
import {takeEvery} from 'redux-saga'

export default function* rootSagas() {
    yield takeEvery('APP_STATUS',appSaga.app)
    yield takeEvery('INCREMENT_ASYNC', homeSagas.incrementAsync)
    yield takeEvery('SET_LOCATION_ASYNC', homeSagas.setLocationFun)
    yield takeEvery("MYPAGE_INIT", mySaga.myPageInit)
}