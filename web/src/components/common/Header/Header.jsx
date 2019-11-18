import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {
  AppBar, Toolbar, Typography, Popover,
} from '@material-ui/core';
import LoginPopover from './LoginPopover';
import LogoutPopover from './LogoutPopover';
import S from './style';

const GET_AUTH = gql`
query Auth {
  authentication @client {
    isLoggedIn
    displayName
  }
}
`;

const Header = () => {
  const { data: { authentication } } = useQuery(GET_AUTH);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const isOpened = Boolean(anchorEl);
  const id = isOpened ? 'simple-popover' : undefined;

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <Typography variant="h1">
          dropy
        </Typography>
        <S.User>
          {authentication.isLoggedIn ? (
            <S.UserInfo
              aria-describedby={id}
              onClick={handleClick}
            >
              <S.Profile />
              <S.UserName>
                {authentication.displayName}
              </S.UserName>
              <S.DownIcon />
            </S.UserInfo>
          ) : (
            <S.LoginBtn
              aria-describedby={id}
              onClick={handleClick}
            >
              로그인
            </S.LoginBtn>
          )}
        </S.User>
        <Popover
          id={id}
          open={isOpened}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {authentication.isLoggedIn
            ? <LogoutPopover handleClose={handleClose} />
            : <LoginPopover handleClose={handleClose} />}
        </Popover>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
