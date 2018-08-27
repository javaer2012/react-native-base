/**
 * Created by guangqiang on 2017/8/21.
 */
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducers from './rootReducers'
import rootSagas from '../sagas/rootSagas'

const sagaMiddleware = createSagaMiddleware()

const middlewares = [
  sagaMiddleware
]

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)
const store = createStoreWithMiddleware(rootReducers)

sagaMiddleware.run(rootSagas)

export default store