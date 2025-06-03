export interface ModalState {
  cartModalOpen: boolean;
  loginModalOpen: boolean;
  menuOpen: boolean;
}

export interface ModalContextType {
  modalState: ModalState;
  toggleCartModal: (value: boolean) => void;
  toggleLoginModal: (value: boolean) => void;
  toggleMenu: (value: boolean) => void;
}

export type TabType = 'login' | 'signup';
