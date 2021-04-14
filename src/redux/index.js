import {sagaWatcher} from './sagas';
import {stateReducer} from "./state-reducer";
import createSagaMiddleware from 'redux-saga';
import {applyMiddleware, combineReducers, compose, createStore} from "redux";


const rootReducer = combineReducers({
  state: stateReducer
});

const sagaMiddleware = createSagaMiddleware();

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


sagaMiddleware.run(sagaWatcher);
