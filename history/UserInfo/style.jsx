import styled from 'styled-components';
import Profile from '@@/tempProfile.png';
import Modal from '@material-ui/core/Modal';
import { px, colorGray } from '@/styles';

export default {
  UserInfo: styled.div`
    display: flex;
    flex-shrink: 0;
    flex-grow: 0;
    align-items: center;
    flex-direction: column;
    width: ${px(400)};
    height: 100%;
    padding: ${px(100)} 0;
  `,
  Profile: styled.div`
    width: ${px(150)};
    height: ${px(150)};
    border-radius: 100%;
    background-color: ${colorGray(4)};
    background-size: contain;
    background-image: url(${Profile});
    margin-right: ${px(10)};
  `,
  Setting: styled.div`
    position: absolute;
    top: ${px(80)};
    left: ${px(360)};
    cursor: pointer;
  `,
  SettingModal: styled(Modal)`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  SettingModalPage: styled.div`
    background: ${(({ theme }) => theme.palette.background.paper)};
  `,
};
