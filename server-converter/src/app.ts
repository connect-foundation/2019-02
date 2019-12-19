import * as http from 'http';
import * as https from 'https';
import * as fs from 'fs';
import * as express from 'express';
import * as cors from 'cors';
import router from './router';
import { TIMEOUT } from './constants';

const isProdMod = process.env.NODE_ENV === 'production';
const ORIGIN = `${isProdMod ? 'https://dropy.online' : 'http://localhost'}:${process.env.PORT}`;
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

app.use(cors(corsOption));
app.use(express.json());
app.use(router);
app.use(handleError);

const server = isProdMod
  ? https.createServer({
    key: fs.readFileSync(`${process.env.PEM_PATH}/key.pem`),
    cert: fs.readFileSync(`${process.env.PEM_PATH}/cert.pem`),
    ca: fs.readFileSync(`${process.env.PEM_PATH}/chain.pem`),
  }, app)
  : http.createServer(app);

const start = () => {
  server.listen(process.env.PORT, () => {
    server.setTimeout(TIMEOUT);
    console.log(`Dropy Converter starts on port ${ORIGIN}`);
  });
};

export default { start };
