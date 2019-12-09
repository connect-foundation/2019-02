import React from 'react';
import PropTypes from 'prop-types';
import S from './style';

const PrivacyButton = (props) => {
  const { onClick } = props;

  return (
    <S.PrivacyLink to="/privacy-policy" onClick={onClick}>개인정보 처리방침 보기</S.PrivacyLink>
  );
};

PrivacyButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default PrivacyButton;
