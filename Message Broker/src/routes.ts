import { Router } from "express";
import MessageBrokerController from "./Interface/MessageBrokerController";

const PRODUCER_URL = '/producer';

const routesMQ = Router();

routesMQ.post(PRODUCER_URL, MessageBrokerController.publishMessage);
routesMQ.post(`${PRODUCER_URL}/allocate`, MessageBrokerController.allocateProducer);

export default routesMQ;