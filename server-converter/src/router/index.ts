import { Router } from 'express';
import devRouter from './dev';
import {
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

router.post(
  '/images/:channelId',
  auth,
  saveTmp,
  convert,
  upload,
  removeTmp,
  (req, res) => {
    const { channelId } = req.params;
    const { slideUrls, fileUrl } = req;

    clearProgress(channelId);
    res.status(200).json({
      status: 'ok',
      slideUrls,
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
