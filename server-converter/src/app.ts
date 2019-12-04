import * as express from 'express';
import * as cors from 'cors';
import router from './router';
import { requestQueue } from './middlewares';

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

const queueMw = requestQueue({ activeLimit: 1, queuedLimit: 1 });

const start = () => {
  app.use(cors(corsOption));
  app.use(express.json());
  app.use(queueMw);
  app.use(router);
  app.use(handleError);
  app.listen('3000', () => {
    console.log('welcome dropy converter!');
  });
};
setInterval(() => {
  console.log(`queueLength: ${queueMw.queue.getLength()}`);
}, 1000);
export default { start };
