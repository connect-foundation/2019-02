import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { wsClient, wsParams } from '@/graphql/link';

const Entrance = ({ children, channelId, isMaster }) => {
  useEffect(() => {
    wsParams.channelId = channelId;
    wsParams.isMaster = isMaster;
    wsClient.connect();

    return () => {
      wsClient.close();
      wsParams.channelId = null;
      wsParams.isMaster = false;
    };
  }, [channelId, isMaster]);

  return <>{children}</>;
};

Entrance.propTypes = {
  children: PropTypes.element.isRequired,
  channelId: PropTypes.string.isRequired,
  isMaster: PropTypes.bool.isRequired,
};

export default Entrance;
