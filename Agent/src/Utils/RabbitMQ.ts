import amqp, { Channel, Connection } from 'amqplib/callback_api';

let connection: Connection
let channel: Channel

amqp.connect(String(process.env.RABBIT_URL), (err: any, conn: Connection) => {
    if(err) throw err
    
    connection = conn
    connection.createChannel((err: any, ch: Channel) => {
        if(err) throw err

        channel = ch
    })
})

process.on('exit', () => connection.close())

export { connection, channel };