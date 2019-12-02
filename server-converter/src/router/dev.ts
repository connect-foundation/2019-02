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
  '/images',
  saveTmp,
  timeStart('convert'),
  convert,
  timeEnd('convert'),
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

devRouter.post(
  '/save',
  saveTmp,
  (req, _, next) => {
    req.slides = [];
    next();
  },
  removeTmp,
  (_, res) => {
    res.status(200).json({ status: 'ok' });
  },
);

devRouter.post(
  '/convert',
  (req, res) => {
    const { count } = req.body;
    const filenames = [];

    for (let i = 0; i < count; i += 1) filenames.push(`__dummy_${i}`);

    const convertTasks = filenames.map((file) => {
      const inputPath = Path.resolve(__dirname, '../../tmpFiles/__dummy.pdf');
      const outputPath = Path.resolve(__dirname, '../../tmpFiles');
      const converter = new Converter({
        quality: 100,
        format: 'png',
        resolution: 144,
        compression: 'JPEG2000',
        name: (page: number) => `${file}_${page}`,
      });

      return converter.convertToSlides(inputPath, outputPath);
    });

    Promise.all(convertTasks).then(() => {
      res.status(200).json({ status: 'ok' });
    });
  },
);

export default devRouter;
