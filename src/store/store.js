/**
 * Created by guangqiang on 2017/8/21.
 */
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers';
import rootSagas from '../sagas'

const sagaMiddleware = createSagaMiddleware()

const middleWares = [
  sagaMiddleware
]

const createStoreWithMiddleware = applyMiddleware(...middleWares)(createStore)
const store = createStoreWithMiddleware(rootReducer)

sagaMiddleware.run(rootSagas)
console.log(JSON.stringify(store.getState()),"111111111111111")

export default store