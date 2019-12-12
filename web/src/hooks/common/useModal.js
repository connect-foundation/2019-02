import { useState } from 'react';

const useModal = (defaultValue = false) => {
  const [isModalOpened, setIsModalOpened] = useState(defaultValue);
  const closeModal = () => setIsModalOpened(false);
  const openModal = () => setIsModalOpened(true);
  const toggleModal = () => setIsModalOpened(!isModalOpened);

  return {
    isModalOpened,
    openModal,
    closeModal,
    toggleModal,
  };
};

export default useModal;
