import {createStore, combineReducers, applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
import rootReducer from './reducers';

const indexReducer = combineReducers({
  rootReducer,
});

export const Store = createStore(indexReducer, applyMiddleware(thunk));
