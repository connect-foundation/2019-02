import React from 'react';
import PropTypes from 'prop-types';
import S from './style';

const UserInfoUserId = (props) => {
  const { userId } = props;

  return (
    <S.UserInfoUserId>
      {userId}
    </S.UserInfoUserId>
  );
};

UserInfoUserId.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default UserInfoUserId;
