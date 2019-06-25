// @flow
import mongoose from 'mongoose';
import * as Joi from 'joi';
import Promise from 'es6-promise';
import * as async from 'async';
import { ValidationError } from "../helpers/errors";
const ObjectId = mongoose.Schema.Types.ObjectId;

// it is abstract class and used only for inheritance
class DefaultModel{
    // these properties must be initialized in child classes
    schema:mongoose.Schema;
    modelDB:mongoose.Model;
    name:string;
    validator:Joi.Schema;

    constructor(name:string){
        this.name = name;
    }

    initModel(){ // 
        if(!this.modelDB){
            try{
                this.modelDB = mongoose.model(this.name);
            }catch(err){
                this.modelDB = mongoose.model(this.name, this.schema);
            }
        }
    }

    clearDatabase(): Promise<any>{ // this method created for testing api and work only in Test Mode;
        var promise = new Promise((resolve, reject)=>{
            if(process.env.NODE_ENV === 'test'){
                this.modelDB.deleteMany({}, function(err: any, res: any){
                    if(err){
                        reject(err);
                    }else{
                        resolve(res);
                    }
                })
            }else{
                reject(new Error("Method Clear Database have only worked in Test Mode!"));
            }
        });

        return promise;
    }

    one(id: ObjectId, injection: Array<(doc:{})=>{}>): Promise<any>{
        let promise = new Promise((resolve, reject)=>{
            if(mongoose.Types.ObjectId.isValid(id)){
                this.modelDB.findOne({ _id: id }, function(err:any, doc:any){
                    if(err){
                        reject(err)
                    }else{ 
                        async.eachSeries(injection, (item, callback)=>{
                            doc = item(doc)
                            callback();
                        },function(err){
                            resolve(doc)
                        })                       
                    }
                })
            }else{
                reject(new ValidationError("Invalid ID"));
            }
        });

        return promise;
    }

    create(data: any, before: Array<(data: any, callback: any)=>void> = [], after: Array<(data: any, callback: any)=>void> = []): Promise<any>{  // before - list functions which will used after validation and before creation
        // before function need to have to params data and callback for ex: (data, callback)=>{ /* code which changes data */ callback(null, data) }
        // after - list functions wich will used after create function and need to have structure (doc, callback)=>{ /* code which changes doc */ collback(null, doc) }
        let listCallbacks: Array<(...callback:any)=>void> = [
            (callback)=>{ // validation data ( validator need to be initializied in child models )
                Joi.validate(data, this.validator, callback);
            }
        ]
        for (let i = 0; i < before.length; i++) {
            listCallbacks.push(before[i]);
        }
        listCallbacks.push((data, callback)=>{
            this.modelDB.create(data, callback);
        });
        for (let i = 0; i < after.length; i++) {
            listCallbacks.push(after[i]);
            
        }
        let promise = new Promise((resolve, reject)=>{                   
            async.waterfall(listCallbacks, function(error: any, result: any){
                if(error){
                    if(error.code === 11000){
                        reject(new ValidationError("UniqueDublication"));
                    }else{
                        reject(error);
                    }
                }else{
                    resolve(result);
                }
            })
        });

        return promise;
    }

    update(id: ObjectId, data: any, before?: Array<(...callback:any)=>void>, after?:Array<(...callback:any)=>void> ): Promise<any>{
        let promise = new Promise((resolve, reject)=>{
            let listCallbaks:Array<(...callback:any)=>void> = [
                (callback)=>{
                    if(mongoose.Types.ObjectId.isValid(id)){
                        Joi.validate(data, this.validator, callback);
                    }else{
                        callback(new Error("Incorrect id"))
                    }
                }
            ];
            
            if(before) listCallbaks.push(...before);
            

            listCallbaks.push((data, callback)=>{
                //console.log(data);
                this.modelDB.updateOne({_id: id}, data, callback)
            })

            listCallbaks.push((doc, callback)=>{
                this.modelDB.findById(id, callback);
            })

            if(after) listCallbaks.push(...after);

            async.waterfall(listCallbaks, function(err, result){
                if(err){
                    reject(err);
                }else{
                    resolve(result)
                }
            })
        })

        return promise;
    }

    delete(id: ObjectId): Promise<any>{
        let promise = new Promise((resolve, reject)=>{
            if(mongoose.Types.ObjectId.isValid(id)){
                this.modelDB.deleteOne({_id: id}, function(err:any, result:any){
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                })
            }else{
                reject(new ValidationError(" Invalid ID "));
            }
        });

        return promise;
    }

    
}

export default DefaultModel;