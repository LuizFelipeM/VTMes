import Message from "../../Types/Dtos/Message";
import Acknowledge from "../../Types/Dtos/Acknowledge";

interface MessageBroker {
    publishMessageInChannel(channel: string, message: Message): Acknowledge;
    subscribeChannels(channels: string | string[]): Acknowledge;
    unsubscribeChannels(channels: string | string[]): Acknowledge;
    subscribePatterns(patterns: string | string[]): Acknowledge;
    unsubscribePatterns(patterns: string | string[]): Acknowledge;
}

export default MessageBroker;
