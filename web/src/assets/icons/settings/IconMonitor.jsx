import React from 'react';
import PropTypes from 'prop-types';

const IconMonitor = ({ className }) => (
  <svg className={className} height="448pt" viewBox="0 0 448 448" width="448pt" xmlns="http://www.w3.org/2000/svg">
    <g fill="currentColor">
      <path d="m32 32h384v192h-384zm0 0" />
      <path d="m248 272h192c4.417969 0 8-3.582031 8-8v-256c0-4.417969-3.582031-8-8-8h-432c-4.417969 0-8 3.582031-8 8v256c0 4.417969 3.582031 8 8 8h192c4.417969 0 8 3.582031 8 8v112c0 4.417969-3.582031 8-8 8h-24c-13.253906 0-24 10.746094-24 24s10.746094 24 24 24h96c13.253906 0 24-10.746094 24-24s-10.746094-24-24-24h-24c-4.417969 0-8-3.582031-8-8v-112c0-4.417969 3.582031-8 8-8zm176-8h-32c-4.417969 0-8-3.582031-8-8s3.582031-8 8-8h32c4.417969 0 8 3.582031 8 8s-3.582031 8-8 8zm-400-24c-4.417969 0-8-3.582031-8-8v-208c0-4.417969 3.582031-8 8-8h400c4.417969 0 8 3.582031 8 8v208c0 4.417969-3.582031 8-8 8zm0 0" />
    </g>
  </svg>
);

IconMonitor.propTypes = {
  className: PropTypes.string,
};

export default IconMonitor;
