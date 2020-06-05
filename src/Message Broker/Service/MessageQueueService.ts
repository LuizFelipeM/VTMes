import amqp, { Connection, Channel, ConsumeMessage, Message } from 'amqplib/callback_api';
import MessageQueueService from '../Domain/Interfaces/Services/MessageQueueService';
import getBufferSize from '../Domain/Utils/BufferUtils';

let channel: Channel;

amqp.connect(String(process.env.RABBIT_URL), (err: unknown, connection: Connection) => {
    if (!err) connection.createChannel((err: unknown, ch: Channel) => channel = ch);
    else throw err;
})

function MQService(): MessageQueueService {
    function pushToQueue(queueName: string, payload: string | Buffer | number): boolean {
        return channel.sendToQueue(queueName, Buffer.alloc(getBufferSize(payload), payload));
    }

    function pushToTopic(topic: string, key: string, content:  string | Buffer | number): boolean {

        // return channel.publish(topic, )
        return true;
    }

    // -------------------------------- CONSUMER --------------------------------

    function consumeQueue(queueName: string, callback: (msg: ConsumeMessage | null) => void): void {
        channel.consume(queueName, callback);
    }

    function ackQueue(message: Message): void {
        channel.ack(message);
    }

    return {
        producer: {
            pushToQueue,
            pushToTopic
        },

        consumer: {
            ackQueue,
            consumeQueue,
        },
    }
}

export default MQService();