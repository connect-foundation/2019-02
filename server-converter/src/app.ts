import * as express from 'express';
import * as cors from 'cors';
import {
  auth,
  convert,
  upload,
  saveTmp,
  removeTmp,
} from './middlewares';

const app = express();

const corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token'],
};

const handleError: express.ErrorRequestHandler = (err, _, res, __) => {
  console.log(err);
  if (typeof err === 'string') res.status(500).send(err);
  else {
    res.status(err.status || 500).send(err.message);
  }
};

const start = () => {
  app.use(cors(corsOption));
  app.use(express.json());
  app.use(auth);
  app.post(
    '/images',
    saveTmp,
    convert,
    upload,
    removeTmp,
    (_, res) => res.status(200).end(),
  );
  app.use(handleError);
  app.listen('3000', () => {
    console.log('welcome dropy converter!');
  });
};

export default { start };
