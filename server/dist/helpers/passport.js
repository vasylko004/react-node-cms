'use strict';

var _passport = require('passport');

var passport = _interopRequireWildcard(_passport);

var _passportLocal = require('passport-local');

var Strategy = _interopRequireWildcard(_passportLocal);

var _passportJwt = require('passport-jwt');

var passportJWT = _interopRequireWildcard(_passportJwt);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }