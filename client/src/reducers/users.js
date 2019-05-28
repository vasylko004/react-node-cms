// @flow
import { users } from '../stores/users';
import { type USERS } from '../stores/users';
import { UPDATE_AUTH_USER, type ACTION, type USER } from '../constants';
import { setCookie } from '../utils/cookies';

export function userReducer(store:USERS = users, action:ACTION): USERS{
    switch(action.type){
        case UPDATE_AUTH_USER:
            if(typeof action.data === 'object'){
                let token: string = "";
                let user = null;
                if(typeof action.data.token === 'string') token = action.data.token;
                if(typeof action.data.user === 'object') user = action.data.user;
                store = Object.assign({}, store, {current: user, token: token} );
                setCookie('userdata', encodeURIComponent( JSON.stringify({ user: user, token: token }) ), 8);
            }else{
                store = Object.assign({}, store, { current: null, token: "" } );
            }
        break;
        default: 
        break;
    }

    return store;
}