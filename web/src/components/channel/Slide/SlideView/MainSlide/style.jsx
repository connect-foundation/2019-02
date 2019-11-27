import styled from 'styled-components';

export default {
  Wrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  `,
  SlideImg: styled.img`
    user-select: none;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    background-color: ${({ theme }) => theme.palette.common.white};
    box-shadow: ${({ theme }) => theme.palette.shadow.slide};
  `,
};
