import { Worker, isMainThread } from 'worker_threads';
import path from 'path';
import { Message } from 'amqplib';

interface ThreadService {
  createThread: (data: unknown) => Promise<unknown>;
  acknoledgment: (message: Message) => Promise<boolean>;
}

const threadService = (): ThreadService => {
  function createThread(data: unknown): Promise<unknown> {
    shouldCreateThread()

    return new Promise<unknown>((resolve, reject) => {
      const agentInstancePath = path.resolve(__dirname, '..', 'AgentThread', 'script.js')
      const worker = new Worker(agentInstancePath, { workerData: data })

      worker.on('message', (message: unknown) => {
        console.log('resolve', message);
        resolve(message)
      })

      worker.on('error', (error: unknown) => {
        console.error(error)
        reject(error)
      })

      worker.on('exit', (code: number) => {
        if(code !== 0)
          reject(new Error(`Worker Thread stopped with exit coed ${code}`))
        else
          resolve(undefined)
      })
    })
  }

  function acknoledgment(message: Message): Promise<boolean> {
    shouldCreateThread()

    return new Promise<boolean>((resolve, reject) => {
      const agentInstancePath = path.resolve(__dirname, '..', 'AgentThread', 'script.js')
      const worker = new Worker(agentInstancePath, { workerData: message })

      worker.on('message', (message: boolean) => {
        console.log('resolve', message)
        resolve(message)
      })

      worker.on('error', (error: unknown) => {
        console.error(error)
        reject(error)
      })

      worker.on('exit', (code: number) => {
        if(code !== 0)
          reject(new Error(`Worker Thread stopped with exit coed ${code}`))
        else
          resolve(undefined)
      })
    })
  }

  return {
    createThread,
    acknoledgment
  }
}

const shouldCreateThread = () => {
  if(!isMainThread)
    throw 'You can not initiate new threads outside of Main Thread'
}

export default threadService();