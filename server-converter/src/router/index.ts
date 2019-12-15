import { Router } from 'express';
import devRouter from './dev';
import performanceRouter from './performance';
import {
  requestQueue,
  auth,
  convert,
  upload,
  saveTmp,
  removeTmp,
  setProgressPollingTopic,
  waitProgressPolling,
  clearProgress,
} from '../middlewares';

const prodRouter = Router();

const queueMiddleware = requestQueue({
  queueLimit: 20,
  activeLimit: 1,
  cpuUsage: 90,
});

const middlewares = [
  queueMiddleware,
  auth,
  saveTmp,
  convert,
  upload,
  removeTmp,
]

prodRouter.post(
  '/images/:channelId',
  ...middlewares,
  (req, res) => {
    const { channelId } = req.params;
    const { slideUrls, slideRatioList, fileUrl } = req;

    clearProgress(channelId);
    res.emit('end');
    res.status(200).json({
      status: 'ok',
      slideUrls,
      slideRatioList,
      fileUrl,
    });
  },
);

prodRouter.get(
  '/progress/:channelId',
  setProgressPollingTopic,
  waitProgressPolling,
);

const router = ((env) => {
  let appRouter = prodRouter;

  if (env === 'performance') appRouter = performanceRouter;
  if (env === 'development') appRouter = devRouter;

  return appRouter;
})(process.env.NODE_ENV);

setInterval(() => {
  console.log(`queuelist: ${queueMiddleware.queue.queue.reduce((str, item) => `${str}  ${item.state}`, '')}`);
  console.log(`activelist ${queueMiddleware.queue.active.reduce((str, item) => `${str}  ${item.state}`, '')}`);
}, 2000);


export default router;
