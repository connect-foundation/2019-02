const toolBarInitState = {
  isToolBarActive: false,
  isPenToolActive: false,
};

const toolBarReducer = (state, action) => {
  switch (action.type) {
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
      throw new Error();
  }
};

export {
  toolBarInitState,
  toolBarReducer,
};
