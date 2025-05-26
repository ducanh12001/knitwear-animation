import { useState } from 'react';
import type { ModalContextType, ModalState, ProviderProps } from '@/types';
import ModalContext from '@/contexts/modal/ModalContext';

const ModalProvider = ({ children }: ProviderProps) => {
  const [modalState, setModalState] = useState<ModalState>({
    cartModalOpen: false,
    loginModalOpen: false,
    menuOpen: false,
  });

  const toggleCartModal = (value: boolean) => {
    setModalState((prev) => ({ ...prev, cartModalOpen: value }));
  };

  const toggleLoginModal = (value: boolean) => {
    setModalState((prev) => ({ ...prev, loginModalOpen: value }));
  };

  const toggleMenu = (value: boolean) => {
    setModalState((prev) => ({ ...prev, menuOpen: value }));
  };

  const contextValue: ModalContextType = {
    modalState,
    toggleCartModal,
    toggleLoginModal,
    toggleMenu,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
