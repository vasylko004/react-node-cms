var dotenv = require("dotenv");
var path = require('path');
var configs = Object.create(null);

if (process.env.NODE_ENV !== "development") {

}

configs = dotenv.config({path: path.resolve("./server/.env.development")});
console.log(configs);

exports.config = configs.parsed;