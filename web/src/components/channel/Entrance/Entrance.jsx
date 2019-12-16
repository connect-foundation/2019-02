import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { wsClient, wsParams } from '@/graphql/link';

const Entrance = ({
  children,
  channelId,
  isMaster,
  listenerList,
}) => {
  useEffect(() => {
    wsParams.channelId = channelId;
    wsParams.isMaster = isMaster;
    wsParams.listenerList = listenerList;
    wsClient.connect();

    return () => {
      wsClient.close();
      wsParams.channelId = null;
      wsParams.isMaster = false;
      wsParams.listenerList = listenerList;
    };
  }, [channelId, isMaster, listenerList]);

  return <>{children}</>;
};

Entrance.propTypes = {
  children: PropTypes.element.isRequired,
  channelId: PropTypes.string.isRequired,
  isMaster: PropTypes.bool.isRequired,
  listenerList: PropTypes.array.isRequired,
};

export default Entrance;
