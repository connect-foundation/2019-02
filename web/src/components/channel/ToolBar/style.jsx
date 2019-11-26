import styled from 'styled-components';
import { colorGray } from '@/styles/themeUtil';

export default {
  ToolBarWrapper: styled.div`
    width:60px;
    height:100%;
    background: ${colorGray(0)};
    border-right: 1px solid ${colorGray(2)};
  `,
};
