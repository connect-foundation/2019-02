const initialChannelState = {
  isChat: false,
  isToolBarActive: false,
  isPenToolActive: false,
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
    default:
      return state;
  }
};

export {
  channelReducer,
  initialChannelState,
};
