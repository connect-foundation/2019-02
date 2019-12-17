import * as path from 'path';
import * as multer from 'multer';
import { getExtension } from '../utils/pathParser';
import { RequestHandler, MulterHandler } from '../@types';

const destination: MulterHandler = (_, __, cb) => {
  cb(null, path.resolve(__dirname, '../../tmpFiles'));
};

const filename: MulterHandler = (req, file, cb) => {
  console.log('save', req.params.channelId, req.converter);
  req.stage = 'save';
  const extension = getExtension(file.originalname);
  cb(null, `${req.params.channelId}_file.${extension}`);
};

const fileFilter: MulterHandler = (_, file, callback) => {
  const extension = getExtension(file.originalname);
  if (extension !== 'pdf') {
    callback(new Error('허용되지 않는 파일형식'));
  } else {
    callback(null, true);
  }
};

const saveMiddleware: RequestHandler = multer({
  fileFilter,
  storage: multer.diskStorage({ destination, filename }),
}).single('file');


export default saveMiddleware;
