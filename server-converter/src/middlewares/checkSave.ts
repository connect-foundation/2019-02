import { RequestHandler } from '../@types';

const checkSave: RequestHandler = (req: any, _, next) => {
  const { file } = req;
  req[file ? 'isSaved' : 'endflag'] = true;
  return next();
};

export default checkSave;
