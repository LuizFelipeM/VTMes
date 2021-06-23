import { connect } from 'mongoose';
import AgentsSchema from './Models/AgentsSchema';
import { Agent, Configuration } from './Agent/agent';

const agents: Agent[] = [];

async function startup(): Promise<void> {
    connect(String(process.env.MONGODB_URL),{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const allAgents = await AgentsSchema.find();    

    // allAgents.forEach(agent => {
    //     const config: Configuration = agent.toObject()

    //     agents.push(new Agent(config))
    // });
}

export default startup;
export { agents }