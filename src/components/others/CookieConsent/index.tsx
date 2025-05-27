import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useCookieConsent } from '@/contexts/cookie/CookieConsentContext';
import { applyAllCookiePreferences } from '@/utils/cookieHandlers';
import type { KeyofCookiePreferences } from '@/types';
import CookieBanner from '@/components/others/CookieConsent/CookieBanner';
import CookieModal from '@/components/others/CookieConsent/CookieModal';
import RevisitButton from '@/components/others/CookieConsent/RevisitButton';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const {
    preferences,
    hasConsent,
    isLoading,
    acceptAll,
    rejectAll,
    updatePreference,
    saveCurrentPreferences,
  } = useCookieConsent();

  useEffect(() => {
    if (isLoading) return;

    if (!initialized) {
      setInitialized(true);

      if (!hasConsent) {
        setShowBanner(true);

        requestAnimationFrame(() => {
          if (bannerRef.current) {
            gsap.fromTo(
              bannerRef.current,
              { y: 100, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
            );
          }
        });
      } else {
        console.log('Consent found:', preferences);
      }
    }

    // Listen for events to open preferences
    const handleOpenPreferences = () => {
      openModal();
    };

    window.addEventListener('openCookiePreferences', handleOpenPreferences);

    return () => {
      window.removeEventListener(
        'openCookiePreferences',
        handleOpenPreferences,
      );
    };
  }, [hasConsent, initialized, isLoading, preferences]);

  // Apply cookie preferences whenever they change
  useEffect(() => {
    if (hasConsent && !isLoading) {
      applyAllCookiePreferences(preferences);
    }
  }, [preferences, hasConsent, isLoading]);

  const openModal = () => {
    setShowModal(true);
    setShowBanner(false);

    // Animation for modal
    requestAnimationFrame(() => {
      if (modalRef.current) {
        gsap.fromTo(
          modalRef.current,
          { translateY: '100%', opacity: 0 },
          {
            translateY: '-50%',
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
          },
        );
      }
    });
  };

  const closeModal = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          setShowModal(false);
        },
      });
    } else {
      setShowModal(false);
    }
  };

  const closeBanner = () => {
    if (bannerRef.current) {
      gsap.to(bannerRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => setShowBanner(false),
      });
    } else {
      setShowBanner(false);
    }
  };

  const handleAcceptAll = () => {
    acceptAll();
    closeBanner();
    closeModal();
  };

  const handleRejectAll = () => {
    rejectAll();
    closeBanner();
    closeModal();
  };

  const handleSavePreferences = () => {
    saveCurrentPreferences();
    closeModal();
  };

  const handleTogglePreference = (key: KeyofCookiePreferences) => {
    updatePreference(key, !preferences[key]);
  };

  if (isLoading) {
    return null;
  }

  return (
    <>
      {showBanner && (
        <CookieBanner
          ref={bannerRef}
          onCustomize={openModal}
          onAcceptAll={handleAcceptAll}
          onRejectAll={handleRejectAll}
        />
      )}

      <div
        className={`fixed top-0 left-0 z-999 h-full w-full bg-black/40 ${showModal ? 'block' : 'hidden'}`}
      />

      <CookieModal
        ref={modalRef}
        preferences={preferences}
        togglePreference={handleTogglePreference}
        onAcceptAll={handleAcceptAll}
        onRejectAll={handleRejectAll}
        onSavePreferences={handleSavePreferences}
        onClose={closeModal}
        className={!showModal ? 'pointer-events-none' : ''}
      />

      {hasConsent && !showBanner && !showModal && (
        <RevisitButton onClick={openModal} />
      )}
    </>
  );
};

export default CookieConsent;
