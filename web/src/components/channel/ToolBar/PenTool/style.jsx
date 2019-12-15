import React from 'react';
import styled from 'styled-components';
import { PEN_TOOL_ICON_PATH } from '@/constants';
import { colorGray, colorPrimary } from '@/styles/themeUtil';
import { px } from '@/styles';

const PenToolIcon = styled(({ className }) => (
  <span className={className}>
    <svg width="20" height="20">
      <path
        d={PEN_TOOL_ICON_PATH}
        style={{ fill: 'currentColor' }}
      />
    </svg>
  </span>
))`
  color: ${(props) => (
    props.isPenToolActive
      ? colorPrimary('main')
      : colorGray(6))};
`;

const S = {
  PenTool: styled.div`
    width: 100%;
    cursor: pointer;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: ${px(15)};
  `,
  PenToolIcon,
};

export default S;
