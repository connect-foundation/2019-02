import styled from 'styled-components';
import { TextField, Button } from '@material-ui/core';
import { px } from '@/styles/themeUtil';

const S = {
  SettingPresentation: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1 1 auto;
    padding: ${px(20)} 0 0;
  `,
  TextField: styled(TextField)`
    display: block;
    width: 100%;
  `,
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
