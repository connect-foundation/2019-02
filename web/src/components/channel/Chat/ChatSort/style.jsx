import styled from 'styled-components';
import { px, colorGray, colorYellow } from '@/styles';

const S = {
  ChatSort: styled.div`
    flex: 0 0 auto;
    height: ${px(35)};
    padding: ${px(5)} ${px(20)};
    border-radius: ${px(3)};
    border-bottom: ${px(1)} solid ${colorGray(1)};
    box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.03);
    background-color: #fff;
  `,
  SortButton: styled.button.attrs({ type: 'button' })`
    float: right;
    font-size: ${px(14)};
    line-height: ${px(25)};
    vertical-align: top;
    color: ${colorGray(8)};
    & + & {
      margin-right: ${px(8)};
    }
    &[aria-selected="true"] {
      color: ${colorYellow(9)}
    }
    cursor: pointer;
  `,
};

export default S;
