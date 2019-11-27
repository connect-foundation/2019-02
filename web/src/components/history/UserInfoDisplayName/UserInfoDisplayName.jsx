import React from 'react';
import PropTypes from 'prop-types';
import S from './style';

const UserInfoDisplayName = (props) => {
  const { displayName } = props;

  return (
    <S.UserInfoDisplayName>
      {displayName}
    </S.UserInfoDisplayName>
  );
};

UserInfoDisplayName.propTypes = {
  displayName: PropTypes.string.isRequired,
};

export default UserInfoDisplayName;
