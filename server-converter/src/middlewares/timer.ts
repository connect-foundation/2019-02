import { RequestHandler } from '../@types';

type timeMiddleware = (tag: string) => RequestHandler;

const timeStart: timeMiddleware = (tag) => (req, _, next) => {
  const { channelId } = req.body;
  const timerId: string = `${channelId}__${tag}`;

  console.time(timerId);

  next();
};

const timeEnd: timeMiddleware = (tag) => (req, _, next) => {
  const { channelId } = req.body;
  const timerId: string = `${channelId}__${tag}`;

  console.timeEnd(timerId);

  next();
};

export {
  timeStart,
  timeEnd,
};
