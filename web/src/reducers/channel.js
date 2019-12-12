const initialChannelState = {
  isChat: false,
  isToolBarActive: false,
  isPenToolActive: false,
  canvasSize: {},
  storedCanvasUrl: '',
};

const channelReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ISCHAT':
      return {
        ...state,
        isChat: action.payload.isChat,
      };
    case 'toolBarActive':
      return {
        ...state,
        isToolBarActive: !state.isToolBarActive,
      };
    case 'penToolActive':
      return {
        ...state,
        isPenToolActive: !state.isPenToolActive,
      };
    case 'setCanvasSize':
      return {
        ...state,
        canvasSize: action.payload,
      };
    case 'setCanvasUrl':
      return {
        ...state,
        storedCanvasUrl: action.payload,
      };
    default:
      return state;
  }
};

export {
  channelReducer,
  initialChannelState,
};
