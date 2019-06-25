import { Router } from "express";
import * as express from "express";
import UserController from "./controllers/users"
import { resolve, join } from 'path';

const router = Router();

router.get("/", (req, res) => {
    res.json({
      status: 200,
      message: 'CMS API',
      data: null,
      errors: []
    });
  });

export function mountRoutes(app){
    const Users = new UserController();
    const pathDocs = resolve(__dirname, "../doc")
    const pathPublic = resolve(__dirname, "../public")
    console.log(pathDocs);
    app.use('/', router);
    app.use('/api/users', Users.router());
    app.use("/api/docs", express.static(join(pathDocs)));
    app.use("/static", express.static(join(pathPublic)));

}