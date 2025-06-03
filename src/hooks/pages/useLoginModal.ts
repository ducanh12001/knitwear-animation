import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import type { TabType } from '@/types';

export const useLoginModal = () => {
  const [activeTab, setActiveTab] = useState<TabType>('login');
  const loginTitleRef = useRef<HTMLSpanElement>(null);
  const signupTitleRef = useRef<HTMLSpanElement>(null);
  const loginFormRef = useRef<HTMLFormElement>(null);
  const signupFormRef = useRef<HTMLFormElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP();

  const switchTab = contextSafe((targetTab: TabType) => {
    if (activeTab === targetTab) return;

    const currentTitleRef =
      activeTab === 'login' ? loginTitleRef : signupTitleRef;
    const currentFormRef = activeTab === 'login' ? loginFormRef : signupFormRef;
    const targetTitleRef =
      targetTab === 'login' ? loginTitleRef : signupTitleRef;
    const targetFormRef = targetTab === 'login' ? loginFormRef : signupFormRef;

    const tl = gsap.timeline({
      defaults: {
        ease: 'power2.inOut',
        duration: 0.2,
      },
      onComplete: () => setActiveTab(targetTab),
    });

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }

    tl.to([currentTitleRef.current, currentFormRef.current], {
      autoAlpha: 0,
      y: -20,
    })
      .set([currentTitleRef.current, currentFormRef.current], {
        display: 'none',
      })
      .set(targetTitleRef.current, {
        display: 'block',
        autoAlpha: 0,
        y: 20,
      })
      .set(targetFormRef.current, {
        display: 'flex',
        autoAlpha: 0,
        y: 20,
      })
      .to(targetTitleRef.current, {
        autoAlpha: 1,
        y: 0,
      })
      .to(
        targetFormRef.current,
        {
          autoAlpha: 1,
          y: 0,
        },
        `<+0.1`,
      );

    return tl;
  });

  return {
    activeTab,
    switchTab,
    refs: {
      loginTitleRef,
      signupTitleRef,
      loginFormRef,
      signupFormRef,
      scrollContainerRef,
    },
  };
};
