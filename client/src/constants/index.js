//@flow
export const UPDATE_AUTH_USER:string = "UPDATE_AUTH_USER";
export const UPDATE_FORM_STATUS: string = "UPDATE_FORM_STATUS";
export const REQUEST_SIGN_UP: string = "REQUEST_SIGN_UP";

export type USER = {
    _id: string,
    firstName: string,
    lastName: string,
    email?: string,
    avatar?: string,
    role: number,
    verified: boolean,
    validationCode?: string,
    created?: string,
    updated?: string,
    token?: string
}

export type STATUSES = 0 | 1 | 2 | 3;   // 0 - active, 1 - pending, 2 - success, 3 - field
export type FROM_STATUS_UPDATE = {
    formName: string,
    status: STATUSES
}

export type RequestSignUP = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    password_repeat?: String,
    role: ?number
}

export type ACTION = {
    type: string,
    data: USER | FROM_STATUS_UPDATE
}

export const SERVER = {
    apihost: "http://localhost:9000",
    URI:{
        POST:{
            signin: "/api/users/signin",
            signup: "/api/users/signup"
        }
    }
}