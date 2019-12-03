import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { PEN_TOOL_ICON_PATH } from '@/constants';
import { px } from '@/styles';

const PenToolIcon = styled(({ isPenToolActive }) => (
  <span>
    <svg width="28" height="28">
      <path
        d={PEN_TOOL_ICON_PATH}
        style={{
          transition: 'fill .2s',
          fill: isPenToolActive ? '#F08C00' : '#CED4DA',
        }}
      />
    </svg>
  </span>
))`
  width: ${px(28)};
  height: ${px(28)};
`;

PenToolIcon.propTypes = {
  isPenToolActive: PropTypes.bool.isRequired,
};

const S = {
  PenTool: styled.div`
    width: 100%;
    cursor: pointer;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  PenToolIcon,
};

export default S;
