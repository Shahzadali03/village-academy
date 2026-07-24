import {createStore} from "redux";
import rootReducer from "./reducer/rootreducer";
import createSagaMiddleware from 'redux-saga'
import rootSaga from "./saga/rootSaga";
import { applyMiddleware } from "redux";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;