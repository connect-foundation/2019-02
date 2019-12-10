import { Router } from 'express';

import {
  requestQueue,
  convert,
  upload,
  saveTmp,
  removeTmp,
  requestEnd,
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
].reduce((array, middleware) => array.concat(middleware, requestEnd), []);

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
