'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Request = exports.ParsedClientRequest = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('../constants/users');

var _http = require('http');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ParsedClientRequest = exports.ParsedClientRequest = function (_ClientRequest) {
    _inherits(ParsedClientRequest, _ClientRequest);

    function ParsedClientRequest() {
        _classCallCheck(this, ParsedClientRequest);

        return _possibleConstructorReturn(this, (ParsedClientRequest.__proto__ || Object.getPrototypeOf(ParsedClientRequest)).apply(this, arguments));
    }

    return ParsedClientRequest;
}(_http.ClientRequest);

var Request = exports.Request = function () {
    function Request(request) {
        _classCallCheck(this, Request);

        this.request = request;
    }

    _createClass(Request, [{
        key: 'fetch',
        value: function fetch(pattern) {
            var data = Object.assign({}, pattern);
            for (var prop in data) {
                if (this.request.body.hasOwnProperty(prop)) {
                    data[prop] = this.request.body[prop];
                } else {
                    delete data[prop];
                }
            }

            return data;
        }
    }]);

    return Request;
}();