import { RequestHandler } from '../@types';

const checkSave: RequestHandler = (req: any, _, next) => {
  const { file } = req;

  if (!file) {
    req.endflag = true;
  } else {
    req.isSaved = true;
  }
  next();
};

export default checkSave;
