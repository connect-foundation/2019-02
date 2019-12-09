import Queue from '../core/queue';
import { clearProgress } from '../middlewares';

const requestQueue = (config) => {
  const queue = new Queue(config);

  queue.on('process', (job, complete) => {
    job.data.res.once('end', () => {
      complete('complete');
    });
    if (!job.data.req.endflag) job.data.next();
  });

  queue.on('reject', (job) => {
    const { channelId } = job.data.req.params;

    clearProgress(channelId);
    job.data.res.status(200).json({ status: 'reject' });
  });

  const canCancel = (job) => {
    return (job.state === 'process' && !job.data.req.isConverted);
  }

  const queueMiddleware = (req, res, next) => {
    const data = { req, res, next };
    const job = queue.createJob(data);

    res.once('close', () => {
      if (job.state === 'queue') {
        job.data.req.endflag = true;
        queue.cancelJob(job);
      }
      if (canCancel(job)) {
        job.data.req.endflag = true;
        queue.completeJob(job, 'cancel');
      }
    });
  };

  queueMiddleware.queue = queue;

  return queueMiddleware;
};

export default requestQueue;
