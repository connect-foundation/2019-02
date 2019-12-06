import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { px } from '@/styles/themeUtil';

export default {
  SmallButton: styled(Button)`
    height: ${px(32)};
  `,
};
