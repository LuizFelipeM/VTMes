# VTMes
Message Oriented Middleware and Task Runner

This project is experimental, and has been made with RabbitMQ + Node with Webhooks in order to try avoid problems with synchronous data.
The main goal is to send a message, process, save on the message queue and receive the response asynchronous.
```typescript
message: {
    header: string,
    payload: any,
    urls: string[] | null
}
```