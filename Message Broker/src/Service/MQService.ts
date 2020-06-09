import RabbitMQ from "../Domain/Utils/RabbitMQ";
import { dataToBuffer } from "../Domain/Utils/BufferUtils";

type topic = string;

type queues = {
    [queueName: string]: topic[];
}

interface MQServiceInter {
    allocateProducer(name: string, queues: queues): Promise<void>;
    pushToQueue(queueName: string, exchange: string, topic: string, payload: unknown): Promise<boolean>;
}

const MQService: MQServiceInter = {
    async allocateProducer(name: string, queues: queues): Promise<void> {
        await RabbitMQ.channel?.assertExchange(name, 'topic', { durable: false });

        for (const queueName in queues) {
            const topics = queues[queueName];
            await RabbitMQ.channel?.assertQueue(queueName, { durable: true });

            for (const topic of topics) { RabbitMQ.channel?.bindQueue(queueName, name, topic) }
        }
    },

    async pushToQueue(queueName: string, topic: string, payload: unknown): Promise<boolean> {
        const exchange = queueName;

        return RabbitMQ.channel?.publish(exchange, topic, dataToBuffer(JSON.stringify(payload))) as boolean;
    }
}

export default MQService;