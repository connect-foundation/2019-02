import styled from 'styled-components';
import { Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Profile from '@@/icon_bird_870x818.png';
import { px, colorGray } from '@/styles';

export default {
  User: styled.div`
    position: absolute;
    right: 30px;
  `,
  LoginBtn: styled(Button)`
    span{
      color: ${colorGray(6)};
      font-size: ${px(16)};
    }
  `,
  UserInfo: styled(Button)`
    display: flex;
    background-color: transparent;
  `,
  Profile: styled.div`
    width: 36px;
    height: 36px;
    border-radius: 100%;
    background-color: ${colorGray(4)};
    background-size: contain;
    background-image: url(${Profile});
    margin-right: 10px;
  `,
  UserName: styled.div`
    color: ${colorGray(6)};
    font-size: ${px(16)};
    margin-right: 10px;
`,
  DownIcon: styled(ExpandMoreIcon)`
    color: ${colorGray(6)};
    font-size: ${px(16)};
  `,
};
