import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useCookieConsent } from "@/contexts/CookieConsentContext";
import { applyAllCookiePreferences } from "@/utils/cookieHandlers";
import CookieBanner from "./CookieBanner";
import CookieModal from "./CookieModal";
import RevisitButton from "./RevisitButton";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const bannerRef = useRef(null);
  const modalRef = useRef(null);

  const {
    preferences,
    hasConsent,
    acceptAll,
    rejectAll,
    updatePreference,
    saveCurrentPreferences,
  } = useCookieConsent();

  useEffect(() => {
    // Show banner if no consent has been given yet
    if (!hasConsent) {
      setShowBanner(true);
      gsap.fromTo(
        bannerRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
      );
    }

    // Listen for events to open preferences
    const handleOpenPreferences = () => {
      openModal();
    };

    window.addEventListener("openCookiePreferences", handleOpenPreferences);

    return () => {
      window.removeEventListener(
        "openCookiePreferences",
        handleOpenPreferences,
      );
    };
  }, [hasConsent]);

  // Apply cookie preferences whenever they change
  useEffect(() => {
    if (hasConsent) {
      applyAllCookiePreferences(preferences);
    }
  }, [preferences, hasConsent]);

  const openModal = () => {
    setShowModal(true);
    setShowBanner(false);

    // Animation for modal
    gsap.fromTo(
      modalRef.current,
      { translateY: "100%", opacity: 0 },
      {
        translateY: "-50%",
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      },
    );
  };

  const closeModal = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        setShowModal(false);
      },
    });
  };

  const closeBanner = () => {
    gsap.to(bannerRef.current, {
      y: 100,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => setShowBanner(false),
    });
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

  const handleTogglePreference = (key) => {
    updatePreference(key, !preferences[key]);
  };

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
        className={`fixed top-0 left-0 z-999 h-full w-full bg-black/40 ${showModal ? "block" : "hidden"}`}
      />
      <CookieModal
        ref={modalRef}
        preferences={preferences}
        togglePreference={handleTogglePreference}
        onAcceptAll={handleAcceptAll}
        onRejectAll={handleRejectAll}
        onSavePreferences={handleSavePreferences}
        onClose={closeModal}
      />

      {hasConsent && !showBanner && !showModal && (
        <RevisitButton onClick={openModal} />
      )}
    </>
  );
};

export default CookieConsent;
