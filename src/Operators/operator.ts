import http from 'http'
import amqp, { Connection, Channel, Message } from 'amqplib/callback_api'

class Operator {
    prefetch = 1;
    port = 8080;
    queueName = String(process.env.DEFAULT_QUEUE_NAME);
    channel: Channel | undefined;
    host: string;
    endpoint: string;
    dataType: 'xml' | 'json';

    constructor(
        host: string,
        endpoint: string,
        dataType: 'xml' | 'json',
        port?: number,
        maxMsg?: number,
        queueName?: string,
    ) {
        amqp.connect(String(process.env.RABBIT_URL), (err: unknown, connection: Connection) => {
            if (!err)
                connection.createChannel((err: unknown, ch: Channel) => this.channel = ch);
        })

        this.host = host;
        this.endpoint = endpoint;
        this.dataType = dataType;
        
        this.port = port ?? this.port;
        this.prefetch = maxMsg ?? this.prefetch;
        this.queueName = queueName ?? this.queueName;

        this.channel?.prefetch(this.prefetch);
    }

    consume(): void {
        const option: http.RequestOptions = {
            host: this.host,
            path: this.endpoint,
            port: this.port,
            method: 'POST',
            headers: {
                'Content-Type': `application/${this.dataType}`,
            }
        };

        this.channel?.consume(this.queueName, (msg: Message | null): void => {

            const req = http.request(option, (res: http.IncomingMessage): void => {
                res.setEncoding('utf-8');
                res.on('data', (chunk: unknown) => console.log(`data chunk of endpoint ${this.endpoint}`, chunk));
            });

            req.write(JSON.stringify(msg));
            req.end();

        })
    }
}

export default Operator;