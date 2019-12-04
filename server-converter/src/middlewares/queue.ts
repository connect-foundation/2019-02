import * as endMiddleware from 'express-end';
import { RequestHandler } from '../@types';
import Queue from '../core/Queue';

const requestQueue = (config) => {
  const queue = new Queue(config);
  queue.on('process', (job, done) => {
    job.data.res.once('end', () => {
      done();
    });
    job.data.next();
  });

  queue.on('reject', (job) => {
    job.data.res.send('sorry, reject');
  });

  const queueMiddleware = (req, res, next) => {
    const data = { req, res, next };
    const job = queue.createJob(data);

    res.once('close', () => {
      if (job.state === 'queue') {
        job.data.res.status(204).send('close!!');
        queue.cancelJob(job);
      }
    });
  };
  const result = (req, res, next) => {
    endMiddleware(req, res, () => {
      queueMiddleware(req, res, next);
    });
  };

  result.queue = queue;

  return result;
};

export default requestQueue;
