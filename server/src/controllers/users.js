// @flow
import UserModel from '../models/users';
import { Router } from 'express';
import { Request  } from '../helpers/request';
import { Response } from '../helpers/response';
import {UserRequest} from '../constants/users';
import {type UserRequestObject} from '../constants/users';


class UserController {
    model:UserModel;

    constructor(){
        this.model = new UserModel();
    }

    _add(req: any, res: any, callback: function){
        let Req = new Request(req);
        let Res = new Response(res);
        let data = Req.fetch(UserRequest);
        this.model.create(data)
            .then((user)=>{
                callback(null, Res, user);
            })
            .catch((error)=>{
                Res.errorParse(error);
                Res.send();
            });
    }

    /**
     * @api {post}  /api/users
     * @apiName CreateUser
     * @apiGroup User
     *
     * @apiParam {String} [email] User email
     * @apiParam {String} [firstName] Firstname of the User.
     * @apiParam {String} [lastName] Lastname of the User.
     * @apiParam {String} [password] password need have min 6 and max 30 symbols
     * @apiParam {File} [avatar] (optional) avatar for User
     * @apiParam {Number} [role] (optional) User's role: 0 - Super Adaministrator, 1 - Administrator, 2 - Editor, 3 - Simple
     * 
     * @apiSuccess {Number} status HTTP Status Code
     * @apiSuccess {Object} data Response dara
     * @apiSuccess {String} data.message 
     * @apiSuccess {Bollean} data.verified is user active
     * @apiSuccess {String[]} warnings
     * @apiSuccess {String[]} notice
     */

    sign(req: any, res: any, next: function){
        this._add(req, res, (err: any, Res: Response, user:any)=>{
            Res.setData({
                message: " User was successfull created ",
                verified: user.verified
            })
            Res.send()
        })
    }

    router(){
        let router = Router();

        router.post("/sign", this._add.bind(this));

        return router;
    }
}

export default UserController;