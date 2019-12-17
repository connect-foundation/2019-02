const dropModalInitState = {
  isLoading: false,
  loadingMessage: '',
  isError: false,
  errorMessage: '',
  isDragOver: false,
  dropModalEmoji: '👇',
};

const dropModalReducer = (state, action) => {
  switch (action.type) {
    case 'setLoadingModal':
      return {
        ...state,
        isLoading: true,
        loadingMessage: action.payload,
      };
    case 'closeLoadingModal':
      return {
        ...state,
        isLoading: false,
      };
    case 'setErrorModal':
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case 'setDragOver':
      return {
        ...state,
        isDragOver: !state.isDragOver,
      };
    case 'setDropZoneEmoji':
      return {
        ...state,
        dropModalEmoji: action.payload,
      };
    default:
      throw new Error();
  }
};

export {
  dropModalInitState,
  dropModalReducer,
};
