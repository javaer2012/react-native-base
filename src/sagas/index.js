import * as homeSagas from './home'
import * as mySaga from './my'
import * as appSaga from './app'
import * as historySaga from './historyKeys'
import * as bankSaga from './bankCard'

import {takeEvery} from 'redux-saga'

export default function* rootSagas() {
    yield takeEvery('APP_STATUS',appSaga.app)
    yield takeEvery('INCREMENT_ASYNC', homeSagas.incrementAsync)
    yield takeEvery('SET_LOCATION_ASYNC', homeSagas.setLocationFun)
    yield takeEvery('ADD_HISTORY_KEYS',historySaga.historyKeys)
    yield takeEvery("MYPAGE_INIT", mySaga.getUserInfo)
    yield takeEvery("LOGOUT",appSaga.logout)
    yield takeEvery("INIT_BANK_CARD",bankSaga.initBankCard)
}