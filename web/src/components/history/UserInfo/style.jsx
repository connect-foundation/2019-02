import styled from 'styled-components';
import Profile from '@@/icon_bird_870x818.png';
import Modal from '@material-ui/core/Modal';
import { px, colorGray } from '@/styles';

export default {
  UserInfo: styled.div`
    display: flex;
    flex-shrink: 0;
    flex-grow: 0;
    align-items: center;
    flex-direction: column;
    width: ${px(350)};
    height: 100%;
    padding: ${px(100)} 0;
    border-right: ${px(1)} solid ${colorGray(3)};
  `,
  Profile: styled.div`
    width: ${px(150)};
    height: ${px(150)};
    border-radius: 100%;
    background-color: ${colorGray(4)};
    background-size: contain;
    background-image: url(${Profile});
    margin-right: ${px(10)};
    margin-bottom: ${px(30)};
  `,
  Setting: styled.div`
    position: absolute;
    font-size: ${px(20)};
    top: ${px(70)};
    left: ${px(300)};
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
