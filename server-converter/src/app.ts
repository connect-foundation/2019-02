import * as express from 'express';
import * as cors from 'cors';
import authMiddleware from './middlewares';

const app = express();

const corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token'],
};

const start = () => {
  app.use(cors(corsOption));
  app.use(authMiddleware);
  app.listen('3000', () => {
    console.log('welcome dropy converter!');
  });
};

export default { start };
