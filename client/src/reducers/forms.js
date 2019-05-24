import { forms, type FORMS } from '../stores/forms';
import {  type ACTION, UPDATE_FORM_STATUS } from '../constants';

export function formsReducer(store:FORMS = forms, action:ACTION): FORMS{
    switch(action.type){
        case UPDATE_FORM_STATUS:
            if(action.data.formName && action.data.status){
                store[action.data.formName] = action.data.status;
            }
        break;
        default:
        break;
    }
    return store;
}