import { Router } from 'express';
import {
  requestQueue,
  convert,
  upload,
  saveTmp,
  removeTmp,
} from '../middlewares';

const devRouter = Router();

const queueMiddleware = requestQueue({
  queueLimit: 50,
  activeLimit: 2,
  cpuUsage: 90,
});

devRouter.post(
  '/images/:channelId',
  queueMiddleware,
  saveTmp,
  convert,
  upload,
  removeTmp,
  (req, res) => {
    const { slideUrls, slideRatioList, fileUrl } = req;
    res.status(200).json({
      status: 'ok',
      slideUrls,
      slideRatioList,
      fileUrl,
    });
  },
);

export default devRouter;
