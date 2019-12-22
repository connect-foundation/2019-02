import {
  MAIN_REDUCER_SET_LOADING_MODAL,
  MAIN_REDUCER_CLOSE_LOADING_MODAL,
  DROP_MODAL_DEFAULT_DROP_EMOJI,
  MAIN_REDUCER_SET_ERROR_MODAL,
  MAIN_REDUCER_SET_DRAG_OVER,
  MAIN_REDUCER_SET_DROP_ZONE_EMOJI,
} from '@/constants';

const dropModalInitState = {
  isLoading: false,
  loadingMessage: '',
  isError: false,
  errorMessage: '',
  isDragOver: false,
  dropModalEmoji: DROP_MODAL_DEFAULT_DROP_EMOJI,
};

const dropModalReducer = (state, action) => {
  switch (action.type) {
    case MAIN_REDUCER_SET_LOADING_MODAL:
      return {
        ...state,
        isLoading: true,
        loadingMessage: action.payload,
      };
    case MAIN_REDUCER_CLOSE_LOADING_MODAL:
      return {
        ...state,
        isLoading: false,
      };
    case MAIN_REDUCER_SET_ERROR_MODAL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case MAIN_REDUCER_SET_DRAG_OVER:
      return {
        ...state,
        isDragOver: !state.isDragOver,
      };
    case MAIN_REDUCER_SET_DROP_ZONE_EMOJI:
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
