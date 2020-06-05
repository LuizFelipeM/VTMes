import { ConsumeMessage, Message } from "amqplib/callback_api";

export default interface MessageQueueService {
    producer: {
        pushToQueue(queueName: string, content: string | Buffer | number): boolean;
        pushToTopic(topic: string, key: string, content:  string | Buffer | number): boolean;
    };

    consumer: {
        ackQueue(message: Message): void;
        consumeQueue(queueName: string, callback: (msg: ConsumeMessage | null) => void): void;
    };
}