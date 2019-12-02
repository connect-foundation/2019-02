import * as express from 'express';
import * as cors from 'cors';
import router from './router';

const app = express();

const corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token'],
};

const handleError: express.ErrorRequestHandler = (err, _, res, __) => {
  const status = 'error';
  const message = (typeof err === 'string') ? err : err.message;

  res.status(500)
    .json({ status, message });
};

const start = () => {
  app.use(cors(corsOption));
  app.use(express.json());
  app.use(router);
  app.use(handleError);
  app.listen('3000', () => {
    console.log('welcome dropy converter!');
  });
};

export default { start };
