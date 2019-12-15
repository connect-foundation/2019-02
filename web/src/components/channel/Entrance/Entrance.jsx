import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSetChannelStatus, useChannelSelector } from '@/hooks';
import {
  PRESENTATION_OFF,
  PRESENTATION_ON,
  MESSAGE_ON_BROWSER_CLOSE,
} from '@/constants';

const Entrance = ({ children }) => {
  const { channelId, isMaster } = useChannelSelector((state) => state);
  const mutate = useSetChannelStatus();
  const setChannelStatus = (status) => mutate({ variables: { channelId, status } });
  const handleBrowserClose = (event) => {
    setChannelStatus(PRESENTATION_OFF);
    event.returnValue = MESSAGE_ON_BROWSER_CLOSE;
  };

  useEffect(() => {
    if (isMaster) {
      setChannelStatus(PRESENTATION_ON);
      window.addEventListener('beforeunload', handleBrowserClose);
    }

    return () => {
      if (isMaster) {
        setChannelStatus(PRESENTATION_OFF);
        window.removeEventListener('beforeunload', handleBrowserClose);
      }
    };
  }, []);

  return <>{children}</>;
};

Entrance.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Entrance;
