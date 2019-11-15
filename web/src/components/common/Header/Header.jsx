import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import styled from 'styled-components';
import {
  AppBar, Toolbar, Typography, Button, Popover,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LoginPopover from './LoginPopover/LoginPopover';
import LogoutPopover from './LogoutPopover/LogoutPopover';

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

const S = {
  User: styled.div`
    position:absolute;
    right:30px;
  `,
  LoginBtn: styled(Button)`
    span{
      color:${({ theme }) => theme.palette.dropyGray[6]};
      font-size:${({ theme }) => theme.typography.pxToRem(16)};
    }
  `,
  UserInfo: styled(Button)`
    display:flex;
    background-color: transparent;
  `,
  Profile: styled.div`
    width:36px;
    height:36px;
    border-radius:100%;
    background-color:${({ theme }) => theme.palette.dropyGray[4]};
    background-repeat:no-repeat;
    background-size:contain;
    background-image:url('data:image/jpeg;base64,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');
    margin-right:10px;
  `,
  UserName: styled.div`
    color:${({ theme }) => theme.palette.dropyGray[6]};
    font-size:${({ theme }) => theme.typography.pxToRem(16)};
    margin-right:10px;
`,
  DownIcon: styled(ExpandMoreIcon)`
    color:${({ theme }) => theme.palette.dropyGray[6]};
    font-size:${({ theme }) => theme.typography.pxToRem(16)};
  `,
};
export default Header;
