import { Router, Request, Response } from 'express';
import { Configuration } from './Agent/agent';
import agentService from './Service/agentService';
import threadService from './Service/threadService';
import { Message } from 'amqplib';

const AGENT_URL = '/agent';

const routes = Router();

// routes.get(`${AGENT_URL}/:agentName`, async (req: Request, res: Response) => {
//     try {
//         const { agentName } = req.params

//         const resp = await agentService.consumeFromAgent(agentName)
//         const message = resp?.toString()

//         res.status(200).json({ message })
//     } catch(error) {
//         res.status(404).json(error)
//     }
// });

routes.post(AGENT_URL, async (req: Request, res: Response) => {
    try {
        const config: Configuration = req.body

        await agentService.createAgent(config)

        res.status(204).send()
    } catch(error) {
        res.status(404).json(error)
    }
})

routes.post(`${AGENT_URL}/threaded`, async (req: Request, res: Response) => {
    try {
        const config: Configuration = req.body

        res.status(200).json(await threadService.createThread(config))
    } catch(error) {
        res.status(404).json(error)
    }
})

routes.post(`${AGENT_URL}/threaded/ack`, async (req: Request, res: Response) => {
    try {
        const message: Message = req.body

        const ack = await threadService.acknoledgment(message)

        if(ack)
            res.status(204).send()
        else
            res.status(404).send()
    } catch(error) {
        res.status(404).json(error)
    }
})


// Agents echo routes

routes.get('/echo/:agentName', (req: Request, res: Response): Response<unknown> => {
    console.log(`agent ${req.params.agentName} echo GET request\nheaders:`, req.headers);
    return res.send();
})

routes.post('/echo/:agentName', (req: Request, res: Response): Response<unknown> => {
    console.log(`agent ${req.params.agentName} echo POST request\nheaders:`, req.headers, '\nbody:', req.body);
    return res.send();
})

routes.put('/echo/:agentName', (req: Request, res: Response): Response<unknown> => {
    console.log(`agent ${req.params.agentName} echo PUT request\nheaders:`, req.headers, '\nbody:', req.body);
    return res.send();
})

routes.patch('/echo/:agentName', (req: Request, res: Response): Response<unknown> => {
    console.log(`agent ${req.params.agentName} echo PATCH request\nheaders:`, req.headers, '\nbody:', req.body);
    return res.send();
})

routes.delete('/echo/:agentName', (req: Request, res: Response): Response<unknown> => {
    console.log(`agent ${req.params.agentName} echo DELETE request\nheaders:`, req.headers);
    return res.send();
})

export default routes;