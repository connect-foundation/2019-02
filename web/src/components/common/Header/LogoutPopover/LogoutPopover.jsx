import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import S from './style';

const LogoutPopover = (props) => {
  const {
    onClickLogout,
  } = props;

  return (
    <S.PopoverWrapper>
      <Link to="/mypage">
        <MenuItem>프로필</MenuItem>
      </Link>
      <MenuItem onClick={onClickLogout}>
        로그아웃
      </MenuItem>
      <MenuItem>
        도움말
      </MenuItem>
    </S.PopoverWrapper>
  );
};

LogoutPopover.propTypes = {
  onClickLogout: PropTypes.func.isRequired,
};

export default LogoutPopover;
