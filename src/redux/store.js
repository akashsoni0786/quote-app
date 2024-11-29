import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import authReducer from './reducers/authReducer';
import quoteReducer from './reducers/quoteReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  quotes: quoteReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
