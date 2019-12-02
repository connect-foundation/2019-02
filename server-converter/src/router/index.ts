import { Router } from 'express';
import devRouter from './dev';
import {
  auth,
  convert,
  upload,
  saveTmp,
  removeTmp,
} from '../middlewares';

const router = Router();

router.post(
  '/images',
  auth,
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

const appRouter = process.env.NODE_ENV === 'development' ? devRouter : router;

export default appRouter;
