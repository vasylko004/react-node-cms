//@flow
import axios from 'axios';
import { SERVER ,type USER, type RequestSignUP } from '../constants';

export function signup(data:RequestSignUP){
    let promise:Promise<any> = new Promise((resolve: ()=>void, reject: (error: Error)=>void)=>{
        axios.post( SERVER.apihost + SERVER.URI.POST.signup, data ).then((response)=>{
            resolve();
        }).catch((error)=>{
            reject(error)
        })
    });

    return promise;
}

export function signin(data: { email: string,  password: string}){
    let promise:Promise<any> = new Promise((resolve: ({ user:USER, token: string})=>void, reject: (error: Error)=>void)=>{
        axios.post(SERVER.apihost + SERVER.URI.POST.signin, data ).then((response)=>{
            let result:{ user: USER, token: string } = response.data.data;
            resolve(result);
        }).catch((error)=>{
            reject(error);
        })
    })
    
    return promise;
}

export function updateUser(data: FormData){
    let promise: Promise<any> = new Promise((resolve, reject)=>{
        axios.put(SERVER.apihost + SERVER.URI.PUT.user, data).then((response)=>{
            let result:USER = response.data.data;
            resolve(result);
        }).catch((error)=>{
            reject(error);
        })
    });

    return promise;
}