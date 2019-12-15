import Queue from '../core/queue';
import { clearProgress } from '../middlewares';

const requestQueue = (config) => {
  const queue = new Queue(config);

  const cleanListeners= (job) => {
    job.data.res.removeAllListeners('end');
  }

  queue.on('process', (job, complete) => {
    job.data.res.once('end', () => {
      cleanListeners(job);
      complete();
    });
    job.data.next();
  });

  queue.on('reject', (job) => {
    const { channelId } = job.data.req.params;

    clearProgress(channelId);
    job.data.res.status(200).json({ status: 'reject' });
  });

  const queueMiddleware = (req, res, next) => {
    const data = { req, res, next };
    const job = queue.createJob(data);

    res.once('close', () => {
      if (job.state === 'queue') {
        queue.cancelJob(job);
      }
      if (job.state === 'process') {
        cleanListeners(job);
        queue.stopJob(job);
      }
    });
  };

  queueMiddleware.queue = queue;

  return queueMiddleware;
};

export default requestQueue;
