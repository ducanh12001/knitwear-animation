import { useCallback } from 'react';
import { useNavigate, type NavigateOptions, type To } from 'react-router';
import { useModal } from '@/hooks/useModal';

export const useModalAwareNavigation = () => {
  const navigate = useNavigate();
  const { modalState, toggleMenu, toggleCartModal, toggleLoginModal } =
    useModal();

  const hasOpenModals = useCallback(() => {
    return (
      modalState.menuOpen ||
      modalState.cartModalOpen ||
      modalState.loginModalOpen
    );
  }, [modalState]);

  const closeAllModals = useCallback(() => {
    return new Promise<void>((resolve) => {
      if (!hasOpenModals()) {
        resolve();
        return;
      }

      if (modalState.menuOpen) toggleMenu(false);
      if (modalState.cartModalOpen) toggleCartModal(false);
      if (modalState.loginModalOpen) toggleLoginModal(false);

      setTimeout(() => {
        resolve();
      }, 700);
    });
  }, [
    modalState,
    toggleMenu,
    toggleCartModal,
    toggleLoginModal,
    hasOpenModals,
  ]);

  const navigateWithModalCheck = useCallback(
    async (to: To, options?: NavigateOptions) => {
      if (hasOpenModals()) {
        await closeAllModals();
      }
      navigate(to, options);
    },
    [navigate, hasOpenModals, closeAllModals],
  );

  return {
    navigate: navigateWithModalCheck,
    hasOpenModals: hasOpenModals(),
    closeAllModals,
  };
};
