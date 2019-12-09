import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Popover,
} from '@material-ui/core';
import LoginPopover from './LoginPopover';
import LogoutPopover from './LogoutPopover';
import { useGetUserStatus, useLogout } from '@/hooks';
import S from './style';

const Header = () => {
  const { isLoggedIn, displayName } = useGetUserStatus();
  const logOut = useLogout();
  const [anchorEl, setAnchorEl] = useState(null);
  const openPopover = (event) => setAnchorEl(event.currentTarget);
  const closePopover = () => setAnchorEl(null);
  const isOpened = Boolean(anchorEl);
  const id = isOpened ? 'simple-popover' : undefined;

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <a href="/">
          <Typography variant="h1">dropy</Typography>
        </a>
        <S.User>
          {isLoggedIn ? (
            <S.UserInfo aria-describedby={id} onClick={openPopover}>
              <S.Profile />
              <S.UserName>{displayName}</S.UserName>
              <S.DownIcon />
            </S.UserInfo>
          ) : (
            <S.LoginBtn aria-describedby={id} onClick={openPopover}>로그인</S.LoginBtn>
          )}
        </S.User>
        <Popover
          id={id}
          open={isOpened}
          anchorEl={anchorEl}
          onClose={closePopover}
          onExited={() => isLoggedIn && logOut()}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {isLoggedIn
            ? <LogoutPopover onClickLogout={closePopover} />
            : <LoginPopover handleClose={closePopover} />}
        </Popover>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
