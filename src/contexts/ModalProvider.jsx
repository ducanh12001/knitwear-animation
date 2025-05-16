import { useState } from "react";
import ModalContext from "./ModalContext";

export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    cartModalOpen: false,
    loginModalOpen: false,
    menuOpen: false,
  });

  const toggleCartModal = (value) => {
    setModalState((prev) => ({ ...prev, cartModalOpen: value }));
  };

  const toggleLoginModal = (value) => {
    setModalState((prev) => ({ ...prev, loginModalOpen: value }));
  };

  const toggleMenu = (value) => {
    setModalState((prev) => ({ ...prev, menuOpen: value }));
  };

  return (
    <ModalContext.Provider
      value={{
        modalState,
        toggleCartModal,
        toggleLoginModal,
        toggleMenu,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
