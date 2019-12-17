import styled from 'styled-components';
import iconThumbGrayUrl from '@@/icon_thumb_gray.svg';
import iconThumbOrangeUrl from '@@/icon_thumb_orange.svg';
import { px, colorGray, colorYellow } from '@/styles';

const S = {
  ChatLogs: styled.ul`
    margin: ${px(14)} 0;
  `,
  ChatLog: styled.li`
    & + & {
      margin-top: ${px(9)};
    }
  `,
  ChatCard: styled.div`
    padding: ${px(6)} ${px(19)};
    border-radius: ${px(3)};
    box-shadow: 0px 2px 10px rgba(73, 80, 87, 0.16);
    background-color: ${({ isQuestion }) => (
    isQuestion
      ? colorYellow('light')
      : '#fff'
  )};
  `,
  Author: styled.em`
    display: block;
    font-style: normal;
    font-size: ${px(14)};
    color: ${colorGray(6)};
  `,
  Message: styled.p`
    margin-top: ${px(5)};
    font-size: ${px(16)};
    line-height: ${px(21)};
    word-break: break-word;
    word-wrap: break-word;
    white-space: pre-wrap;
    color: ${colorGray(8)};
  `,
  Question: styled.span`
    font-weight: bold;
    color: '#000'; 
    cursor: pointer;
    &:hover{
      text-decoration: underline;
      color: ${({ theme }) => theme.palette.link};
    }
  `,
  DisableQ: styled.span`
    color: ${colorGray(6)}; 
  `,
  AreaButtons: styled.div`
    height: ${px(20)};
    margin-right: -${px(8)};
    &::after {
      display: block;
      clear: both;
      content: '';
    }
  `,
  LikeButton: styled.button.attrs({ type: 'button' })`
    float: right;
    height: ${px(20)};
    font-size: ${px(12)};
    line-height: ${px(24)};
    color: ${colorGray(6)};
    cursor: pointer;
  `,
  LikeIcon: styled.i`
    display: inline-block;
    width: ${px(14)};
    height: ${px(14)};
    margin: ${px(4)} ${px(5)} 0 0;
    vertical-align: top;
    background: no-repeat 50% 50%/100% auto;
    ${({ isActive }) => (isActive ? `
    background-image: url(${iconThumbOrangeUrl});
    ` : `
    background-image: url(${iconThumbGrayUrl});
    `)}
  `,
};

export default S;
