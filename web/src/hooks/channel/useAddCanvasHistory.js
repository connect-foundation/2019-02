import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const ADD_CANVAS_HISTORY = gql`
  mutation addCanvasHistory(
    $channelId: String!,
    $page: Int!,
    $history: [Coordinate],
    $toolOptions: ToolOptionsInput
    ) {
    addCanvasHistory(
      channelId: $channelId,
      page: $page,
      history: $history,
      toolOptions: $toolOptions
    ) {
      channelId
    }
  }
`;

const useAddCanvasHistory = () => {
  const [addCanvasHistory] = useMutation(ADD_CANVAS_HISTORY);

  return { mutate: addCanvasHistory };
};

export default useAddCanvasHistory;
