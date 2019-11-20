import * as express from 'express';
import * as cors from 'cors';
import * as multer from 'multer';
import {
  auth,
  convert,
  upload,
  save,
} from './middlewares';

const app = express();

const corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token'],
};

const start = () => {
  app.use(cors(corsOption));
  app.use(express.json());
  app.use(auth);
  app.post('/images', save, convert, upload);
  app.use((err: any, _: any, res: any, __: any) => {
    res.status(err.status || 500).end();
  });
  app.listen('3000', () => {
    console.log('welcome dropy converter!');
  });
};

export default { start };
