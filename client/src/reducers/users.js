// @flow
import { users } from '../stores/users';
import { type USERS } from '../stores/users';
import { UPDATE_AUTH_USER, type ACTION, UPDATE_PROFILE_DATA, UPDATE_CURRENT_USER } from '../constants';
import { setCookie } from '../utils/cookies';

export function userReducer(store:USERS = users, action:ACTION): USERS{
    switch(action.type){
        case UPDATE_AUTH_USER:
            if(typeof action.data === 'object'){
                let token: string = "";
                let user = null;
                if(typeof action.data.token === 'string') token = action.data.token; else token = store.token;
                if(typeof action.data.user === 'object') user = action.data.user;
                store = Object.assign({}, store, { current: user, token: token } );
                setCookie('userdata', encodeURIComponent( JSON.stringify({ user: user, token: token }) ), 8);
            }else{
                store = Object.assign({}, store, { current: null, token: "" } );
            }
        break;
        case UPDATE_CURRENT_USER:
            store = Object.assign({}, store, {current: action.data});
        break;
        case UPDATE_PROFILE_DATA:
            if(typeof action.data === 'object'){
                store = Object.assign({}, store, { profile: action.data });
            }else{
                store = Object.assign({}, store, { profile: null });
            }
        break;
        default: 
        break;
    }

    return store;
}