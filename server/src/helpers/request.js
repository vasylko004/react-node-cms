// @flow
import { type UserRequestObject } from '../constants/users';
import { ClientRequest } from 'http';

export class ParsedClientRequest extends ClientRequest{
    body: any;
}

export class Request{
    request: ParsedClientRequest;


    constructor(request: any){
        this.request = request;
    }

    fetch(pattern: UserRequestObject){
        var data = Object.assign({}, pattern);
        for(let prop in data){
            if(this.request.body.hasOwnProperty(prop)){
                data[prop] = this.request.body[prop];
            }else{
                delete data[prop];
            }
        }

        return data;
    }
}

