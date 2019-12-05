import { Router } from 'express';
import {
  convert,
  upload,
  saveTmp,
  removeTmp,
  timeStart,
  timeEnd,
} from '../middlewares';

const devRouter = Router();

devRouter.post(
  '/images/:channelId',
  saveTmp,
  convert,
  upload,
  removeTmp,
  (req, res) => {
    const { slideUrls, fileUrl } = req;
    res.status(200).json({
      status: 'ok',
      slideUrls,
      fileUrl,
    });
  },
);

export default devRouter;
