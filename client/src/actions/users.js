//@flow
import axios from 'axios';
import { SERVER ,type USER, type RequestSignUP } from '../constants';

export function signup(data:RequestSignUP){
    let promise:Promise<any> = new Promise((resolve: ()=>void, reject: (error: Error)=>void)=>{
        console.log();
        axios.post( SERVER.apihost + SERVER.URI.POST.signup, data ).then((response)=>{
            resolve();
        }).catch((error)=>{
            reject(error)
        })
    });

    return promise;
}

export function signin(data: { email: string,  password: string}){
    let promise:Promise<any> = new Promise((resolve: (data:USER)=>void, reject: (error: Error)=>void)=>{

    })
    
    return promise;
}