import { Router } from 'express';
import * as multer from 'multer';
import * as Path from 'path';
import Converter from '../core';
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
