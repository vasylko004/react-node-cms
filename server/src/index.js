import express from 'express';
import { config } from '../config';
import { mountRoutes } from './router';

const PORT = config.SERVER_PORT || 9000;

const app = express();

mountRoutes(app);

app.use(function(err, req, res, next){
    if(err){
        res.status(500);
        res.json({
            status: 500,
            data: null,
            errors: [err.message]
        });
    }else{
        res.json({
            status: 200,
            data: null,
            errors: [err.message]
        });
    }
})

app.listen(PORT, ()=>{
    console.log(" server start on PORT: ", PORT);
});