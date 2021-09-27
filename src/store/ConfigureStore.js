import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
//import {composeWithDevTools} from 'redux-devtools-extensions';
import addToFavorites from './reducers';

//const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

export default createStore(addToFavorites, applyMiddleware(logger));
