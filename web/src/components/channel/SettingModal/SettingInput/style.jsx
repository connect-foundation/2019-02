import styled from 'styled-components';
import {
  InputBase, Button, Switch,
} from '@material-ui/core';
import { px, colorGray } from '@/styles/themeUtil';

const S = {
  SettingPresentation: styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    padding: ${px(20)} 0 0;
    justify-content: space-between;
  `,
  InputWrapper: styled.div`
  `,
  InputRow: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${px(15)} 0 ${px(15)} 0;
    & + & {
      border-top: 1px solid ${colorGray(3)}; 
    }
    font-size: ${px(16)};
    color: ${colorGray(7)};
  `,
  TextField: styled(InputBase)`
    display: block;
    flex: 1;
    margin-left: 20px;
    padding: 2px 10px;
    background-color: ${colorGray(1)};
    font-weight: normal;
    font-size: ${px(16)};
  `,
  SwitchButton: styled(Switch).attrs({
    color: 'primary',
  })``,
  AreaButtons: styled.div`
    margin-top: ${px(15)};
  `,
  SaveButton: styled(Button).attrs({ color: 'primary' })`
    width: 100%;
    height: ${px(50)};
    .MuiButton-label {
      font-size: ${px(16)};
      font-weight: bold;
    }
  `,
};

export default S;
