import { RequestHandler } from '../@types';

const removeMiddleware: RequestHandler = (req: any, res, next) => {
  req.stage = 'remove';
  req.converter.clear()
    .then(() => { next(); })
    .catch((err) => { next(err); });
};

export default removeMiddleware;
