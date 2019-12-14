import React from 'react';
import LoginNaver from '@/utils/naverLogin';

const Login = () => (
  <LoginNaver
    clientId={process.env.NAVER_ID}
    callbackUrl=""
    render={() => (
      <></>
    )}
    onSuccess={null}
    onFailure={null}
  />
);

export default Login;
