import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const RESET_CANVAS_HISTORY = gql`
  mutation ResetCanvasHistory($channelId: String!, $page: Int!) {
    resetCanvasHistory(channelId: $channelId, page: $page) {
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

const useResetCanavsHistory = () => {
  const [resetCanavsHistory] = useMutation(RESET_CANVAS_HISTORY);

  return { mutate: resetCanavsHistory };
};

export default useResetCanavsHistory;
