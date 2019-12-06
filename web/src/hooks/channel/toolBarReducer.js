const toolBarInitState = {
  isPenToolActive: false,
};

const toolBarReducer = (state, action) => {
  switch (action.type) {
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
