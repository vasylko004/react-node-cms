// @flow
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as uniqid from 'uniqid';
import * as async from 'async';
import * as Joi from 'joi';
import { Promise } from 'es6-promise';
import DefaultModel from './default-model';
import { type UserRequestObject } from '../constants/users';

const SALT_FACTOR:number = 12;
const ObjectId = mongoose.Types.ObjectId;

class UserModel extends DefaultModel{
    constructor(){
        super("users");
        this.schema = mongoose.Schema({
            id: ObjectId,
            firstName: String,
            lastName: String,
            email: { type: String , unique: true, required: true },
            password: { type: String , required: true },
            avatar: String,
            role: {type: Number, default: 1}, // 0 - Administrator
            verified: Boolean,
            validationCode: String,
            created: { type: Date, default: Date.now },
            updated: { type: Date, default: Date.now}
        });

        this.schema.pre('save', function (next) { // handling adding and updating data to db
            const user = this;
      
            if (!user.isModified('password')) { next(); } // check if it senda filed password to saving
      
            bcrypt.genSalt(SALT_FACTOR, function (err, salt) {  // ganarate hash for password and save hash in db instead of password
              if (err) {
                return next(err);
              }
      
              bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                  return next(err);
                }
                user.password = hash;
                next();
              });
            });
        });
      
        this.schema.methods.comparePassword = function (candidatePassword: string, next: any) { // add to user model function comparing passwords
            bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
                if (err) {
                return next(err);
                }
                next(null, isMatch);
            });
        };

        this.validator = Joi.object().keys({
            email: Joi.string().email({ minDomainAtoms: 2 }),
            firstName: Joi.string().alphanum().min(3).max(30).required(),
            lastName: Joi.string().alphanum().min(3).max(30).required(),
            password: Joi.string().min(6).max(30),
            role: Joi.number(),
            avatar: Joi.string()
        })
          
        this.initModel();
    }


    checkCredantial(email: String, password: String){
        let promise = new Promise((resolve, reject)=>{
            this.modelDB.findOne({email: email})
                .then((user)=>{
                    user.comparePassword(password, (err,isMatch)=>{
                    if(err){
                        reject(null)
                        return false;
                    }
                    if(isMatch){
                        resolve(user);
                    }else{
                        reject(null);
                    }
                    })
                })
                .catch((err)=>{
                    reject(null)
                });
        })

        return promise;
    }

    create(data: UserRequestObject){
        return super.create(data);
    }
    
}

export default UserModel;