
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

export const useBeforeunload = (handler = () => {}) => {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const handleBeforeunload = (event) => {
      let { returnValue } = event;
      const { defaultPrevented } = event;
      const isFunc = () => typeof handlerRef.current === 'function';
      if (isFunc()) {
        returnValue = handlerRef.current(event);
      }
      if (defaultPrevented) {
        returnValue = '';
      }
      if (typeof returnValue !== 'string') {
        return '';
      }
      return returnValue;
    };

    window.addEventListener('beforeunload', handleBeforeunload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeunload);
    };
  }, []);
};

export const Beforeunload = (props) => {
  const { children = null, onBeforeunload } = props;
  useBeforeunload(onBeforeunload);

  return children;
};

Beforeunload.propTypes = {
  children: PropTypes.func.isRequired,
  onBeforeunload: PropTypes.func.isRequired,
};
