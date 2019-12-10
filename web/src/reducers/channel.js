export const initialChannelState = {
  isChat: false,
};

const channelReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ISCHAT':
      return {
        ...state,
        isChat: action.payload.isChat,
      };
    default:
      return state;
  }
};

export default channelReducer;
