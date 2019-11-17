import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from '@material-ui/core';
import { useLogout } from '@/hooks';
import S from './style';

const LogoutPopover = (props) => {
  const { handleClose } = props;
  const { mutate } = useLogout();
  const handleLogOut = () => {
    handleClose();
    mutate();
  };

  return (
    <S.PopoverWrapper>
      <MenuItem onClick={handleClose}>
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
