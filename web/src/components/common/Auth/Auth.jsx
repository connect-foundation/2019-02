import { useEffect } from 'react';
import { authByAnonymous } from '@/apis';
import { useLogin, useGetUserStatus } from '@/hooks';

const Auth = (props) => {
  const { render } = props;
  const logIn = useLogin();
  const userStatus = useGetUserStatus();

  useEffect(() => {
    if (userStatus.token) return;
    authByAnonymous().then(({ token, user }) => logIn({
      token,
      userId: user.userId,
      isAnonymous: true,
    }));
  }, [userStatus]);

  if (!userStatus.token) return null;

  return render({ user: userStatus });
};

export default Auth;
