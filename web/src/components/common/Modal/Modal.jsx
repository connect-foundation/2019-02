import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import S from './style';

const Modal = (props) => {
  const { children, isShown } = props;
  const modalRef = useRef(null);
  const showModal = () => {
    modalRef.current.style.display = 'block';
    window.requestAnimationFrame(() => {
      modalRef.current.style.opacity = 1;
    });
  };
  const hideModal = () => {
    modalRef.current.style.opacity = 0;
  };

  useEffect(() => {
    const afterModalHidden = () => {
      if (+modalRef.current.style.opacity === 0) modalRef.current.style.display = 'none';
    };
    modalRef.current.addEventListener('transitionend', afterModalHidden);

    return () => {
      modalRef.current.removeEventListener('transitionend', afterModalHidden);
    };
  }, []);

  useEffect(() => {
    if (isShown) showModal();
    else hideModal();
  }, [isShown]);

  return (
    <S.Modal ref={modalRef}>
      <S.ModalContent>{children}</S.ModalContent>
    </S.Modal>
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  isShown: PropTypes.bool,
};

export default Modal;
