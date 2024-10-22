import { Router } from 'express';
import performanceRouter from './performance';
import {
  requestQueue,
  auth,
  createConverter,
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
  queueLimit: 5,
  activeLimit: 1,
  cpuUsage: 90,
});

const middlewares = [
  auth,
  saveTmp,
  queueMiddleware,
  createConverter,
  convert,
  upload,
  removeTmp,
];

prodRouter.post(
  '/images/:channelId',
  ...middlewares,
  (req, res) => {
    const { channelId } = req.params;
    const { slideUrls, slideRatioList, fileUrl } = req;

    clearProgress(channelId);
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

  return appRouter;
})(process.env.NODE_ENV);

export default router;
