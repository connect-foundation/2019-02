const useLogout = () => {
  const logOut = () => {
    window.localStorage.removeItem('DROPY_TOKEN');
    window.localStorage.removeItem('DROPY_ANONYMOUS_TOKEN');
    window.localStorage.removeItem('DROPY_USER_ID');
    window.localStorage.removeItem('DROPY_USERNAME');
    window.location.reload();
  };

  return logOut;
};

export default useLogout;
