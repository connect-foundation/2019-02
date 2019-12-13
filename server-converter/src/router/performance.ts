import { Router } from 'express';
import {
  convert,
  upload,
  saveTmp,
  removeTmp,
  timeStart,
  timeEnd,
} from '../middlewares';

/**
 * 성능 테스트를 위한 Router
 * - 각 프로세스에 대한 시간을 측정하고 로깅한다.
 * - 메세지 큐에 담는 절차를 생략한다.
 */

const performanceRouter = Router();

const middlewares = [
  timeStart('save'),
  saveTmp,
  timeEnd('save'),
  timeStart('convert'),
  convert,
  timeEnd('convert'),
  timeStart('upload'),
  upload,
  timeEnd('upload'),
  removeTmp,
];

performanceRouter.post(
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

export default performanceRouter;
