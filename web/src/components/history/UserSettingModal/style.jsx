import styled from 'styled-components';
import Profile from '@@/tempProfile.png';
import { Button, TextField } from '@material-ui/core';
import { px, colorGray } from '@/styles';

export default {
  Modal: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: ${px(500)};
    height: ${px(360)};
    margin-top:-64px;
    background: white;
    padding: ${px(10)} 0;
  `,
  Profile: styled.div`
    width: 150px;
    height: 150px;
    border-radius: 100%;
    border: 1px solid ${(({ theme }) => theme.palette.dropyGray[3])}; 
    background-color: ${colorGray(4)};
    background-size: contain;
    background-image: url(${Profile});
    margin-right: 10px;
  `,
  SettingInput: styled(TextField)`
    width: 90%;
    height: 56px;
    font-size: ${px(21)};
    font-weight: bold;
  `,
  SettingButton: styled(Button)`
    width: 30%;
    height: 40px;
    font-size: ${px(21)};
    font-weight: bold;
  `,
  ModalClosedButton: styled.div`
    position: absolute;
    cursor: pointer;
    font-size: ${px(25)};
    top: ${px(20)};
    right: ${px(20)};
  `,
};
