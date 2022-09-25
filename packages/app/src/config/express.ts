import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import { useContainer, useExpressServer } from 'routing-controllers';

import { diContainer } from './di-container';

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

useContainer(diContainer);

server.get('/', (req: Request, res: Response) => {
  res.status(200).send('smock-router');
});

useExpressServer(server, {
  routePrefix: '/api',
  validation: true,
  classTransformer: true,
});

export { server };
