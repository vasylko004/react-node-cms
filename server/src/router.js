import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.json({
      status: 200,
      message: 'CMS API',
      data: null,
      errors: []
    });
  });

export function mountRoutes(app){
    app.use('/', router);
}