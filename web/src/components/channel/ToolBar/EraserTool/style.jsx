import React from 'react';
import styled from 'styled-components';
import { ERASER_ICON_PATH } from '@/constants';
import { px } from '@/styles';
import { colorGray, colorPrimary } from '@/styles/themeUtil';

const EraserToolIcon = styled(({ className }) => (
  <span className={className}>
    <svg width="20" height="20">
      <path
        d={ERASER_ICON_PATH}
        style={{ fill: 'currentColor' }}
      />
    </svg>
  </span>
))`
color: ${colorGray(6)};
&:hover {
  color: ${colorPrimary('main')};
}
`;

const S = {
  EraserTool: styled.div`
    width: 100%;
    cursor: pointer;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: ${px(15)};
  `,
  EraserToolIcon,
};

export default S;
