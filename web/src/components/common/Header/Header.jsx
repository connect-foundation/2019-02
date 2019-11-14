import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import styled from 'styled-components';
import {
  AppBar, Toolbar, Typography, Button, Popover,
} from '@material-ui/core';
import LoginPopover from './LoginPopover/LoginPopover';

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

  useEffect(() => {
    if (authentication.isLoggedIn) setAnchorEl(null);
  }, [authentication]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h1">
          dropy
        </Typography>
        <S.User>
          {authentication.isLoggedIn ? (
            <S.LoginBtn
              aria-describedby={id}
              onClick={handleClick}
            >
              {authentication.displayName}
            </S.LoginBtn>
          ) : (
            <S.LoginBtn
              aria-describedby={id}
              onClick={handleClick}
            >
              Login
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
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <LoginPopover />
        </Popover>
      </Toolbar>
    </AppBar>
  );
};

const S = {
  User: styled.div`
    position:absolute;
    right:30px;
  `,
  LoginBtn: styled(Button)`
    background-color: transparent;
    span{
      color:${({ theme }) => theme.palette.common.white};
      font-size:${({ theme }) => theme.typography.pxToRem(18)};
    }
  `,
};
export default Header;
