import styled from 'styled-components';
import Profile from '@@/tempProfile.png';
import { px, colorGray } from '@/styles';

export default {
  UserInfoWrapper: styled.div`
    display: flex;
    flex-shrink: 0;
    flex-grow: 0;
    align-items: center;
    flex-direction: column;
    width: ${px(400)};
    height: 100%;
    padding: 100px 0;
  `,
  Profile: styled.div`
    width: 150px;
    height: 150px;
    border-radius: 100%;
    background-color: ${colorGray(4)};
    background-size: contain;
    background-image: url(${Profile});
    margin-right: 10px;
  `,
};
