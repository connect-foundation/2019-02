import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { px, colorGray } from '@/styles';
import { CHAT_LIKE_ICON_PATH } from '@/constants';

const LikeIcon = styled(({ isActive, className }) => (
  <span className={className}>
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d={CHAT_LIKE_ICON_PATH}
        style={{
          transition: 'fill .2s',
          fill: isActive ? '#F08C00' : '#CED4DA',
        }}
      />
    </svg>
  </span>
))`
display: inline-block;
width: ${px(14)};
height: ${px(14)};
margin: ${px(4)} ${px(5)} 0 0;
vertical-align: top;
`;

LikeIcon.propTypes = {
  isActive: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

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
    font-size: ${px(12)};
    line-height: ${px(24)};
    color: ${colorGray(6)};
    cursor: pointer;
  `,
  LikeIcon,
};

export default S;
