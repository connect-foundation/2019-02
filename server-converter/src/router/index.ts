import { Router } from 'express';
import devRouter from './dev';
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

const router = Router();

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

router.post(
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

router.get(
  '/progress/:channelId',
  setProgressPollingTopic,
  waitProgressPolling,
);

const appRouter = process.env.NODE_ENV === 'development' ? devRouter : router;

export default appRouter;
