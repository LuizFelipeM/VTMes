import { Router, Request, Response } from 'express';
import agents from './Agent/test';

const routes = Router();

routes.get('/agent', (req: Request, res: Response) => {
    agents();
    res.status(204).send();
});

routes.post('/echo', (req: Request, res: Response): Response<unknown> => {
    console.log('echo req body', Buffer.from(req.body?.content?.data).toString('utf-8'));
    return res.json();
})

routes.post('/echo-2', (req: Request, res: Response): Response<unknown> => {
    console.log('echo-2 req body', req.body?.content?.data?.toString('utf-8'));
    return res.json();
})

export default routes;