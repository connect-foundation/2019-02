import React from 'react';
import PropTypes from 'prop-types';
import KakaoLogin from 'react-kakao-login';
import { authByKakao } from '@/apis';
import { useLogin } from '@/hooks';
import S from './style';

const KakaoButton = (props) => {
  const { handleClose } = props;
  const { mutate } = useLogin();
  const handleResponse = async ({ response }) => {
    const { token, user } = await authByKakao(response.access_token);

    if (token) {
      mutate({ variables: { token, displayName: user.displayname } });
    }
  };
  const handleFailure = (error) => {
    console.error(error);
  };

  return (
    <KakaoLogin
      jsKey={process.env.KAKAO_ID}
      render={({ onClick }) => (
        <S.KakaoLoginButton onClick={() => {
          handleClose();
          onClick();
        }}
        >
          Kakao Login
        </S.KakaoLoginButton>
      )}
      onSuccess={handleResponse}
      onFailure={handleFailure}
    />
  );
};

KakaoButton.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default KakaoButton;
