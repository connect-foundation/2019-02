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
    width: ${px(150)};
    height: ${px(150)};
    border-radius: 100%;
    border: ${px(1)} solid ${colorGray(3)}; 
    background-color: ${colorGray(4)};
    background-size: contain;
    background-image: url(${Profile});
    margin-right: ${px(10)};
  `,
  SettingInput: styled(TextField)`
    width: 90%;
    height: ${px(56)};
    font-size: ${px(21)};
    font-weight: bold;
  `,
  SettingButton: styled(Button)`
    width: 30%;
    height: ${px(40)};
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
