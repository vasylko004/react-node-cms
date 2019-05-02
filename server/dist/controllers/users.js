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

var _users3 = require('../constants/users');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

    }, {
        key: 'sign',
        value: function sign(req, res, next) {
            this._add(req, res, function (err, Res, user) {
                Res.setData({
                    message: " User was successfull created ",
                    verified: user.verified
                });
                Res.send();
            });
        }
    }, {
        key: 'router',
        value: function router() {
            var router = (0, _express.Router)();

            router.post("/sign", this.sign.bind(this));

            return router;
        }
    }]);

    return UserController;
}();

exports.default = UserController;