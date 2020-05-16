import { Request, Response } from "express";
import Acknowledge from "../../Types/Dtos/Acknowledge";

interface MessageBroker {
    publishMessageInChannel(req: Request, res: Response): Promise<Response<Acknowledge>>;
    subscribeChannels(req: Request, res: Response): Response<Acknowledge>;
    unsubscribeChannels(req: Request, res: Response): Response<Acknowledge>;
    subscribePatterns(req: Request, res: Response): Response<Acknowledge>;
    unsubscribePatterns(req: Request, res: Response): Response<Acknowledge>;
}

export default MessageBroker;