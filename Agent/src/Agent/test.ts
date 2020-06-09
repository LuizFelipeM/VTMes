import { Agent, Configuration } from "./agent";

const agents = (): void => {
    const config: Configuration = {
        host: 'localhost',
        endpoint: '/echo',
        dataType: 'json',
        maxMsg: 1,
        queueName: 'messages',
    }

    const operator1 = new Agent(config);

    config.queueName = 'logs';
    
    const operator2 = new Agent(config);

    setTimeout(() => {
        console.log('operator1.consumeFromTopic', operator1.consume());
        console.log('operator2.consumeFromTopic', operator2.consume());
        // operator2.consumeFromTopic()
    }, 2000)
}

export default agents;