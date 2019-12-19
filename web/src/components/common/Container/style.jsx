import styled from 'styled-components';
import { px } from '@/styles';

const S = {
  Container: styled.div`
    position: relative;
    z-index: 100;
    height: 100%;
    padding-top: ${px(50)};
    margin-top: -${px(50)};
  `,
};

export default S;
