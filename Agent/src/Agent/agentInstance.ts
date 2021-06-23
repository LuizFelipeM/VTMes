import { workerData, parentPort } from 'worker_threads'
import { Configuration, Agent } from './agent'

function agentInstance(): void {
  const a: any = workerData
  
  const {
    agentName,
    host,
    endpoint,
    queueName,
    dataType,
    port,
    maxMsg
  } = workerData

  const config: Configuration = {
    agentName,
    host,
    endpoint,
    queueName,
    dataType,
    port,
    maxMsg
  }
  
  const agent = new Agent(config)

  if(a.content)
    agent.acknowledgement(a)
  else
    agent.consume(message => parentPort?.postMessage(message))
}

export default agentInstance()