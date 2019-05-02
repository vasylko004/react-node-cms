"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mountRoutes = mountRoutes;

var _express = require("express");

var _users = require("./controllers/users");

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  app.use('/', router);
  app.use('/api/users', Users.router());
}