import * as path from 'path';
import * as multer from 'multer';
import * as fs from 'fs';
import { getExtension } from '../utils/pathParser';
import { noitfyProgress } from '../middlewares';
import { RequestHandler, MulterHandler } from '../@types';
import { CLEAR_TIME, PROGRESS_SAVING, MAX_SIZE_UPLOAD } from '../constants';

const destination: MulterHandler = (_, __, cb) => {
  const directory = path.resolve(__dirname, '../../tmpFiles');

  cb(null, directory);
};

const filename: MulterHandler = (req, file, cb) => {
  const extension = getExtension(file.originalname);
  const filePath = `${req.params.channelId}_file.${extension}`;

  cb(null, filePath);
};

const fileFilter: MulterHandler = (_, file, callback) => {
  const extension = getExtension(file.originalname);
  if (extension !== 'pdf') {
    callback(new Error('허용되지 않는 파일형식'));
  } else {
    callback(null, true);
  }
};

const save = multer({
  fileFilter,
  limits: { fileSize: MAX_SIZE_UPLOAD },
  storage: multer.diskStorage({ destination, filename }),
}).single('file');

const removeSavedFile = (filePath) => {
  setTimeout(() => {
    fs.unlink(filePath, (err) => {
      if (err) removeSavedFile(filePath);
    });
  }, CLEAR_TIME);
};

const closeHandler = (req, res) => res.once('close', () => {
  if (req.file.path) removeSavedFile(req.file.path);
});

const saveMiddleware: RequestHandler = (req, res, next) => {
  noitfyProgress(req.params.channelId, { status: 'save', message: PROGRESS_SAVING });
  save(req, res, (err) => {
    if (err) next(err);
    closeHandler(req, res);
    next();
  });
};


export default saveMiddleware;
