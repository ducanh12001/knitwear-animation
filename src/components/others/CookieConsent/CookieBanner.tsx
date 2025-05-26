import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';

interface CookieBannerProps {
  onCustomize: () => void;
  onAcceptAll: () => void;
  onRejectAll: () => void;
}

const CookieBanner = forwardRef<HTMLDivElement, CookieBannerProps>(
  ({ onCustomize, onAcceptAll, onRejectAll }, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div className="fixed bottom-5 left-5 z-50 max-w-md" ref={ref}>
        <div
          className="rounded-lg border border-gray-200 bg-white shadow-lg"
          tabIndex={0}
        >
          <div className="p-5">
            <h2 className="mb-2 text-xl font-semibold text-[#1d1d1d]">
              We value your privacy
            </h2>

            <div className="mb-4">
              <p className="text-sm text-[#1d1d1d]">
                We use cookies to enhance your browsing experience, serve
                personalized ads or content, and analyze our traffic. By
                clicking "Accept All", you consent to our use of cookies.
              </p>
            </div>

            <div className="flex flex-wrap justify-end gap-2">
              <button
                className="rounded-md border border-gray-800 px-4 py-2 text-sm font-medium text-[#1d1d1d] transition-colors hover:bg-gray-100"
                onClick={onCustomize}
              >
                Customize
              </button>

              <button
                className="rounded-md border border-gray-800 px-4 py-2 text-sm font-medium text-[#1d1d1d] transition-colors hover:bg-gray-100"
                onClick={onRejectAll}
              >
                Reject All
              </button>

              <button
                className="rounded-md border border-gray-800 bg-gray-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
                onClick={onAcceptAll}
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export default CookieBanner;
