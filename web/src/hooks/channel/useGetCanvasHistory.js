import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';

const GET_CANVAS_HISTORY = gql`
  query GetCanvasHistory(
    $channelId: String!, 
    $page: Int!, 
    $toolOptions: ToolOptionsInput,
    ) {
    getCanvasHistory(
      channelId: $channelId, 
      page: $page, 
      toolOptions: $toolOptions,
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

const useGetCanvasHistory = () => {
  const [getCanvasHistory, { loading, data }] = useLazyQuery(GET_CANVAS_HISTORY);
  const result = data
    ? {
      page: data.getCanvasHistory.page,
      history: data.getCanvasHistory.history,
      toolOptions: data.getCanvasHistory.toolOptions,
    } : { page: null, history: null, toolOptions: null };

  return { query: getCanvasHistory, data: result, loading };
};

export default useGetCanvasHistory;
