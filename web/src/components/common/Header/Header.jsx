import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import LoginPopover from './LoginPopover';
import LogoutPopover from './LogoutPopover';
import { useGetUserStatus } from '@/hooks';
import S from './style';

const Header = () => {
  const { isLoggedIn, displayName } = useGetUserStatus();
  const [anchorEl, setAnchorEl] = useState(null);
  const openPopover = (event) => setAnchorEl(event.currentTarget);
  const isOpened = !!anchorEl;
  const id = 'simple-popover';

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
        {isLoggedIn ? (
          <LogoutPopover
            id={id}
            isOpened={isOpened}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
          />
        ) : (
          <LoginPopover
            id={id}
            isOpened={isOpened}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
          />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
