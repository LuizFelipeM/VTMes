import Message from "../../Types/Dtos/Message";
import StatusCodeEnum from "../../Types/Enums/StatusCode";

interface MessageBroker {
    publishMessageInChannel(channel: string, message: Message): Promise<StatusCodeEnum>;
    subscribeChannels(channels: string | string[]): StatusCodeEnum;
    unsubscribeChannels(channels: string | string[]): StatusCodeEnum;
    subscribePatterns(patterns: string | string[]): StatusCodeEnum;
    unsubscribePatterns(patterns: string | string[]): StatusCodeEnum;
}

export default MessageBroker;
