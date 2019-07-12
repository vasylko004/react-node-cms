//@flow
export const UPDATE_AUTH_USER:string = "UPDATE_AUTH_USER";
export const UPDATE_FORM_STATUS: string = "UPDATE_FORM_STATUS";
export const REQUEST_SIGN_UP: string = "REQUEST_SIGN_UP";
export const REQUEST_SIGN_IN: string = "REQUEST_SIGN_IN";
export const REQUEST_UPDATE_USER: string = "REQUEST_UPDATE_USER";
export const UPDATE_PROFILE_DATA: string = "UPDATE_PROFILE_DATA";
export const UPDATE_CURRENT_USER: string = "UPDATE_CURRENT_USER";

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

export type DropDownData = {
    name: string,
    value: string | number,
    icon?: string,
    group?: string
}

export type Path = {
    d: string,
    fill?: string,
    type: "path"
}

export type Group = {
    paths: Array<Path>,
    type: "group"
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
    role?: number,
    verified?: boolean
}

export type ACTION = {
    type: string,
    data: any
}

export type MenuItem = {
    name: string,
    url: string
}

export const SERVER = {
    apihost: "http://localhost:9000",
    URI:{
        POST:{
            signin: "/api/users/signin",
            signup: "/api/users/signup",
        },
        PUT: {
            user: '/api/users/[:id]'
        }
    }
}

export const MenuItems: Array<MenuItem> = [
    {
        name: "Dashboard",
        url: "/admin/dashboard"
    },
    {
        name: "Profile",
        url: "/admin/profile"
    },
    {
        name: "Pages",
        url: "/admin/pages"
    }
]