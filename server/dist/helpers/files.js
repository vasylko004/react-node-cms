'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FileHelper = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _constants = require('../constants');

var _async = require('async');

var _os = require('os');

var _path2 = require('path');

var Path = _interopRequireWildcard(_path2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var publicFolder = "./server/public";

var FileHelper = exports.FileHelper = function () {
    function FileHelper(path) {
        _classCallCheck(this, FileHelper);

        this.filepath = path;
        //this.prepareDir(path);
    }

    _createClass(FileHelper, [{
        key: 'prepareDir',
        value: function prepareDir(path, callback) {
            var list = path.split("/");
            var _path = this.filepath;
            var addPath = "";
            //console.log(list);
            (0, _async.eachSeries)(list, function (item, cb) {
                if (item) {
                    //console.log(addPath);
                    var realpath = Path.resolve(_path + addPath + '/' + item);
                    //console.log(realpath);
                    fs.access(realpath, fs.constants.R_OK, function (err) {
                        if (err) {
                            fs.mkdir(realpath, {}, function (err) {
                                console.log(err);
                                if (err) {
                                    addPath += '/' + item;
                                    cb(err);
                                } else {
                                    addPath += '/' + item;
                                    cb();
                                }
                            });
                        } else {
                            addPath += '/' + item;
                            cb();
                        }
                    });
                } else cb();
            }, function (err) {
                if (err) {
                    callback(err);
                } else {
                    callback(null);
                }
            });
        }
    }, {
        key: 'upload',
        value: function upload(req, name, path, filename) {
            var _this = this;

            var promise = new Promise(function (resolve, reject) {
                if (req.files) {
                    if (req.files[name]) {
                        var file = req.files[name];
                        var _path = _this.filepath;
                        var _filename = file.name;
                        var newPath = "";
                        if (path) {
                            _path += path;
                        }
                        (0, _async.waterfall)([function (cb) {
                            fs.access(file.path, fs.constants.R_OK, cb);
                        }, function (cb) {
                            fs.access(_path, fs.constants.R_OK, cb);
                        }, function (cb) {
                            if (filename) _filename = _filename + "." + file.originalFilename.split(".")[1];
                            newPath = Path.resolve(_path + _filename);
                            //console.log(__dirname, _path, _filename, newPath);
                            if (newPath) {
                                console.log(newPath);
                                fs.rename(file.path, newPath, cb);
                            } else {
                                cb(new Error("incorret file path"));
                            }
                        }, function (cb) {
                            cb(null, { filePath: _path.replace(_this.filepath, "/static") + _filename, name: _filename });
                        }], function (err, result) {
                            if (err) {
                                console.log(err);
                                reject(err);
                            } else {
                                resolve(result);
                            }
                        });
                    } else {
                        reject(new Error("file not found"));
                    }
                } else {
                    reject(new Error("it is not any file in request"));
                }
            });

            return promise;
        }
    }]);

    return FileHelper;
}();