// @flow
import { forms, type FORMS } from '../stores/forms';
import {  type ACTION, UPDATE_FORM_STATUS } from '../constants';

export function formsReducer(store:FORMS = forms, action:ACTION): FORMS{
    switch(action.type){
        case UPDATE_FORM_STATUS:
            if(typeof action.data.formName === 'string' && action.data.status){
                let newStore = {}; 
                newStore[action.data.formName] = action.data.status;
                store = Object.assign({}, store, newStore);
            }
        break;
        default:
        break;
    }
    return store;
}