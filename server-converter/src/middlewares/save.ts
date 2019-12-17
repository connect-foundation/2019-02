import * as path from 'path';
import * as multer from 'multer';
import { getExtension, getFilename } from '../utils/pathParser';
import { RequestHandler, MulterHandler } from '../@types';

const getFilePath = (channelId = '', extension = '') => {
  const directory = path.resolve(__dirname, '../../tmpFiles');
  const filePath = `${channelId}_file.${extension}`;
  const completePath = path.join(directory, filePath);

  return { directory, filePath, completePath };
};

const destination: MulterHandler = (_, __, cb) => {
  const { directory } = getFilePath();
  cb(null, directory);
};

const filename: MulterHandler = (req, file, cb) => {
  const extension = getExtension(file.originalname);
  const { filePath, completePath } = getFilePath(req.params.channelId, extension);

  req.stage = { stage: 'save', next: false, path: completePath };
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

const saveMiddleware: RequestHandler = multer({
  fileFilter,
  storage: multer.diskStorage({ destination, filename }),
}).single('file');


export default saveMiddleware;
