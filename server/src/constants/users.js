// @flow
export type UserRequestObject = {
    email: string,
    password: string,
    avatar: ?string,
    firstName: string,
    lastName: string,
    role: ?number
}

export let UserRequest: UserRequestObject = {
    email: "",
    password: "",
    avatar: "",
    firstName: "",
    lastName: "",
    role: 1
}