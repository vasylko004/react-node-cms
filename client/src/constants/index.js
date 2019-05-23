export type USER = {
    id: string,
    firstName: string,
    lastName: string,
    email?: string,
    avatar?: string,
    role: number,
    verified: boolean,
    validationCode?: string,
    created: string,
    updated: string
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