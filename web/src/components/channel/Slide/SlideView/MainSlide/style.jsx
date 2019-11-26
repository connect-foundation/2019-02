import styled from 'styled-components';

export default {
  Wrapper: styled.div`
    width:100%;
    height:100%;
    background-color: ${({ theme }) => theme.palette.common.white};
    box-shadow: ${({ theme }) => theme.palette.shadow.slide};
  `,
  BackSlide: styled.div`
  `,
};
