export type USERS = {
    current: object|null,
    token: string,
    list: Array<object>
}

export let users:USERS = {
    current: null,
    token: "",
    list: []
}