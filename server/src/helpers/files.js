//@flow
import * as fs from 'fs';
import { CustomRequest } from '../constants';
import { waterfall, eachSeries } from 'async';
import { type } from 'os';
import * as Path from 'path';

export type RequestFileData = {
    fieldName: string,
    originalFilename: string,
    path: string,
    headers: {[string]:string},
    size: number,
    name: string,
    type: string
}

const publicFolder = "./server/public";

export class FileHelper{
    filepath: string;

    constructor(path: string){
        this.filepath = path;
        //this.prepareDir(path);
    }

    prepareDir(path:string, callback: (err: Error|null)=>void){
        let list = path.split("/");
        let _path = this.filepath;
        let addPath = "";
        //console.log(list);
        eachSeries(list, (item, cb)=>{
            if(item){
                //console.log(addPath);
                let realpath = Path.resolve(_path + addPath + '/' + item);
                //console.log(realpath);
                fs.access(realpath, fs.constants.R_OK, (err)=>{
                    if(err){
                        fs.mkdir(realpath, {}, (err)=>{
                            console.log(err)
                            if(err){
                                addPath += '/' + item;
                                cb(err)
                            }else{
                                addPath += '/' + item;
                                cb();
                            }
                        })
                    }else{
                        addPath += '/' + item;
                        cb();
                    }
                })
            }else cb();
        }, (err)=>{
           if(err){
               callback(err)
           }else{
               callback(null);
           }
        })
    }

    upload(req: CustomRequest, name: string, path?: string,  filename?: string): Promise<any> {
        let  promise = new Promise((resolve, reject)=>{
            if (req.files) {
                if (req.files[name]) {
                    const file:RequestFileData = req.files[name];
                    let _path = this.filepath;
                    let _filename = file.name;
                    let newPath = "";
                    if(path){
                        _path += path;
                    }
                    waterfall([
                        (cb)=>{
                            fs.access(file.path, fs.constants.R_OK , cb);
                        },
                        (cb)=>{
                            fs.access(_path, fs.constants.R_OK , cb);
                        },
                        (cb)=>{
                            if(filename) _filename = _filename + "." + file.originalFilename.split(".")[1];
                            newPath =  Path.resolve(_path + _filename);
                            //console.log(__dirname, _path, _filename, newPath);
                            if(newPath){ 
                                console.log(newPath);
                                fs.rename(file.path, newPath, cb);
                            }else{
                                cb(new Error("incorret file path"));
                            }
                        },
                        (cb)=>{
                            cb(null, {filePath: _path.replace(this.filepath, "/static") + _filename, name: _filename})
                        }
                    ], function(err, result){
                        if(err){
                            console.log(err);
                            reject(err);
                        }else{
                            resolve(result);
                        }
                    })
                } else {
                    reject(new Error("file not found"))
                }
            } else {
                reject(new Error("it is not any file in request"));
            }
        });

        return promise;
    }

}