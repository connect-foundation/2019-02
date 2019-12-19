import styled from 'styled-components';
import { px } from '@/styles';
import { SLIDE_STATUS_HEIGHT, SLIDE_INFO_HEIGHT } from '@/constants';

export default {
  SlideViewer: styled.div`
    position: relative;
    width: 94%;
    height: calc(100% - ${px(SLIDE_INFO_HEIGHT + SLIDE_STATUS_HEIGHT)});
    margin: 0 auto;
  `,
};
