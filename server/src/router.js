import { Router } from "express";
import UserController from "./controllers/users"

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
    app.use('/', router);
    app.use('/api/users', Users.router());
}