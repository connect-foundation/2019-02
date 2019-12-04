import { RequestHandler } from '../@types';
import { Poller } from '../core';

const poller: Poller = Poller.create();

const setProgressPollingTopic: RequestHandler = (req, _, next) => {
  const { channelId } = req.params;

  req.topic = channelId;
  next();
};

const waitProgressPolling: RequestHandler = poller.toMiddleware();

const noitfyProgress = (channelId: string, payload: any): void => {
  poller.broadcast(channelId, payload);
};

const clearProgress = (channelId: string) => {
  poller.clear(channelId);
};

export {
  setProgressPollingTopic,
  waitProgressPolling,
  noitfyProgress,
  clearProgress,
};
