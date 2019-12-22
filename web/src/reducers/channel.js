import {
  CHANNEL_REDUCER_SET_ISCHAT,
  CHANNEL_REDUCER_SET_ISSYNC,
  CHANNEL_REDUCER_SET_PAGE,
  CHANNEL_REDUCER_TOOLBAR_ACTIVE,
  CHANNEL_REDUCER_TOOLBAR_INACTIVE,
  CHANNEL_REDUCER_PEN_TOOL_ACTIVE,
  CHANNEL_REDUCER_PEN_TOOL_INACTIVE,
  CHANNEL_REDUCER_SET_ERASER_ACTIVE,
  CAHNNEL_REDUCER_SET_ERASER_INACTIVE,
} from '@/constants';

const initialChannelState = {
  isChat: false,
  isSync: true,
  page: 0,
  isToolBarActive: false,
  isPenToolActive: false,
  isEraserToolActive: false,
};

const channelReducer = (state, action) => {
  switch (action.type) {
    case CHANNEL_REDUCER_SET_ISCHAT:
      return {
        ...state,
        isChat: action.payload.isChat,
      };
    case CHANNEL_REDUCER_SET_ISSYNC:
      return {
        ...state,
        isSync: action.payload.isSync,
      };
    case CHANNEL_REDUCER_SET_PAGE:
      return {
        ...state,
        page: action.payload.page,
      };
    case CHANNEL_REDUCER_TOOLBAR_ACTIVE:
      return {
        ...state,
        isToolBarActive: true,
      };
    case CHANNEL_REDUCER_TOOLBAR_INACTIVE:
      return {
        ...state,
        isToolBarActive: false,
        isPenToolActive: false,
      };
    case CHANNEL_REDUCER_PEN_TOOL_ACTIVE:
      return {
        ...state,
        isPenToolActive: true,
      };
    case CHANNEL_REDUCER_PEN_TOOL_INACTIVE:
      return {
        ...state,
        isPenToolActive: false,
      };
    case CHANNEL_REDUCER_SET_ERASER_ACTIVE:
      return {
        ...state,
        isEraserToolActive: true,
      };
    case CAHNNEL_REDUCER_SET_ERASER_INACTIVE:
      return {
        ...state,
        isEraserToolActive: false,
      };
    default:
      return state;
  }
};

export {
  channelReducer,
  initialChannelState,
};
