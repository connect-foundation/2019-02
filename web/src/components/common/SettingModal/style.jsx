import styled from 'styled-components';
import { px, colorGray, colorCommon } from '@/styles/themeUtil';
import { IconListener, IconMonitor } from '@/assets/icons';

const S = {
  SettingModal: styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10000;
    background-color: ${colorGray(9)}E6;
  `,
  ModalContent: styled.div`
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    box-sizing: border-box;
    width: ${px(500)};
    background-color: ${colorCommon('white')};
    transform: translate(-50%, -50%);
  `,
  ButtonCloseModal: styled.button.attrs({ type: 'button' })`
    position: absolute;
    top: 0;
    right: 0;
    width: ${px(50)};
    height: ${px(50)};
    cursor: pointer;
    &::before,
    &::after {
      position: absolute;
      top: 50%:
      right: 50%;
      width: ${px(2)};
      height: ${px(16)};
      margin: -${px(8)} 0 0 -${px(1)};
      background-color: ${colorGray(8)};
      content: '';
    }
    &::before {
      transform: rotate(45deg);
    }
    &::after {
      transform: rotate(-45deg);
    }
  `,
  Categories: styled.ul`
    flex: 0 0 auto;
    width: ${px(68)};
    height: ${px(340)};
    background-color: #f3f3f3;
  `,
  Category: styled.li`
    position: relative;
    &::after {
      position: absolute;
      right: 0;
      left: 0;
      bottom: -${px(1)};
      width: ${px(30)};
      height: ${px(1)};
      margin: 0 auto;
      background-color: ${colorGray(4)};
      content: '';
    }
  `,
  CategoryButton: styled.button.attrs({ type: 'button' })`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: ${px(68)};
    text-align: center;
    cursor: pointer;
  `,
  Content: styled.div`
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    padding: ${px(22)} ${px(28)} ${px(28)};
  `,
  Title: styled.strong`
    flex: 0 0 auto;
    display: block;
    font-size: ${px(17)};
    color: ${colorGray(8)};
  `,
  IconListener: styled(IconListener)`
    width: auto;
    height: ${px(20)};
    ${({ isActive, theme }) => (isActive ? `
      color: ${theme.palette.dropyYellow[9]};
    ` : `
      color: ${theme.palette.dropyGray[6]};
    `)}
  `,
  IconPresentation: styled(IconMonitor)`
    width: auto;
    height: ${px(20)};
    ${({ isActive, theme }) => (isActive ? `
      color: ${theme.palette.dropyYellow[9]};
    ` : `
      color: ${theme.palette.dropyGray[6]};
    `)}
  `,
};

export default S;
