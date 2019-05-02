'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('../config');

var _router = require('./router');

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _expressFormData = require('express-form-data');

var _bodyParser = require('body-parser');

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.set('useFindAndModify', false);
_mongoose2.default.set('useCreateIndex', true);
var PORT = _config.config.SERVER_PORT || 9000;
var DB_URI = _config.config.DB_URI || 'mongodb://localhost:27017/';
var DB_NAME = _config.config.MONGODB_DB || "cms";
console.log(_config.config.MONGODB_DB);

_mongoose2.default.connect(DB_URI + DB_NAME, { useNewUrlParser: true });
var options = {
    uploadDir: _os2.default.tmpdir(),
    autoClean: true
};
var app = (0, _express2.default)();
app.use((0, _expressFormData.parse)(options)); // parse multipart/from-data request data
app.use((0, _expressFormData.format)());
app.use((0, _bodyParser.json)()); // parse json request data
app.use((0, _bodyParser.urlencoded)({ extended: false })); // parse url encoded request data
app.use((0, _cookieParser2.default)());
(0, _router.mountRoutes)(app);

app.use(function (err, req, res, next) {
    if (err) {
        console.error(err.stack);
        res.status(500);
        var response = {
            status: 500,
            data: null,
            errors: [err.message]
        };
        res.json(response);
    } else {
        next();
    }
});

app.listen(PORT, function () {
    console.log(" server start on PORT: ", PORT);
});