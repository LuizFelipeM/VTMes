import MessageBroker from "../Domain/Interfaces/Services/MessageBroker";
import Message from "../Domain/Types/Dtos/Message";
import redisClient from "../Domain/Utils/redisClient";
import StatusCodeEnum from "../Domain/Types/Enums/StatusCode";

const MessageBrokerService: MessageBroker = {
    publishMessageInChannel(channel: string, message: Message) {
        try {
            redisClient.PUBLISH(channel, JSON.stringify(message));
            return { statusCode: StatusCodeEnum.publishSuccess }
        } catch(ex) {
            return { statusCode: StatusCodeEnum.publishFailure }
        }
    },

    subscribeChannels(channels: string | string[]) {
        try {
            redisClient.SUBSCRIBE(channels);
            return { statusCode: StatusCodeEnum.subscribeSuccess }
        } catch(ex) {
            return { statusCode: StatusCodeEnum.subscribeFailure }
        }
    },

    unsubscribeChannels(channels: string | string[]) {
        try {
            redisClient.UNSUBSCRIBE(channels);
            return { statusCode: StatusCodeEnum.unsubscribeSuccess }
        } catch(ex) {
            return { statusCode: StatusCodeEnum.unsubscribeFailure }
        }
    },

    subscribePatterns(patterns: string | string[]) {
        try {
            redisClient.PSUBSCRIBE(patterns);
            return { statusCode: StatusCodeEnum.subscribeSuccess }
        } catch(ex) {
            return { statusCode: StatusCodeEnum.subscribeFailure }
        }
    },
    
    unsubscribePatterns(patterns: string | string[]) {
        try {
            redisClient.PUNSUBSCRIBE(patterns);
            return { statusCode: StatusCodeEnum.unsubscribeSuccess }
        } catch(ex) {
            return { statusCode: StatusCodeEnum.unsubscribeFailure }
        }
    }
}

export default MessageBrokerService;