import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { px, colorYellow } from '@/styles';

export default {
  PopoverWrapper: styled.div`
    width:200px;
    padding:20px 15px;
  `,
  BtnWrapper: styled.div`
    width:100%;
    height:40px;
    margin-bottom:15px;
    &:last-child{
      margin-bottom:0;
    }
  `,
  Link: styled(Link)`
    display: block;
    width: 100%;
    height: 40px;
    border-radius: ${px(2)};
    box-shadow: rgba(0,0,0,0.24) 0 ${px(2)} ${px(2)} 0, rgba(0,0,0,0.24) 0 0 ${px(1)} 0;
    background-color: ${colorYellow(8)};
    font-weight: 700;
    font-size: ${px(14)};
    line-height: ${px(40)};
    text-align: center;
    color: #fff;
  `,
  TempError: styled.p`
    margin-top: 15px;
    font-size: 14px;
    line-height: 18px;
    text-align: center;
    color: #D7394A;
  `,
};
