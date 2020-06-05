import { Router, Request, Response } from 'express';
import opt from './Operators/test';

const routes = Router();

routes.get('/operators', (req: Request, res: Response) => {
    opt()
    res.json(req.body)
})

routes.post('/echo', (req: Request, res: Response): Response<unknown> => {
    console.log('echo req body', Buffer.from(req.body?.content?.data).toString('utf-8'));
    return res.json();
})

routes.post('/echo-2', (req: Request, res: Response): Response<unknown> => {
    console.log('echo-2 req body', req.body?.content?.data?.toString('utf-8'));
    return res.json();
})

export default routes;