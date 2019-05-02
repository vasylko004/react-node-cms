"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SUCCESS = exports.SUCCESS = 200;
var CREATED = exports.CREATED = 201;
var NOT_MODIFIED = exports.NOT_MODIFIED = 304;
var BAD_REQUEST = exports.BAD_REQUEST = 400;
var UNAUTH = exports.UNAUTH = 401;
var FORBIDDEN = exports.FORBIDDEN = 403;
var NOT_FOUND = exports.NOT_FOUND = 404;
var CONFLICT = exports.CONFLICT = 409;
var SERVER_ERROR = exports.SERVER_ERROR = 500;

var Response = exports.Response = function () {
    function Response(response) {
        _classCallCheck(this, Response);

        this.response = response;
        this.status = 200;
        this.data = null;
        this.notice = [];
        this.warnings = [];
        this.errors = [];
    }

    _createClass(Response, [{
        key: "addWarning",
        value: function addWarning(message) {
            this.warnings.push(message);
        }
    }, {
        key: "addNotice",
        value: function addNotice(message) {
            this.notice.push(message);
        }
    }, {
        key: "addError",
        value: function addError(code, message) {
            this.status = code;
            this.errors.push(message);
        }
    }, {
        key: "errorParse",
        value: function errorParse(error) {
            if (error.isJoi) {
                var message = " Incorect request ";
                if (error.details.length > 0) {
                    message = error.details[0].message;
                }
                this.addError(BAD_REQUEST, message);
            } else {
                this.addError(SERVER_ERROR, "Server Error");
            }
        }
    }, {
        key: "setData",
        value: function setData(data) {
            this.data = data;
        }
    }, {
        key: "send",
        value: function send() {
            this.response.status(this.status);
            this.response.setHeader('Content-type', 'application/json');
            var body = {
                status: this.status,
                errors: this.errors,
                data: this.data,
                notice: this.notice,
                warnings: this.warnings
            };

            this.response.json(body);
        }
    }]);

    return Response;
}();