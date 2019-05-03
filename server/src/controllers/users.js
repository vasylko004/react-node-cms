// @flow
import UserModel from '../models/users';
import { Router } from 'express';
import { Request  } from '../helpers/request';
import { Response, BAD_REQUEST, UNAUTH } from '../helpers/response';
import passport from 'passport';
import * as jwt from 'jsonwebtoken';
import {UserRequest} from '../constants/users';
import {type UserRequestObject} from '../constants/users';

const JWT_SECRET_KEY = process.env.AUTH_SECRET_KEY || "CMS_SECRET_KEY";


class UserController {
    model:UserModel;

    constructor(){
        this.model = new UserModel();
    }

    _add(req: any, res: any, callback:any){
        let Req = new Request(req);
        let Res = new Response(res);
        let data = Req.fetch(UserRequest);
        this.model.create(data)
            .then((user)=>{
                callback(null, Res, user);
            })
            .catch((error)=>{
                console.log(error);
                Res.errorParse(error);
                Res.send();
            });
    }

    /**
     * @api {post}  /api/users/signup
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
     * 
     * @apiError (Error 4xx) UniqueDublication Dublication of user email
     * @apiError (Error 4xx) NeedRequiredField One or more of required fileds is not inputed
     * @apiError (Error 4xx) IncorrectFormatField One or more fields have incorrect format
     * @apiError (Error 5xx) ServerError Unexpected server error
     * 
     */

    signup(req: any, res: any, next: any){
        this._add(req, res, (err: any, Res: Response, user:any)=>{
            Res.setData({
                message: " User was successfull created ",
                verified: user.verified
            })
            Res.status = 201;
            Res.send()
        })
    }

    /**
     * @api {post}  /api/users/signin
     * @apiName Login
     * @apiGroup User
     *
     * @apiParam {String} [email] User email
     * @apiParam {String} [password] password need have min 6 and max 30 symbols
     * 
     * @apiSuccess {Number} status HTTP Status Code
     * @apiSuccess {Object} data Response data
     * @apiSuccess {Object} data.user 
     * @apiSuccess {String} data.user._id
     * @apiSuccess {String} data.user.firstName
     * @apiSuccess {String} data.user.lastName
     * @apiSuccess {String} data.user.email
     * @apiSuccess {String} data.user.avatar
     * @apiSuccess {String} data.user.created
     * @apiSuccess {String} data.user.updated
     * @apiSuccess {String} data.token Access Token
     * @apiSuccess {String[]} warnings
     * @apiSuccess {String[]} notice
     * 
     * @apiError (Error 4xx) IncorectCredetials User with sended email not found
     * @apiError (Error 4xx) FieledAuthetication Fieled Creating 
     * @apiError (Error 5xx) ServerError Unexpected server error     * 
     * 
     */

    signin(req: any, res: any, next: any){
        let Res = new Response(res);

        passport.authenticate('local', {session: false}, (err, user, info) => {
            if (err || !user) {
                Res.addError(BAD_REQUEST, "IncorectCredetials");
                return Res.send();
            }

            req.login(user, {session: false}, (err) => {
                if (err) {
                    Res.addError(UNAUTH, "FieledAuthetication");
                    return Res.send();
                }

                delete user.password;
	            const token = jwt.sign(user.toJSON(), JWT_SECRET_KEY);
	            Res.setData({user: user, token: token});
	            return Res.send();
            });
        })(req, res, next)
        
    }

    router(){
        let router = Router();

        router.post("/signup", this.signup.bind(this));
        router.post("/signin", this.signin.bind(this));

        return router;
    }
}

export default UserController;