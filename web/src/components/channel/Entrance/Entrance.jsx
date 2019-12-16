import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { wsClient, wsParams } from '@/graphql/link';

const Entrance = ({
  children,
  channelId,
  isMaster,
  userId,
}) => {
  useEffect(() => {
    wsParams.channelId = channelId;
    wsParams.isMaster = isMaster;
    wsClient.connect();
    console.log(userId);
    console.log('입장하였습니다.');

    return () => {
      wsClient.close();
      console.log('퇴장하였습니다.');
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
  userId: PropTypes.string.isRequired,
};

export default Entrance;
