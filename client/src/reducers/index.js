import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { pageReducer } from './pages';

export default combineReducers({
    routing: routerReducer, 
    pages: pageReducer
})

