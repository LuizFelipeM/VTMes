import MessageBroker from "../../Domain/Interfaces/Services/MessageBroker";
import Message from "../../Domain/Types/Dtos/Message";
import StatusCodeEnum from "../../Domain/Types/Enums/StatusCode";
import { redisClient, publish } from "../../Domain/Utils/redisClient";


function MessageBrokerService(): MessageBroker {
    return {
        async publishMessageInChannel(channel: string, message: Message): Promise<StatusCodeEnum> {
            if(await publish(channel, JSON.stringify(message)))
                return StatusCodeEnum.publishSuccess;
            else
                return StatusCodeEnum.publishFailure;
        },

        subscribeChannels(channels: string | string[]): StatusCodeEnum {
            if(redisClient.subscribe(channels))
                return StatusCodeEnum.subscribeSuccess;
            else
                return StatusCodeEnum.subscribeFailure;
        },

        unsubscribeChannels(channels: string | string[]): StatusCodeEnum {
            if(redisClient.unsubscribe(channels))
                return StatusCodeEnum.unsubscribeSuccess;
            else
                return StatusCodeEnum.unsubscribeFailure;
        },

        subscribePatterns(patterns: string | string[]): StatusCodeEnum {
            if(redisClient.psubscribe(patterns))
                return StatusCodeEnum.subscribeSuccess;
            else
                return StatusCodeEnum.subscribeFailure;
        },
        
        unsubscribePatterns(patterns: string | string[]): StatusCodeEnum {
            if(redisClient.punsubscribe(patterns))
                return StatusCodeEnum.unsubscribeSuccess;
            else
                return StatusCodeEnum.unsubscribeFailure;
        }
    }
}

export default MessageBrokerService;