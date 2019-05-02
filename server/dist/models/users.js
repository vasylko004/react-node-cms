'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _mongoose = require('mongoose');

var mongoose = _interopRequireWildcard(_mongoose);

var _bcrypt = require('bcrypt');

var bcrypt = _interopRequireWildcard(_bcrypt);

var _uniqid = require('uniqid');

var uniqid = _interopRequireWildcard(_uniqid);

var _async = require('async');

var async = _interopRequireWildcard(_async);

var _joi = require('joi');

var Joi = _interopRequireWildcard(_joi);

var _es6Promise = require('es6-promise');

var _defaultModel = require('./default-model');

var _defaultModel2 = _interopRequireDefault(_defaultModel);

require('../constants/users');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SALT_FACTOR = 12;
var ObjectId = mongoose.Types.ObjectId;

var UserModel = function (_DefaultModel) {
    _inherits(UserModel, _DefaultModel);

    function UserModel() {
        _classCallCheck(this, UserModel);

        var _this = _possibleConstructorReturn(this, (UserModel.__proto__ || Object.getPrototypeOf(UserModel)).call(this, "users"));

        _this.schema = mongoose.Schema({
            id: ObjectId,
            firstName: String,
            lastName: String,
            email: { type: String, unique: true, required: true },
            password: { type: String, required: true },
            avatar: String,
            role: { type: Number, default: 1 }, // 0 - Administrator
            verified: Boolean,
            validationCode: String,
            created: { type: Date, default: Date.now },
            updated: { type: Date, default: Date.now }
        });

        _this.schema.pre('save', function (next) {
            // handling adding and updating data to db
            var user = this;

            if (!user.isModified('password')) {
                next();
            } // check if it senda filed password to saving

            bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
                // ganarate hash for password and save hash in db instead of password
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

        _this.schema.methods.comparePassword = function (candidatePassword, next) {
            // add to user model function comparing passwords
            bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
                if (err) {
                    return next(err);
                }
                next(null, isMatch);
            });
        };

        _this.validator = Joi.object().keys({
            email: Joi.string().email({ minDomainAtoms: 2 }),
            firstName: Joi.string().alphanum().min(3).max(30).required(),
            lastName: Joi.string().alphanum().min(3).max(30).required(),
            password: Joi.string().min(6).max(30),
            role: Joi.number(),
            avatar: Joi.string()
        });

        _this.initModel();
        return _this;
    }

    _createClass(UserModel, [{
        key: 'checkCredantial',
        value: function checkCredantial(email, password) {
            var _this2 = this;

            var promise = new _es6Promise.Promise(function (resolve, reject) {
                _this2.modelDB.findOne({ email: email }).then(function (user) {
                    user.comparePassword(password, function (err, isMatch) {
                        if (err) {
                            reject(null);
                            return false;
                        }
                        if (isMatch) {
                            resolve(user);
                        } else {
                            reject(null);
                        }
                    });
                }).catch(function (err) {
                    reject(null);
                });
            });

            return promise;
        }
    }, {
        key: 'create',
        value: function create(data) {
            return _get(UserModel.prototype.__proto__ || Object.getPrototypeOf(UserModel.prototype), 'create', this).call(this, data);
        }
    }]);

    return UserModel;
}(_defaultModel2.default);

exports.default = UserModel;