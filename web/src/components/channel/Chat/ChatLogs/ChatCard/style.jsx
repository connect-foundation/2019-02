import styled from 'styled-components';
import iconThumbGray from '@@/icon_thumb_gray.svg';
import iconThumbYellow from '@@/icon_thumb_yellow.svg';
import { px, colorGray } from '@/styles';

const S = {
  ChatCard: styled.div`
    padding: ${px(6)} ${px(19)};
    border-radius: ${px(3)};
    box-shadow: 0px 2px 10px rgba(73, 80, 87, 0.16);
    background-color: #fff;
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
    word-break: break-all;
    word-wrap: break-word;
    white-space: pre-wrap;
    color: ${colorGray(8)};
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
    padding-left: ${px(18)};
    background: url(${iconThumbGray}) no-repeat 0 70%/${px(14)};
    font-size: ${px(12)};
    line-height: ${px(24)};
    color: ${colorGray(6)};
    cursor: pointer;
    ${(props) => (props.isActive ? `
    background-image: url(${iconThumbYellow});
    ` : '')}
  `,
};

export default S;
