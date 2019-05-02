'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongoose = require('mongoose');

var mongoose = _interopRequireWildcard(_mongoose);

var _joi = require('joi');

var Joi = _interopRequireWildcard(_joi);

var _es6Promise = require('es6-promise');

var _async = require('async');

var async = _interopRequireWildcard(_async);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ObjectId = mongoose.Types.ObjectId;

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
                    mongoose.model(this.name);
                } catch (err) {
                    mongoose.model(this.name, this.schema);
                }
            }
        }
    }, {
        key: 'clearDatabase',
        value: function clearDatabase() {
            var _this = this;

            // this method created for testing api and work only in Test Mode;
            var promise = (0, _es6Promise.Promise)(function (resolve, reject) {
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

            var promise = new _es6Promise.Promise(function (resolve, reject) {
                if (mongoose.Types.ObjectId.isValid(id)) {
                    _this2.modelDB.findOne({ _id: id }, function (err, doc) {
                        if (err) {
                            reject(err);
                        } else resolve(doc);
                    });
                } else {
                    reject(new new mongoose.Error("Invalid ID")());
                }
            });

            return promise;
        }
    }, {
        key: 'create',
        value: function create(data) {
            var _this3 = this;

            var promise = new _es6Promise.Promise(function (resolve, reject) {
                async.waterfall([function (callback) {
                    // validation data ( validator need to be initializied in child models )
                    Joi.validate(data, _this3.validator, callback);
                }, function (callback) {
                    _this3.modelDB.create(data, callback);
                }], function (error, result) {
                    if (error) {
                        reject(error);
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

            var promise = new _es6Promise.Promise(function (resolve, reject) {
                if (mongoose.Types.ObjectId.isValid(id)) {
                    _this4.modelDB.deleteOne({ _id: id }, function (err, result) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                } else {
                    reject(new mongoose.Error(" Invalid ID "));
                }
            });

            return promise;
        }
    }]);

    return DefaultModel;
}();

exports.default = DefaultModel;