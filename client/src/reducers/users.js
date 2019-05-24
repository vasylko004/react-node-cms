// @flow
import { users } from '../stores/users';
import { type USERS } from '../stores/users';
import { UPDATE_AUTH_USER, type ACTION } from '../constants';

export function userReducer(store:USERS = users, action:ACTION): USERS{
    switch(action.type){
        case UPDATE_AUTH_USER:
            if(typeof action.data === 'object'){
                let token: string = "";
                if(typeof action.data.token === 'string') token = action.data.token;
                store = Object.assign({}, store, {current: action.data, token: token} );
            }else{
                store = Object.assign({}, store, {current: null, token: ""} );
            }
        break;
        default: 
        break;
    }

    return store;
}