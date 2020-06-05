import cors from 'cors';
import express from 'express';

import routes from './routes';
import routesMQ from './Message Broker/routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);
app.use(routesMQ);

app.listen(process.env.PORT);