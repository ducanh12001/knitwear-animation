import { useState, useEffect, type FC } from 'react';
import { openCookiePreferences } from '@/utils/cookieHandlers';
import { useCookieConsent } from '@/contexts/cookie/CookieConsentContext';
import ConsentScript from '@/components/others/CookieConsent/ConsentScript';

const AnalyticsExample: FC = () => {
  const { isAllowed } = useCookieConsent();
  const [analyticsStatus, setAnalyticsStatus] = useState<
    'enabled' | 'disabled'
  >('disabled');

  // Check analytics status
  useEffect(() => {
    setAnalyticsStatus(isAllowed('analytics') ? 'enabled' : 'disabled');
  }, [isAllowed]);

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold">Analytics Example</h2>

      <div className="mb-4">
        <p className="text-gray-700">
          This component demonstrates how to conditionally load scripts based on
          cookie consent.
        </p>
        <p className="mt-2 font-medium">
          Analytics status:{' '}
          <span
            className={
              analyticsStatus === 'enabled' ? 'text-green-600' : 'text-red-600'
            }
          >
            {analyticsStatus}
          </span>
        </p>
      </div>

      {isAllowed('analytics') ? (
        // This will only render the component for the Google Analytics script if analytics is allowed
        <>
          <ConsentScript
            category="analytics"
            src={`https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID`} // Replace with your GA ID
            attributes={{ async: true }}
            onLoad={() => console.log('Google Analytics script loaded')}
            onError={() => console.error('Failed to load Google Analytics')}
          />

          <p className="mb-4 text-green-600">
            Google Analytics is loaded and tracking page views.
          </p>
        </>
      ) : (
        <div className="mb-4 rounded bg-gray-100 p-4">
          <p className="mb-2 text-gray-700">
            Google Analytics is currently disabled. Enable analytics in cookie
            settings to allow tracking.
          </p>
          <button
            className="rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
            onClick={() => openCookiePreferences()}
          >
            Open Cookie Settings
          </button>
        </div>
      )}

      <div className="mt-6 border-t pt-4">
        <h3 className="mb-2 font-medium">
          How to use consent-based script loading:
        </h3>
        <pre className="overflow-x-auto rounded bg-gray-100 p-3 text-sm">
          {`// Example of how to use ConsentScript component:
<ConsentScript 
  category="analytics"
  src="https://example.com/script.js"
  attributes={{ async: true }}
  onLoad={() => console.log('Script loaded')}
/>

// You can also check consent directly:
const { isAllowed } = useCookieConsent();
if (isAllowed('analytics')) {
  // Execute analytics code
}`}
        </pre>
      </div>
    </div>
  );
};

export default AnalyticsExample;
