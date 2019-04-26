var dotenv = require("dotenv");
var configs = Object.create(null);

if (process.env.NODE_ENV !== "development") {

}

configs = dotenv.config({path: "./.env.development"});

exports.config = configs;