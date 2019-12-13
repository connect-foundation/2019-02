import { Switch } from '@material-ui/core';
import styled from 'styled-components';
import { px, colorGray, colorYellow } from '@/styles';

const S = {
  ChatSort: styled.div`
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    height: ${px(35)};
    padding: ${px(5)} ${px(20)} ${px(5)} ${px(10)};
    border-radius: ${px(3)};
    border-bottom: ${px(1)} solid ${colorGray(1)};
    box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.03);
    background-color: #fff;
  `,
  SortButton: styled.button.attrs({ type: 'button' })`
    float: ${({ isSort }) => (isSort ? 'right' : 'left')};
    font-size: ${px(14)};
    line-height: ${px(25)};
    vertical-align: top;
    color: ${colorGray(8)};
    margin-left: ${px(8)};
    &[aria-selected="true"] {
      color: ${colorYellow(9)};
    }
    cursor: pointer;
  `,
  SwitchButton: styled(Switch).attrs({
    color: 'primary',
  })`
    transform: scale(0.7);
    .MuiButtonBase-root {
      transition: none;
    }
  `,
  FlexWrapper: styled.div`
    display: flex;
    margin-left: auto;
  `,
};

export default S;
