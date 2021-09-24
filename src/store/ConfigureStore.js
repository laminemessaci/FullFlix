import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import addToFavorites from './reducers';

export default createStore(addToFavorites, applyMiddleware(thunk));
