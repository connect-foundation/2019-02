const initialChannelState = {
  isChat: false,
  isToolBarActive: false,
  isPenToolActive: false,
  canvasSize: {},
  storedCanvasUrl: '',
  isSync: true,
  page: 0,
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

    case 'SET_ISSYNC':
      return {
        ...state,
        isSync: action.payload.isSync,
      };
    case 'SET_PAGE':
      return {
        ...state,
        page: action.payload.page,
      };
    default:
      return state;
  }
};

export {
  channelReducer,
  initialChannelState,
};
