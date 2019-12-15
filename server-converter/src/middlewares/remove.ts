import { RequestHandler } from '../@types';

const removeMiddleware: RequestHandler = (req, res, next) => {
  req.converter.clear()
    .then(() => {
      if (req.endflag) {
        req.isCanceled = true;
        res.emit('end');
        res.status(204).end();
      } else next();
    })
    .catch((err) => { throw err; });
};

export default removeMiddleware;
