import styled from 'styled-components';
import { px, colorGray, colorLightMain } from '@/styles';

export default {
  DropText: styled.div.attrs({ type: 'div' })`    color: ${(props) => (
    props.fontColor === 'default'
      ? colorGray(0)
      : colorLightMain())};
    white-space: nowrap;
    text-align: center;
    font-weight: 300;
    font-size: ${px(76)};
    margin-bottom: ${px(160)};
    color: ${(props) => (
    props.fontColor === 'default'
      ? colorGray(0)
      : colorLightMain())};
  `,
};
