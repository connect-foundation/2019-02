import { RequestHandler } from 'express';
import * as path from 'path';
import * as multer from 'multer';
import { getExtension } from '../utils/pathParser';

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, path.resolve(__dirname, '../../tmpFiles'));
  },
  filename: (req: any, file: any, cb: any) => {
    const extension = getExtension(file.originalname);
    cb(null, `${req.body.channelId}_file.${extension}`);
  },
});

const fileFilter = (_:any, file:any, callback:any) => {
  const extension = getExtension(file.originalname);
  if (extension !== 'pdf') {
    callback(new Error('허용되지 않는 파일형식'));
  } else {
    callback(null, true);
  }
};

const saveFileMiddleware = multer({ fileFilter, storage }).single('file');

export default saveFileMiddleware;
