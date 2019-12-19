import styled from 'styled-components';
import { px, colorGray, colorYellow } from '@/styles';

const S = {
  Help: styled.div`
    overflow: auto;
    box-sizing: border-box;
    height: 100%;
    background-color: #fff;
  `,
  Inner: styled.div`
    max-width: ${px(960)};
    margin: ${px(50)} auto;
    padding: 0 ${px(20)};
  `,
  Title: styled.strong`
    display: block;
    font-size: ${px(20)};
    line-height: ${px(24)};
    color: ${colorYellow(9)};
  `,
  Content: styled.p`
    margin: ${px(20)} ${px(10)};
    font-size: ${px(15)};
    line-height: ${px(28)};
    white-space: pre-wrap;
    color: ${colorGray(8)};
  `,
  List: styled.div`
    padding: ${px(20)} 0;
  `,
  Order: styled.p`
    margin: ${px(10)};
    font-size: ${px(15)};
    color: ${colorGray(8)};
  `,
  ProfileWrapper: styled.div`
    width:100%;
    display: flex;
    padding: ${px(20)};
    justify-content: space-between;
  `,
  Profile: styled.div`
    width: 180px;
    height: auto;
    text-align: center;
  `,
  ProfileImg: styled.img`
    width: 100%;
  `,
  Name: styled.p`
    font-weight: bold;
    margin-bottom: ${px(10)};
  `,
  Info: styled.p`
    color: ${colorGray(7)};
    margin-bottom: ${px(2)};
  `,
  Link: styled.a`
    color: ${colorGray(7)};
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  `,
  Copyright: styled.div`
    text-align: center;
    margin: ${px(100)};
  `,
};

export default S;
