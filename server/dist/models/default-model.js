'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _joi = require('joi');

var Joi = _interopRequireWildcard(_joi);

var _es6Promise = require('es6-promise');

var _es6Promise2 = _interopRequireDefault(_es6Promise);

var _async = require('async');

var async = _interopRequireWildcard(_async);

var _errors = require('../helpers/errors');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ObjectId = _mongoose2.default.Schema.Types.ObjectId;

// it is abstract class and used only for inheritance

var DefaultModel = function () {
    // these properties must be initialized in child classes
    function DefaultModel(name) {
        _classCallCheck(this, DefaultModel);

        this.name = name;
    }

    _createClass(DefaultModel, [{
        key: 'initModel',
        value: function initModel() {
            // 
            if (!this.modelDB) {
                try {
                    this.modelDB = _mongoose2.default.model(this.name);
                } catch (err) {
                    this.modelDB = _mongoose2.default.model(this.name, this.schema);
                }
            }
        }
    }, {
        key: 'clearDatabase',
        value: function clearDatabase() {
            var _this = this;

            // this method created for testing api and work only in Test Mode;
            var promise = new _es6Promise2.default(function (resolve, reject) {
                if (process.env.NODE_ENV === 'test') {
                    _this.modelDB.deleteMany({}, function (err, res) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(res);
                        }
                    });
                } else {
                    reject(new Error("Method Clear Database have only worked in Test Mode!"));
                }
            });

            return promise;
        }
    }, {
        key: 'one',
        value: function one(id) {
            var _this2 = this;

            var promise = new _es6Promise2.default(function (resolve, reject) {
                if (_mongoose2.default.Types.ObjectId.isValid(id)) {
                    _this2.modelDB.findOne({ _id: id }, function (err, doc) {
                        if (err) {
                            reject(err);
                        } else resolve(doc);
                    });
                } else {
                    reject(new _errors.ValidationError("Invalid ID"));
                }
            });

            return promise;
        }
    }, {
        key: 'create',
        value: function create(data) {
            var _this3 = this;

            var before = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
            var after = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
            // before - list functions which will used after validation and before creation
            // before function need to have to params data and callback for ex: (data, callback)=>{ /* code which changes data */ callback(null, data) }
            var listCallbacks = [function (callback) {
                // validation data ( validator need to be initializied in child models )
                Joi.validate(data, _this3.validator, callback);
            }];
            for (var i = 0; i < before.length; i++) {
                listCallbacks.push(before[i]);
            }
            listCallbacks.push(function (data, callback) {
                _this3.modelDB.create(data, callback);
            });
            for (var _i = 0; _i < after.length; _i++) {
                listCallbacks.push(after[_i]);
            }
            var promise = new _es6Promise2.default(function (resolve, reject) {
                async.waterfall(listCallbacks, function (error, result) {
                    if (error) {
                        if (error.code === 11000) {
                            reject(new _errors.ValidationError("UniqueDublication"));
                        } else {
                            reject(error);
                        }
                    } else {
                        resolve(result);
                    }
                });
            });

            return promise;
        }
    }, {
        key: 'delete',
        value: function _delete(id) {
            var _this4 = this;

            var promise = new _es6Promise2.default(function (resolve, reject) {
                if (_mongoose2.default.Types.ObjectId.isValid(id)) {
                    _this4.modelDB.deleteOne({ _id: id }, function (err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                } else {
                    reject(new _errors.ValidationError(" Invalid ID "));
                }
            });

            return promise;
        }
    }]);

    return DefaultModel;
}();

exports.default = DefaultModel;