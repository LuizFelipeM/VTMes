import { Request, Response } from 'express';
import { ConsumeMessage } from "amqplib";
import MQService from '../Service/MessageQueueService';

const MessageBrokerController = {
    ConsumeMessage(req: Request, res: Response): void {
        const { queueName } = req.query;
        const callback = (msg: ConsumeMessage| null): Response<ConsumeMessage> => res.json({ msg });

        MQService.consumer.consumeQueue(String(queueName), callback);
    },

    Acknowledgement(req: Request, res: Response): Response<void> {
        const { msg } = req.body;

        MQService.consumer.ackQueue(msg);

        return res.status(204).send();
    },
    
    PublishMessage(req: Request, res: Response): Response<unknown> {
        const { queueName, payload } = req.body;
        
        const resp = MQService.producer.pushToQueue(queueName, payload);
        
        if (resp)
            return res.status(204).send();
        else
            return res.status(404).send();
    },

    PublishMessageToTopic(req: Request, res: Response): Response<unknown> {
        const { queueName, topic, payload } = req.body;

        const resp = MQService.producer.pushToTopic(topic, queueName, payload);

        if (resp)
            return res.status(204).send();
        else
            return res.status(404).send();
    }
}

export default MessageBrokerController;