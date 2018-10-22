import * as homeSagas from './home'
import * as mySaga from './my'
import * as appSaga from './app'
import * as historySaga from './historyKeys'
import * as bankSaga from './bankCard'
import * as findSaga from './find'
import * as orderSaga from './orderList'

import { takeEvery } from 'redux-saga/effects'
console.log(homeSagas,"homeSagashomeSagas==>homeSagas")
export default function* rootSagas() {
    yield takeEvery('APP_STATUS',appSaga.app)
    yield takeEvery('IS_OPEN_ASYNC', homeSagas.isOpenAsync)
    yield takeEvery('QUERY_ORDER_LIST', orderSaga.orderList)
    yield takeEvery('ADD_HISTORY_KEYS',historySaga.historyKeys)
    yield takeEvery("MYPAGE_INIT", mySaga.getUserInfo)
    yield takeEvery("LOGOUT",appSaga.logout)
    yield takeEvery('HOME_GET_HOME_PRODUCTS', homeSagas.getHotProductsAsync);
    yield takeEvery('HOME_GET_BANNER_AND_NAV', homeSagas.getBannerAndListAsync);
    
    yield takeEvery("INIT_BANK_CARD",bankSaga.initBankCard)
    yield takeEvery("QUERY_FIND_LIST",findSaga.find)

}