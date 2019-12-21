import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';

const GET_CANVAS_HISTORY = gql`
  query GetCanvasHistory(
    $channelId: String!, 
    $page: Int!, 
    ) {
    getCanvasHistory(
      channelId: $channelId, 
      page: $page, 
      ) {
      id
      page
      history
      toolOptions {
        lineWidth
        lineCap
        lineColor
      }
    }
  } 
`;

const useGetCanvasHistory = (noCache) => {
  const queryOption = noCache ? { fetchPolicy: 'no-cache' } : undefined;
  const [getCanvasHistory, {
    loading,
    data,
    called,
  }] = useLazyQuery(GET_CANVAS_HISTORY, queryOption);
  const result = data
    ? {
      page: data.getCanvasHistory.page,
      history: data.getCanvasHistory.history,
      toolOptions: data.getCanvasHistory.toolOptions,
    } : { page: null, history: null, toolOptions: null };

  return {
    query: getCanvasHistory,
    data: result,
    loading,
    called,
  };
};

export default useGetCanvasHistory;
