import { type STATUSES } from '../constants';

export type FORMS = {  
    signup: STATUSES,
    signin: STATUSES
}

export let forms: FORMS = {
    signup: 0,
    signin: 0
}