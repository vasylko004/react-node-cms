'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initPassport = initPassport;

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = require('passport-local');

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _passportJwt = require('passport-jwt');

var _passportJwt2 = _interopRequireDefault(_passportJwt);

var _users = require('../models/users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ExtractJWT = _passportJwt2.default.ExtractJwt;
var JWTStrategy = _passportJwt2.default.Strategy;

var JWT_SECRET_KEY = process.env.AUTH_SECRET_KEY || "CMS_SECRET_KEY";

function initPassport() {
    _passport2.default.use(new _passportLocal2.default(function (username, password, done) {
        // database dummy - find user and verify password
        var dbModel = new _users2.default();
        dbModel.checkCredantial(username, password).then(function (user) {
            done(null, user);
        }).catch(function (err) {
            done(null, false);
        });
    }));

    _passport2.default.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET_KEY
    }, function (jwtPayload, callback) {
        //find the user in db if needed
        var dbModel = new _users2.default();
        dbModel.one(jwtPayload.id).then(function (user) {
            callback(null, user);
        }).catch(function (err) {
            callback(err, null);
        });
    }));

    return _passport2.default;
}