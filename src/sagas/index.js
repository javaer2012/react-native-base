import * as homeSagas from './home'
import * as mySaga from './my'
import * as appSaga from './app'
import * as historySaga from './historyKeys'
import {takeEvery} from 'redux-saga'

console.log(homeSagas,"homeSagashomeSagas==>homeSagas")
export default function* rootSagas() {
    yield takeEvery('APP_STATUS',appSaga.app)
    yield takeEvery('ADD_HISTORY_KEYS',historySaga.historyKeys)
    yield takeEvery("MYPAGE_INIT", mySaga.myPageInit)
    yield takeEvery("LOGOUT",appSaga.logout)
    yield takeEvery('home/GET_HOME_PRODUCTS', homeSagas.getHotProductsAsync);
    yield takeEvery('home/GET_BANNER_AND_NAV', homeSagas.getBannerAndListAsync);
    
}