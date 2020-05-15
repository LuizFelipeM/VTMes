import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => res.json({ test: 'Work bitch' }))

export default routes;