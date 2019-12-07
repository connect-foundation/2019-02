const dropZoneInitState = {
  isLoading: false,
  loadingMessage: '',
  isError: false,
  errorMessage: '',
  isDragOver: false,
  dropZoneEmoji: '👇',
};

const dropZoneReducer = (state, action) => {
  switch (action.type) {
    case 'setLoadingModal':
      return {
        ...state,
        isLoading: true,
        loadingMessage: action.payload,
      };
    case 'setErrorModal':
      return {
        ...state,
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
        dropZoneEmoji: action.payload,
      };
    default:
      throw new Error();
  }
};

export {
  dropZoneInitState,
  dropZoneReducer,
};
