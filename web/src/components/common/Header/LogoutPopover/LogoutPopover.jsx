import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { useLogout } from '@/hooks';
import S from './style';

const LogoutPopover = (props) => {
  const { handleClose } = props;
  const { mutate } = useLogout();
  const handleLogOut = () => {
    handleClose();
    mutate();
  };
  const setMyPage = () => <Redirect to="/mypage" />;

  return (
    <S.PopoverWrapper>
      <MenuItem onClick={setMyPage}>
        프로필
      </MenuItem>
      <MenuItem onClick={handleLogOut}>
        로그아웃
      </MenuItem>
      <MenuItem onClick={handleClose}>
        도움말
      </MenuItem>
    </S.PopoverWrapper>
  );
};

LogoutPopover.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default LogoutPopover;
