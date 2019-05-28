import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { pageReducer } from './pages';
import {formsReducer} from './forms';
import { userReducer } from './users';


export default combineReducers({
    routing: routerReducer, 
    pages: pageReducer,
    forms: formsReducer,
    users: userReducer
})

