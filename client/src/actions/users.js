//@flow
import axios from 'axios';
import { SERVER ,type USER } from '../constants';

export function signup(data:{
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: ?number
}){
    let promise:Promise<any> = new Promise((resolve: ()=>void, reject: (error: Error)=>void)=>{
        axios.post({
            url: SERVER.apihost + SERVER.URI.POST.signup,
            method: "POST",
            data: data
        }).then((response)=>{
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