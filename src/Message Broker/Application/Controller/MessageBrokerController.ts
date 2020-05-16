import { Request, Response } from "express";

import Acknowledge from "../../Domain/Types/Dtos/Acknowledge";
import ackStatuscodeToHttp from "../../Domain/Utils/getHttpStatusCode";
import MessageBroker from "../../Domain/Interfaces/Controllers/MessageBroker";
import { MessageBrokerServ } from "../../../bootstrapper";

const MessageBrokerController: MessageBroker = {
    async publishMessageInChannel(req: Request, res: Response): Promise<Response<Acknowledge>> {
        try {
            const { header, payload } = req.body;
            const statusCode = await MessageBrokerServ.publishMessageInChannel(header, payload);
            const httpStatus = ackStatuscodeToHttp(statusCode);
    
            return res.status(httpStatus).json({ statusCode });
        } catch(error) {
            return res.status(500).json({ error });
        }
    },

    subscribeChannels(req: Request, res: Response): Response<Acknowledge> {
        try {
            const { channels } = req.body;
            const statusCode = MessageBrokerServ.subscribeChannels(channels);
            const httpStatus = ackStatuscodeToHttp(statusCode);
    
            return res.status(httpStatus).json({ statusCode });
        } catch(error) {
            return res.status(500).json({ error });
        }
    },

    subscribePatterns(req: Request, res: Response): Response<Acknowledge> {
        try {
            const { patterns } = req.body;
            const statusCode = MessageBrokerServ.subscribePatterns(patterns);
            const httpStatus = ackStatuscodeToHttp(statusCode);
    
            return res.status(httpStatus).json({ statusCode });
        } catch(error) {
            return res.status(500).json({ error });
        }
    },

    unsubscribeChannels(req: Request, res: Response): Response<Acknowledge> {
        try {
            const { channels } = req.body;
            const statusCode = MessageBrokerServ.unsubscribeChannels(channels);
            const httpStatus = ackStatuscodeToHttp(statusCode);
    
            return res.status(httpStatus).json({ statusCode });
        } catch(error) {
            return res.status(500).json({ error });
        }
    },

    unsubscribePatterns(req: Request, res: Response): Response<Acknowledge> {
        try {
            const { patterns } = req.body;
            const statusCode = MessageBrokerServ.unsubscribePatterns(patterns);
            const httpStatus = ackStatuscodeToHttp(statusCode);
    
            return res.status(httpStatus).json({ statusCode });
        } catch(error) {
            return res.status(500).json({ error });
        }
    },
}

export default MessageBrokerController