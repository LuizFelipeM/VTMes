import { Router } from 'express';

import MessageBrokerController from './Message Broker/Application/Controller/MessageBrokerController';

const routes = Router();

routes.post('/message-broker/publish-channel', MessageBrokerController.publishMessageInChannel);
routes.post('/message-broker/subscribe-channels', MessageBrokerController.subscribeChannels);
routes.post('/message-broker/unsubscribe-channels', MessageBrokerController.unsubscribeChannels);
routes.post('/message-broker/subscribe-patterns', MessageBrokerController.subscribePatterns);
routes.post('/message-broker/unsubscribe-patterns', MessageBrokerController.unsubscribePatterns);

export default routes;