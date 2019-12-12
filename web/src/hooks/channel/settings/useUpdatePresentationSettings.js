import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const UPDATE_PRESENTATION_SETTINGS = gql`
  mutation updatePresentationSettings($channelId: String!, $channelName: String!) {
    updateChannelName(channelId: $channelId, channelName: $channelName) {
      channelName
    }
  }
`;

const useUpdatePresentationSettings = () => {
  const [updatePresentationSettings, result] = useMutation(UPDATE_PRESENTATION_SETTINGS);
  const data = result.data ? result.data.updateChannelName : null;

  return { mutate: updatePresentationSettings, data };
};

export default useUpdatePresentationSettings;
