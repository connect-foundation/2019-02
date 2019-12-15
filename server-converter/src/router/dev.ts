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
  activeLimit: 1,
  cpuUsage: 90,
});

const middlewares = [
  queueMiddleware,
  saveTmp,
  convert,
  upload,
  removeTmp,
];

devRouter.post(
  '/images/:channelId',
  ...middlewares,
  (req, res) => {
    const { slideUrls, slideRatioList, fileUrl } = req;
    res.emit('end');
    res.status(200).json({
      status: 'ok',
      slideUrls,
      slideRatioList,
      fileUrl,
    });
  },
);

export default devRouter;
