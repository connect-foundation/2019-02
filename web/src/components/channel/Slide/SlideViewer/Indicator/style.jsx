import styled from 'styled-components';
import { ArrowBackIosRounded, ArrowForwardIosRounded } from '@material-ui/icons';
import { px, colorGray } from '@/styles/themeUtil';

export default {
  Indicator: styled.div`
    height: 100%;
    min-width: ${px(80)};
    width: 40%;
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    ${(props) => (props.direction === 'back'
    ? 'left: 0'
    : 'right: 0')};
    &:hover{
      div{
        opacity: 1;
      }
    }
  `,
  ArrowWrapper: styled.div`
    height: ${px(40)};
    width: ${px(40)};
    align-self: ${(props) => (props.direction === 'back'
    ? 'flex-start'
    : 'flex-end')};
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.2s;
  `,
  ArrowBack: styled(ArrowBackIosRounded)`
    color: ${colorGray(5)};
    transform: scale(1.5);
  `,
  ArrowFoward: styled(ArrowForwardIosRounded)`
    color: ${colorGray(5)};
    transform: scale(1.5);
  `,
};
