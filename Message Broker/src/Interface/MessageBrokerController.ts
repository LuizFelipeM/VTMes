import { Request, Response } from 'express';
import MQService from '../Service/MQService';

const MessageBrokerController = {
    allocateProducer(req: Request, res: Response): Response<unknown> {
        const { name, queues } = req.body;

        try {
            MQService.allocateProducer(name, queues);
            return res.status(204).send();
        } catch (exception) {
            console.error('allocateProducer ', exception);
            return res.status(404).json(exception);
        }
    },

    publishMessage(req: Request, res: Response): Response<void> {
        const { producerName, topic, payload } = req.body;
        const resp = MQService.pushToQueue(producerName, topic, payload);

        if(resp) return res.status(204).send();
        
        return res.status(404).send();
    }
}

export default MessageBrokerController;