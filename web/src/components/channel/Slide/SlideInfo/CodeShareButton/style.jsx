import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { px } from '@/styles/themeUtil';

export default {
  FlashWrapper: styled.div`
    position: relative;
  `,
  FlashMessage: styled.div`
    height: ${px(142)};
    color: red;
    background: white;
    border-radius: ${px(10)};
    border: ${px(1)} solid #ccc;
    position: absolute;
    top: ${px(0)};
    right: ${px(20)};
    padding: ${px(20)};
    display: flex;
    align-items: center;
    z-index: 888;
  `,
  SmallButton: styled(Button)`
    height: ${px(32)};
  `,
};
