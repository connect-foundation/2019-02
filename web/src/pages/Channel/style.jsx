import styled from 'styled-components';

export default {
  Channel: styled.div`
    background-color:  ${({ theme }) => theme.palette.background.main};
    flex: 1 1 auto;
    display: flex;
    height: 100%;
  `,
};
