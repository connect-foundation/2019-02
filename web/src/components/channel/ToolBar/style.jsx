import styled from 'styled-components';
import { colorGray, px } from '@/styles/themeUtil';

export default {
  ToolBar: styled.div`
    float: left;
    width: ${px(55)};
    height: 100%;
  `,
  ToolBarContent: styled.div`
    height: 100%;
    background: ${colorGray(0)};
    border-right: 1px solid ${colorGray(2)};
  `,
};
