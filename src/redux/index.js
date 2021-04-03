import {stateReducer} from "./state-reducer";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import createSagaMiddleware from 'redux-saga';

import {sagaWatcher} from './sagas';

const rootReducer = combineReducers({
  state: stateReducer
});

const sagaMiddleware = createSagaMiddleware()

const configurationStore = () => {
  const store = createStore(rootReducer, compose(
  applyMiddleware(
    sagaMiddleware
  ),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

return store
};

export default configurationStore();


sagaMiddleware.run(sagaWatcher)
