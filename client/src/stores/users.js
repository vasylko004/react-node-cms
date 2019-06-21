import { type USER } from '../constants';
import { getCookie } from '../utils/cookies';

let userDataEncoded:string = getCookie('userdata');
let userData: { user: USER, token: string} | null = null;
if(userDataEncoded){
    userData = JSON.parse(decodeURIComponent(userDataEncoded));
}

export type USERS = {
    current: USER|null,
    token: string,
    profile: USER|null,
    list: Array<USER>
}

export let users:USERS = {
    current: userData?userData.user:null,
    token: userData?userData.token:"",
    profile: null,
    list: []
}