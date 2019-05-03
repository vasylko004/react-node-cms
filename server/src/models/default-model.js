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

    clearDatabase(){ // this method created for testing api and work only in Test Mode;
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

    one(id: ObjectId){
        let promise = new Promise((resolve, reject)=>{
            if(mongoose.Types.ObjectId.isValid(id)){
                this.modelDB.findOne({ _id: id }, function(err:any, doc:any){
                    if(err){
                        reject(err)
                    }else resolve(doc);
                })
            }else{
                reject(new ValidationError("Invalid ID"));
            }
        });

        return promise;
    }

    create(data: any){
        let promise = new Promise((resolve, reject)=>{
            async.waterfall([
                (callback: any)=>{ // validation data ( validator need to be initializied in child models )
                    Joi.validate(data, this.validator, callback);
                },
                (data, callback: any)=>{
                    this.modelDB.create(data, callback);
                }
            ], function(error: any, result: any){
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

    delete(id: ObjectId){
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