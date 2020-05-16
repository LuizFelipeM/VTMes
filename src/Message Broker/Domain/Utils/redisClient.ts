/* eslint-disable @typescript-eslint/camelcase */
import { promisify } from "util";
import { createClient, ClientOpts } from "redis";

const options: ClientOpts = {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    auth_pass: process.env.REDIS_AUTH_PASS
}

const redisClient = createClient(options);

redisClient.on('error', (err) => console.error(err));

const publish = promisify(redisClient.PUBLISH).bind(redisClient);

export { redisClient, publish };