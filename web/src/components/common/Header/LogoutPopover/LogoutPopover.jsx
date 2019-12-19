import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MenuItem, Popover } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useLogout } from '@/hooks';
import S from './style';

const LogoutPopover = (props) => {
  const {
    id,
    isOpened,
    anchorEl,
    onClose,
  } = props;
  const logOut = useLogout();
  const [isClickedLogout, setIsClickedLogout] = useState(false);
  const handleClickLogout = () => {
    setIsClickedLogout(true);
    onClose();
  };

  return (
    <Popover
      id={id}
      open={isOpened}
      anchorEl={anchorEl}
      onClose={onClose}
      onExited={() => isClickedLogout && logOut()}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <S.PopoverWrapper>
        <Link to="/mypage">
          <MenuItem onClick={onClose}>마이페이지</MenuItem>
        </Link>
        <MenuItem onClick={handleClickLogout}>로그아웃</MenuItem>
        <Link to="/help">
          <MenuItem onClick={onClose}>도움말</MenuItem>
        </Link>
      </S.PopoverWrapper>
    </Popover>
  );
};

LogoutPopover.propTypes = {
  id: PropTypes.string,
  isOpened: PropTypes.bool.isRequired,
  anchorEl: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default LogoutPopover;
