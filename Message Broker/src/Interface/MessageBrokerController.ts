import { Request, Response } from 'express';
import MQService from '../Service/MQService';
import MessagesSchema from '../Data Access/MessagesSchema';

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

    async publishMessage(req: Request, res: Response): Promise<Response<void>> {
        const { producerName, topic, payload, headers } = req.body;

        MessagesSchema.create({ producerName, topic, payload, headers });
        const resp = await MQService.pushToQueue(producerName, topic, payload);

        if(resp) return res.status(204).send();
        
        return res.status(404).send();
    }
}

export default MessageBrokerController;