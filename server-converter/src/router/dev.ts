import { Router } from 'express';
import {
  convert,
  upload,
  saveTmp,
  removeTmp,
} from '../middlewares';

const devRouter = Router();

devRouter.post(
  '/images/:channelId',
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
