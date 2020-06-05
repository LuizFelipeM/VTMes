import { Router } from "express";
import MessageBrokerController from "./Interface/MessageBrokerController";

const BASE_URL = '/message-broker';
const CONSUMER_URL = `${BASE_URL}/consumer`;
const PRODUCER_URL = `${BASE_URL}/producer`;

const routesMQ = Router();

routesMQ.get(CONSUMER_URL, MessageBrokerController.ConsumeMessage);
routesMQ.post(CONSUMER_URL, MessageBrokerController.Acknowledgement);


routesMQ.post(PRODUCER_URL, MessageBrokerController.PublishMessage);
routesMQ.post(`${PRODUCER_URL}/topic`, MessageBrokerController.PublishMessageToTopic);

export default routesMQ;