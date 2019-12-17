const Channels = require('../../models/channels');
const { verifyToken } = require('../../utils/token');

const LISTENER_LIST_CHANGED = 'LISTENER_LIST_CHANGED';
const CHANNEL_STATUS_CHANGED = 'CHANNEL_STATUS_CHANGED';

const updateListenerList = async (channelId, listenerList, pubsub) => {
  const channelListenerList = await Channels.findOneAndUpdate(
    { channelId },
    { listenerList },
  );

  const payload = await channelListenerList.toPayload('channel', { channelId, listenerList });
  pubsub.publish(LISTENER_LIST_CHANGED, { listenerListChanged: payload });
};

const updateChannelStatus = async (channelId, user, status, pubsub) => {
  const channel = await Channels.findAndUpdateStatus(channelId, user.userId, status);
  pubsub.publish(CHANNEL_STATUS_CHANGED, { channelStatusChanged: channel });
};

const isExistListenerList = (user, listenerList) => listenerList.includes(user.userId);

const enteredListener = async (context) => {
  const {
    token,
    channelId,
    isMaster,
    pubsub,
  } = context;

  const user = token ? verifyToken(token) : null;

  if (!channelId) return;

  const { listenerList } = await Channels.findOne({ channelId });
  if (!isExistListenerList(user, listenerList)) {
    listenerList.push(user.userId);
    updateListenerList(channelId, listenerList, pubsub);
  }
  if (!isMaster) return context;

  updateChannelStatus(channelId, user, 'on', pubsub);

  return context;
};

const leaveListener = async ({ initPromise }, pubsub) => {
  const context = await initPromise;
  if (!context) return;

  const {
    token,
    channelId,
    isMaster,
  } = context;
  const user = token ? verifyToken(token) : null;
  const channelInfomation = await Channels.findOne({ channelId });
  if (channelInfomation.listenerList === null) return;
  if (await isExistListenerList(user, channelInfomation.listenerList)) {
    const listenerList = channelInfomation.listenerList
      .filter((value) => value !== user.userId);
    updateListenerList(channelId, listenerList, pubsub);
  }
  if (!isMaster) return context;

  updateChannelStatus(channelId, user, 'off', pubsub);

  return context;
};

module.exports = {
  enteredListener,
  leaveListener,
};
