'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _users = require('../models/users');

var _users2 = _interopRequireDefault(_users);

var _express = require('express');

var _request = require('../helpers/request');

var _response = require('../helpers/response');

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _jsonwebtoken = require('jsonwebtoken');

var jwt = _interopRequireWildcard(_jsonwebtoken);

var _users3 = require('../constants/users');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JWT_SECRET_KEY = process.env.AUTH_SECRET_KEY || "CMS_SECRET_KEY";

var UserController = function () {
    function UserController() {
        _classCallCheck(this, UserController);

        this.model = new _users2.default();
    }

    _createClass(UserController, [{
        key: '_add',
        value: function _add(req, res, callback) {
            var Req = new _request.Request(req);
            var Res = new _response.Response(res);
            var data = Req.fetch(_users3.UserRequest);
            this.model.create(data).then(function (user) {
                callback(null, Res, user);
            }).catch(function (error) {
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
         * @apiParam {String} email User email
         * @apiParam {String} firstName Firstname of the User.
         * @apiParam {String} lastName Lastname of the User.
         * @apiParam {String} password password need have min 6 and max 30 symbols
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

    }, {
        key: 'signup',
        value: function signup(req, res, next) {
            this._add(req, res, function (err, Res, user) {
                Res.setData({
                    message: " User was successfull created ",
                    verified: user.verified
                });
                Res.status = 201;
                Res.send();
            });
        }

        /**
         * @api {post}  /api/users/signin
         * @apiName Login
         * @apiGroup User
         *
         * @apiParam {String} email User email
         * @apiParam {String} password password need have min 6 and max 30 symbols
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
         * @apiError (Error 5xx) ServerError Unexpected server error
         * 
         */

    }, {
        key: 'signin',
        value: function signin(req, res, next) {
            var Res = new _response.Response(res);
            req.body.username = req.body.email;
            _passport2.default.authenticate('local', { session: false }, function (err, user, info) {
                if (err || !user) {
                    Res.addError(_response.BAD_REQUEST, "IncorectCredetials");
                    return Res.send();
                }

                req.login(user, { session: false }, function (err) {
                    if (err) {
                        Res.addError(_response.UNAUTH, "FieledAuthetication");
                        return Res.send();
                    }

                    delete user.password;
                    var token = jwt.sign(user.toJSON(), JWT_SECRET_KEY);
                    Res.setData({ user: user, token: token });
                    return Res.send();
                });
            })(req, res, next);
        }
    }, {
        key: 'update',
        value: function update(req, res, next) {
            var Res = new _response.Response(res);
            console.log(req.body, req.files);
            Res.addError(_response.BAD_REQUEST, "BadRequest");
            Res.send();
        }
    }, {
        key: 'router',
        value: function router() {
            var router = (0, _express.Router)();

            router.post("/signup", this.signup.bind(this));
            router.post("/signin", this.signin.bind(this));
            router.put("/", this.update.bind(this));

            return router;
        }
    }]);

    return UserController;
}();

exports.default = UserController;