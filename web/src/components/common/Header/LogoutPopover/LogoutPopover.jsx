import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useLogout } from '@/hooks';
import S from './style';

const LogoutPopover = (props) => {
  const { handleClose } = props;
  const logOut = useLogout();
  const handleLogOut = () => {
    handleClose();
    logOut();
  };

  return (
    <S.PopoverWrapper>
      <Link to="/mypage">
        <MenuItem onClick={handleClose}>프로필</MenuItem>
      </Link>
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
