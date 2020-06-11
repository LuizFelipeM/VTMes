import http from 'http';
import RabbitMQ from '../Utils/RabbitMQ';
import { ConsumeMessage } from 'amqplib';

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
    name: string;
    port = 8080;
    queueName: string;
    host: string;
    endpoint: string;
    dataType: 'xml' | 'json';
    Rabbit: RabbitMQ;

    constructor(config: Configuration) {
        this.Rabbit = new RabbitMQ();
        
        this.Rabbit.channel?.prefetch(config.maxMsg ?? 1)
        
        this.name = config.agentName;
        this.host = config.host;
        this.endpoint = config.endpoint;
        this.dataType = config.dataType;
        
        this.port = config.port ?? this.port;
        this.queueName = config.queueName;
    }

    async consume(): Promise<Buffer | undefined> {
        let incomingMessage: Buffer | undefined;

        console.log('consume');

        const option: http.RequestOptions = {
            host: this.host,
            path: this.endpoint,
            port: this.port,
            method: 'POST',
            headers: {
                'Content-Type': `application/${this.dataType}`,
            }
        };

        await this.Rabbit.channel?.consume(this.queueName, (msg: ConsumeMessage | null) => {
            incomingMessage = msg?.content

            const req = http.request(option, (res: http.IncomingMessage): void => {
                res.setEncoding('utf-8');
                res.on('data', (chunk: unknown) => console.log(`data chunk of endpoint ${this.endpoint}`, chunk));
            });

            req.write(JSON.stringify(msg));
            req.end();
        });

        return incomingMessage;
    }
}

export { Agent, Configuration };