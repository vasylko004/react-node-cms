//@flow
import * as fs from 'fs';
import { CustomRequest } from '../constants'

class FileHelper{
    filepath: string;

    constructor(path: string){
        this.filepath = path;
    }

    upload(req: CustomRequest, name: string):string | boolean {
        if (req.files) {
            if (req.files[name]) {
                return "";
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

}