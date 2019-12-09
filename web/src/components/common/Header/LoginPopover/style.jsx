import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { px, colorYellow } from '@/styles';

export default {
  PopoverWrapper: styled.div`
    position: relative;
    padding: ${px(40)} ${px(20)} ${px(20)};
  `,
  BtnWrapper: styled.div`
    margin-bottom:15px;
    &:last-child{
      margin-bottom:0;
    }
  `,
  Link: styled(Link)`
    display: block;
    width: ${px(340)};
    height: ${px(60)};
    border-radius: ${px(2)};
    background-color: ${colorYellow(8)};
  `,
  TempError: styled.p`
    margin-top: 15px;
    font-size: 14px;
    line-height: 18px;
    text-align: center;
    color: #D7394A;
  `,
};
