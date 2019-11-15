import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { MenuItem } from '@material-ui/core';
import gql from 'graphql-tag';

const LOGOUT = gql`
  mutation LogOut($token: String!) {
    logOut(token: $token) @client
  }
`;

const LogoutPopover = (props) => {
  const { handleClose } = props;
  const [logOut] = useMutation(LOGOUT);
  const handleLogOut = () => {
    handleClose();
    logOut();
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

const S = {
  PopoverWrapper: styled.div`
    width:150px;
    padding:10px 0;
  `,
};

LogoutPopover.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default LogoutPopover;
