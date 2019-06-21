"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mountRoutes = mountRoutes;

var _express = require("express");

var express = _interopRequireWildcard(_express);

var _users = require("./controllers/users");

var _users2 = _interopRequireDefault(_users);

var _path = require("path");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var router = (0, _express.Router)();

router.get("/", function (req, res) {
  res.json({
    status: 200,
    message: 'CMS API',
    data: null,
    errors: []
  });
});

function mountRoutes(app) {
  var Users = new _users2.default();
  var pathDocs = (0, _path.resolve)(__dirname, "../doc");
  console.log(pathDocs);
  app.use('/', router);
  app.use('/api/users', Users.router());
  app.use("/api/docs", express.static((0, _path.join)(pathDocs)));
}