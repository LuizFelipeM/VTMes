import http from 'http'
import { Worker, parentPort } from 'worker_threads'
import amqp, { Connection, Channel, ConsumeMessage, Message } from 'amqplib'
import { mquery } from 'mongoose'

type Configuration = {
    agentName: string;
    host: string;
    endpoint: string;
    queueName: string;
    dataType: 'xml' | 'json';
    port?: number;
    maxMsg?: number;
}

class Agent {
    name: string
    private port = 8080
    private queueName: string
    private host: string
    private endpoint: string
    private dataType: 'xml' | 'json'

    constructor(config: Configuration) {
        // channel.prefetch(config.maxMsg ?? 1)

        console.log('criado')
        
        this.name = config.agentName
        this.host = config.host
        this.endpoint = config.endpoint
        this.dataType = config.dataType
        
        this.port = config.port ?? this.port
        this.queueName = config.queueName
    }

    async consume(callback: (message: ConsumeMessage | null) => void): Promise<void> {
        // const option: http.RequestOptions = {
        //     host: this.host,
        //     path: this.endpoint,
        //     port: this.port,
        //     method: 'POST',
        //     headers: { 'Content-Type': `application/${this.dataType}` }
        // }

        const MQ = await MQConnectionAndChannel()

        await MQ.channel.consume(this.queueName, callback)

            // .then(({ channel }) => channel.consume(this.queueName, callback))
            // .catch((err: unknown) => parentPort?.postMessage(err))
            // .finally(() => {
            //     console.log('finally')
            // })

        //     const req = http.request(option, (res: http.IncomingMessage): void => {
        //         res.setEncoding('utf-8');
        //         res.on('data', (chunk: unknown) => console.log(`data chunk of endpoint ${this.endpoint}`, chunk));
        //     });

        //     req.write(JSON.stringify(msg));
        //     req.end();
        // });
    }

    async acknowledgement(message: Message): Promise<void> {
        console.log('ack chamado')
        const MQ = await MQConnectionAndChannel()

        MQ.channel.ackAll()

        parentPort?.postMessage(true)
            // .then(({ channel }) => channel.ack(message))
    }
}

interface MessageQueueData {
    connection: Connection,
    channel: Channel,
}

async function MQConnectionAndChannel(): Promise<MessageQueueData> {
    const connection = await amqp.connect(String(process.env.RABBIT_URL))
    const channel = await connection.createChannel()

    process.on('exit', () => connection.close())

    return {
        connection,
        channel
    }
}

export { Agent, Configuration }