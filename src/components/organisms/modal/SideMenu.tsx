import { useCallback, useMemo, type FC } from 'react';
import { useModal } from '@/hooks/others/useModal';
import { useModalAwareNavigation } from '@/hooks/others/useModalAwareNavigation';
import SideModal from '@/components/organisms/modal/SideModal';
import type { LanguageOption, MenuLink } from '@/types';

const MENU_LINKS: MenuLink[] = [
  {
    id: 'menswear',
    label: 'Menswear',
    path: '/product-category/menswear-collection',
  },
  {
    id: 'womenswear',
    label: 'Womenswear',
    path: '/product-category/womenswear-collection',
  },
  {
    id: 'everest-limited',
    label: 'Everest Akke Limited',
    path: '/everest-akke-limited',
  },
  {
    id: 'akkeworld',
    label: 'Akkeworld',
    path: '/akkeworld',
  },
  {
    id: 'contacts',
    label: 'Contacts',
    path: '/contacts',
  },
];

const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'it', label: 'Italiano' },
  { code: 'en', label: 'English', active: true },
];

const SideMenu: FC = () => {
  const { modalState, toggleMenu } = useModal();
  const { navigate } = useModalAwareNavigation();

  const memoizedMenuLinks = useMemo(() => MENU_LINKS, []);
  const memoizedLanguageOptions = useMemo(() => LANGUAGE_OPTIONS, []);

  const handleClose = useCallback(() => {
    toggleMenu(false);
  }, [toggleMenu]);

  return (
    <SideModal
      isOpen={modalState.menuOpen}
      onClose={handleClose}
      className="!z-145 xl:hidden"
      width="97.5vw"
    >
      <nav
        className="h-full w-full overflow-auto bg-[#e1e1e1] pt-[100px] uppercase"
        role="navigation"
        aria-label="Main navigation menu"
        data-lenis-prevent
        style={{ scrollbarWidth: 'none' }}
      >
        <ul>
          {memoizedMenuLinks.map((link, index) => (
            <li key={index}>
              <div
                className="font-humane text-primary hover:text-secondary block cursor-pointer border-t border-t-[#868686]/10 px-[5vw] py-1 text-[4.4rem]"
                onClick={() => navigate(link.path)}
              >
                {link.label}
              </div>
            </li>
          ))}
        </ul>
        <div>
          <ul
            className="font-humane text-primary flex border-t border-b border-[#868686]/10 text-[3rem] uppercase"
            role="list"
            aria-label="Language selection"
          >
            {memoizedLanguageOptions.map((lang) => (
              <li key={lang.code}>
                <div
                  data-lang={lang.code}
                  className={`hover:text-secondary cursor-pointer px-[5vw] py-1 transition-colors duration-200 ${
                    lang.active ? 'text-secondary' : ''
                  }`}
                  aria-label={`Switch to ${lang.label}`}
                  aria-current={lang.active ? 'true' : 'false'}
                  onClick={() => navigate('/')}
                >
                  {lang.label}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </SideModal>
  );
};

export default SideMenu;
