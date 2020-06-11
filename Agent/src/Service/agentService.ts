import { Configuration, Agent } from "../Agent/agent";
import AgentsSchema from "../Models/AgentsSchema";

const agentService = () => {
    const agents: Agent[] = [];

    async function createAgent(config: Configuration) {
        // agents.push(new Agent(config));

        const agent = await AgentsSchema.findOne({ agentName: config.agentName });

        if(!agent) {
            await AgentsSchema.create(config);
        }
    }

    async function consumeFromAgent(agentName: string) {
        const agent = agents.find((agent: Agent) => agentName === agent.name);

        return await agent?.consume();
    }

    return { createAgent, consumeFromAgent }
}

export default agentService();