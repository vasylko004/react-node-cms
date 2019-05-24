import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { pageReducer } from './pages';
import {formsReducer} from './forms';


export default combineReducers({
    routing: routerReducer, 
    pages: pageReducer,
    forms: formsReducer
})

