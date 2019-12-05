import Queue from '../core/queue';
import endMiddleware from './end';

const requestQueue = (config) => {
  const queue = new Queue(config);

  queue.on('process', (job, done) => {
    job.data.res.once('end', () => {
      done();
    });
    job.data.next();
  });

  queue.on('reject', (job) => {
    job.data.res.json({ status: 'reject', message: 'sorry, queue is full...' });
  });

  const queueMiddleware = (req, res, next) => {
    const data = { req, res, next };
    const job = queue.createJob(data);

    res.once('close', () => {
      // TODO: BUGFIX
      if (job.state === 'queue') {
        job.data.res.status(204).end();
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
