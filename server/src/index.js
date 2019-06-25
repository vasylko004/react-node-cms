import express from 'express';
import { config } from '../config';
import { mountRoutes } from './router';
import mongoose from 'mongoose';
import { format, parse } from 'express-form-data';
import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import { initPassport } from './helpers/passport';
import { resolve } from 'path';
import os from 'os';

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const PORT = config.SERVER_PORT || 9000;
const DB_URI = config.DB_URI || 'mongodb://localhost:27017/';
const DB_NAME = config.MONGODB_DB || "cms";
console.log(config.MONGODB_DB);

mongoose.connect(DB_URI + DB_NAME, {useNewUrlParser: true});
const options = {
    uploadDir: os.tmpdir(),
    autoClean: true
};
const app = express();
app.use(parse(options));  // parse multipart/from-data request data
app.use(format());
app.use(json());   // parse json request data
app.use(urlencoded({extended: false})) // parse url encoded request data
app.use(cookieParser());
initPassport();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE, PATCH");
    next();
});

mountRoutes(app);


app.use(function(err, req, res, next){
    if(err){
        console.error(err.stack);
        res.status(500);
        let response = {
            status: 500,
            data: null,
            errors: [err.message]
        }
        res.json(response);
    }else{
        next();
    }
})

app.listen(PORT, ()=>{
    console.log(" server start on PORT: ", PORT);
});