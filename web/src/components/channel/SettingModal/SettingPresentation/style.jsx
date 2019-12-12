import styled from 'styled-components';
import { TextField, Button, Switch } from '@material-ui/core';
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
  TextField: styled(TextField)`
    display: block;
    width: 100%;
  `,
  ToggleAnonymous: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${colorGray(3)};
    padding: ${px(20)} 0 ${px(8)} 0;
    font-size: ${px(16)};
  `,
  SwitchButton: styled(Switch).attrs({
    color: 'primary',
  })``,
  AreaButtons: styled.div`
    text-align: right;
  `,
  SaveButton: styled(Button).attrs({ color: 'primary', variant: 'contained' })`
    width: ${px(120)};
    height: ${px(35)};
    .MuiButton-label {
      font-size: ${px(15)};
    }
  `,
};

export default S;
