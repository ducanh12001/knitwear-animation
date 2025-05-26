import { forwardRef, useState } from 'react';
import type { ForwardedRef } from 'react';
import type {
  CookieCategory,
  CookiePreferences,
  KeyofCookiePreferences,
} from '@/types';
import CookieAccordion from '@/components/others/CookieConsent/CookieAccordion';

interface CookieModalProps {
  preferences: CookiePreferences;
  togglePreference: (key: KeyofCookiePreferences) => void;
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onSavePreferences: () => void;
  onClose: () => void;
  className?: string;
}

const CookieModal = forwardRef<HTMLDivElement, CookieModalProps>(
  (
    {
      preferences,
      togglePreference,
      onAcceptAll,
      onRejectAll,
      onSavePreferences,
      onClose,
      className = '',
    },
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const [expandedSection, setExpandedSection] = useState<string | null>(null);
    const [showFullDescription, setShowFullDescription] =
      useState<boolean>(false);

    const toggleSection = (section: string) => {
      setExpandedSection(expandedSection === section ? null : section);
    };

    // Cookie categories with descriptions
    const categories: CookieCategory[] = [
      {
        id: 'necessary',
        title: 'Necessary',
        description:
          'Necessary cookies are required to enable the basic features of this site, such as providing secure log-in or adjusting your consent preferences. These cookies do not store any personally identifiable data.',
        cookies: [
          {
            name: 'cookieyes-consent',
            duration: '1 year',
            description:
              "CookieYes sets this cookie to remember users' consent preferences so that their preferences are respected on subsequent visits to this site. It does not collect or store any personal information about the site visitors.",
          },
        ],
        alwaysActive: true,
      },
      {
        id: 'functional',
        title: 'Functional',
        description:
          'Functional cookies help perform certain functionalities like sharing the content of the website on social media platforms, collecting feedback, and other third-party features.',
        cookies: [
          {
            name: 'wp-wpml_current_language',
            duration: 'session',
            description:
              'WordPress multilingual plugin sets this cookie to store the current language/language settings.',
          },
        ],
      },
      {
        id: 'analytics',
        title: 'Analytics',
        description:
          'Analytical cookies are used to understand how visitors interact with the website. These cookies help provide information on metrics such as the number of visitors, bounce rate, traffic source, etc.',
        cookies: [
          {
            name: '_ga',
            duration: '1 year 1 month 4 days',
            description:
              "Google Analytics sets this cookie to calculate visitor, session and campaign data and track site usage for the site's analytics report. The cookie stores information anonymously and assigns a randomly generated number to recognise unique visitors.",
          },
          {
            name: '_ga_*',
            duration: '1 year 1 month 4 days',
            description:
              'Google Analytics sets this cookie to store and count page views.',
          },
        ],
      },
      {
        id: 'performance',
        title: 'Performance',
        description:
          'Performance cookies are used to understand and analyze the key performance indexes of the website which helps in delivering a better user experience for the visitors.',
        cookies: [],
      },
      {
        id: 'advertisement',
        title: 'Advertisement',
        description:
          'Advertisement cookies are used to provide visitors with customized advertisements based on the pages you visited previously and to analyze the effectiveness of the ad campaigns.',
        cookies: [],
      },
    ];

    return (
      <div
        ref={ref}
        className={`cky-modal fixed top-1/2 left-1/2 z-999 mx-auto box-border w-full max-w-[calc(100%-16px)] -translate-x-1/2 translate-y-full rounded-lg lg:w-[845px] lg:max-w-full ${className}`}
      >
        <div className="relative flex max-h-[80vh] w-full flex-col overflow-hidden rounded-lg border border-[#F4F4F4] bg-white text-[#1d1d1d] shadow-xl">
          <div className="flex items-center justify-between border-b border-inherit px-6 py-5.5">
            <h2
              className="text-xl font-bold text-[#1d1d1d]"
              style={{ wordBreak: 'break-word' }}
            >
              Customize Consent Preferences
            </h2>
            <button
              className="m-0 h-auto w-auto cursor-pointer bg-transparent align-middle text-gray-600 hover:text-gray-800"
              onClick={onClose}
              aria-label="Close"
            >
              <img
                src="https://cdn-cookieyes.com/assets/images/close.svg"
                alt="Close"
                className="m-0 h-3 w-3"
              />
            </button>
          </div>

          <div
            className="box-border flex-1 overflow-auto border-inherit px-6"
            data-lenis-prevent
          >
            <div className="py-3 text-[0.8rem] text-[#1d1d1d]">
              <p>
                We use cookies to help you navigate efficiently and perform
                certain functions. You will find detailed information about all
                cookies under each consent category below.
              </p>

              {showFullDescription ? (
                <>
                  <p>
                    The cookies that are categorized as "Necessary" are stored
                    on your browser as they are essential for enabling the basic
                    functionalities of the site.
                  </p>
                  <p>
                    We also use third-party cookies that help us analyze and
                    understand how you use this website. These cookies will be
                    stored in your browser only with your consent.
                  </p>
                  <p>
                    You have the option to opt-out of these cookies. But opting
                    out of some of these cookies may affect your browsing
                    experience.
                  </p>
                  <button
                    className="cursor-pointer whitespace-nowrap text-blue-600 hover:underline"
                    onClick={() => setShowFullDescription(false)}
                    aria-label="Show less"
                  >
                    Show less
                  </button>
                </>
              ) : (
                <p>
                  The cookies that are categorized as "Necessary" are stored on
                  your browser as they are essential for enabling the basic
                  functionalities of the site. ...
                  <button
                    className="cursor-pointer whitespace-nowrap text-[#FD7453] hover:underline"
                    onClick={() => setShowFullDescription(true)}
                    aria-label="Show more"
                  >
                    Show more
                  </button>
                </p>
              )}
            </div>

            <div className="pt-1 pb-3 text-[14px] text-[#1d1d1d]">
              <p>
                For more information on how Google's third-party cookies operate
                and handle your data, see:{' '}
                <a
                  href="https://business.safety.google/privacy"
                  className="text-blue-600 !underline"
                  target="_blank"
                  rel="noopener"
                  aria-label="Google Privacy Policy"
                >
                  Google Privacy Policy
                </a>
              </p>
            </div>

            <div className="border border-inherit" />

            <div className="mb-[10px] border-inherit">
              {categories.map((category) => (
                <CookieAccordion
                  key={category.id}
                  category={category}
                  isExpanded={expandedSection === category.id}
                  isActive={preferences[category.id]}
                  onToggle={() => toggleSection(category.id)}
                  onTogglePreference={() => togglePreference(category.id)}
                />
              ))}
            </div>
          </div>

          <div className="relative border-inherit">
            <div className="flex flex-wrap items-center justify-center gap-2 border-t border-inherit px-6 py-5.5">
              <button
                className="flex-auto cursor-pointer rounded-[25px] border border-[#302F35] p-2 text-[0.8rem] font-medium text-[#302F35] transition-colors hover:bg-gray-100"
                style={{ overflowWrap: 'break-word' }}
                onClick={onRejectAll}
              >
                Reject All
              </button>

              <button
                className="flex-auto cursor-pointer rounded-[25px] border border-[#302F35] p-2 text-[0.8rem] font-medium text-[#302F35] transition-colors hover:bg-gray-100"
                style={{ overflowWrap: 'break-word' }}
                onClick={onSavePreferences}
              >
                Save My Preferences
              </button>

              <button
                className="flex-auto cursor-pointer rounded-[25px] border border-[#302F35] bg-[#302F35] p-2 text-[0.8rem] font-medium text-white transition-colors hover:bg-gray-700"
                style={{ overflowWrap: 'break-word' }}
                onClick={onAcceptAll}
              >
                Accept All
              </button>
            </div>

            <div className="flex items-center justify-end bg-[#EDEDED] px-6 py-2 text-right text-[12px] text-[#293C5B]">
              <span>Powered by</span>
              <a
                href="https://www.cookieyes.com/product/cookie-consent"
                target="_blank"
                rel="noopener"
                className="ml-1"
              >
                <img
                  src="https://cdn-cookieyes.com/assets/images/poweredbtcky.svg"
                  alt="Cookieyes logo"
                  className="h-3 w-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export default CookieModal;
