import { RequestHandler } from '../@types';
import { clearProgress, removeTmp } from '../middlewares';

const requestEnd: RequestHandler = (req: any, res, next): void => {
  if (!req.endflag) return next();
  const { channelId } = req.params;

  clearProgress(channelId);

  if (req.isSaved) {
    removeTmp(req, res, next);
  } else if (!req.isSaved || req.isCanceled) {
    res.emit('end');
    res.status(204).end();
  }
};

export default requestEnd;
