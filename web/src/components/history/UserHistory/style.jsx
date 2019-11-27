import styled from 'styled-components';

export default {
  UserHistory: styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    flex: 1;
    height: 100%;
    overflow: auto;
    border-left: 1px solid ${(({ theme }) => theme.palette.dropyGray[3])};
  `,
  UserHistoryContents: styled.div`
    position: absolute;
    width: 100%;
  `,
};
