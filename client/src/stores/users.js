import { type USER } from '../constants';

export type USERS = {
    current: USER|null,
    token: string,
    list: Array<USER>
}

export let users:USERS = {
    current: null,
    token: "",
    list: []
}