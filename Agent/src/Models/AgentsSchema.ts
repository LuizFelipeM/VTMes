import { Schema, model } from "mongoose";

const AgentsSchema = new Schema({
    agentName: String,
    host: String,
    endpoint: String,
    dataType: String,
    port: Number,
    maxMessage: Number,
    queueName: String
})

export default model('Agents', AgentsSchema);