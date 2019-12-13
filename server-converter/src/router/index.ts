import { Router } from 'express';
import devRouter from './dev';
import performanceRouter from './performance';
import {
  requestQueue,
  auth,
  convert,
  upload,
  saveTmp,
  checkSave,
  removeTmp,
  requestEnd,
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
  [saveTmp, checkSave],
  convert,
  upload,
  removeTmp,
].reduce((array:any, middleware) => array.concat(middleware, requestEnd), []);

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

export default router;
