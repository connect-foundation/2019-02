import { RequestHandler } from '../@types';
import stop from './stop';

const removeMiddleware: RequestHandler = (req: any, res, next) => {
  console.log('remove', req.params.channelId);
  req.stage = 'remove';
  req.converter.clear()
    .then(() => { next(); })
    .catch((err) => { next(err); });
};

export default removeMiddleware;
