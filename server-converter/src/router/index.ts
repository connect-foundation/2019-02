import { Router } from 'express';
import devRouter from './dev';
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

const router = Router();

const queueMiddleware = requestQueue({
  queueLimit: 50,
  activeLimit: 1,
  cpuUsage: 90,
});

router.post(
  '/images/:channelId',
  queueMiddleware,
  auth,
  saveTmp,
  convert,
  upload,
  removeTmp,
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

router.get(
  '/progress/:channelId',
  setProgressPollingTopic,
  waitProgressPolling,
);

const appRouter = process.env.NODE_ENV === 'development' ? devRouter : router;

export default appRouter;
