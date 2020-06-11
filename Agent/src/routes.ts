import { Router, Request, Response } from 'express';
import { Configuration } from './Agent/agent';
import agentService from './Service/agentService';

const AGENT_URL = '/agent';

const routes = Router();

routes.get(AGENT_URL, async (req: Request, res: Response) => {
    const { name } = req.query;

    try {
        const resp = await agentService.consumeFromAgent(String(name));
        const message = resp?.toString();
        res.status(200).json({ message });
    } catch(error) {
        res.status(404).json(error);
    }
});

routes.post(AGENT_URL, async (req: Request, res: Response) => {
    const config: Configuration = req.body;

    try {
        await agentService.createAgent(config);

        res.status(204).send();
    } catch(error) {
        res.status(404).json(error);
    }
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