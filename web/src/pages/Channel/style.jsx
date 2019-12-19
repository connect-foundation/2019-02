import styled from 'styled-components';

export default {
  Channel: styled.div`
    height: 100%;
    background-color:  ${({ theme }) => theme.palette.background.main};
    &::after {
      display: block;
      clear: both;
      content: '';
    }
  `,
};
