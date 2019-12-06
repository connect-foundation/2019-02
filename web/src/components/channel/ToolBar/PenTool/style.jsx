import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { PEN_TOOL_ICON_PATH } from '@/constants';
import { px } from '@/styles';

const PenToolIcon = styled(({ isPenToolActive }) => (
  <span>
    <svg width="20" height="20">
      <path
        d={PEN_TOOL_ICON_PATH}
        style={{
          transition: 'fill .2s',
          fill: isPenToolActive ? '#F08C00' : '#CED4DA',
        }}
      />
    </svg>
  </span>
))``;

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
    margin-top: ${px(15)};
  `,
  PenToolIcon,
};

export default S;
