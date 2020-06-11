import amqp, { Channel, Connection } from 'amqplib';

class RabbitMQ {
    connection = {} as Connection;
    channel = {} as Channel;

    constructor() {        
        this.connect();
        process.on('exit', () => this.connection?.close());
    }
    
    private async connect(): Promise<void> {
        this.connection = await amqp.connect(String(process.env.RABBIT_URL));
        this.channel = await this.connection.createChannel();
    }
}

export default new RabbitMQ();