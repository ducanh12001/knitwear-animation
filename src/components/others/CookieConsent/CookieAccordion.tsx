import type { FC } from 'react';
import type { CookieCategory } from '@/types';
import AnimatedToggle from '@/components/others/CookieConsent/AnimatedToggle';

interface CookieAccordionProps {
  category: CookieCategory;
  isExpanded: boolean;
  isActive: boolean;
  onToggle: () => void;
  onTogglePreference: () => void;
}

const CookieAccordion: FC<CookieAccordionProps> = ({
  category,
  isExpanded,
  isActive,
  onToggle,
  onTogglePreference,
}) => {
  return (
    <div className="overflow-hidden border-b border-inherit last:border-0">
      <div className="mt-[10px] flex">
        <div className="relative mr-5.5 cursor-pointer" onClick={onToggle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`text-primary absolute top-2 h-4 w-4 transition-all duration-200 ease-in-out ${isExpanded ? 'rotate-90' : 'rotate-0'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>

        <div className="w-full cursor-pointer" onClick={onToggle}>
          <div className="flex items-center justify-between">
            <button
              className="bg-transparent text-[0.8rem] font-bold"
              aria-expanded={isExpanded}
              aria-label={category.title}
            >
              {category.title}
            </button>

            {category.alwaysActive ? (
              <span className="text-[0.8rem] font-semibold text-green-600">
                Always Active
              </span>
            ) : (
              <AnimatedToggle
                id={`toggle-${category.id}`}
                isChecked={isActive}
                onChange={onTogglePreference}
                disabled={category.alwaysActive}
              />
            )}
          </div>

          <p className="mt-[10px] mb-4 text-[0.8rem]">{category.description}</p>
        </div>
      </div>

      <div
        className={`mb-4 overflow-hidden px-5.5 transition-all duration-200 ease-in-out ${isExpanded ? 'block h-auto' : 'hidden h-0'}`}
      >
        <div className="rounded-[6px] bg-[#f4f4f4] px-[10px] py-[15px] text-[12px] text-[#212121]">
          {category.cookies && category.cookies.length > 0 ? (
            category.cookies.map((cookie, index) => (
              <div key={index}>
                <dl className="grid grid-cols-3 gap-2">
                  <dt className="font-semibold">Cookie</dt>
                  <dd className="col-span-2">{cookie.name}</dd>

                  <dt className="font-semibold">Duration</dt>
                  <dd className="col-span-2">{cookie.duration}</dd>

                  <dt className="font-semibold">Description</dt>
                  <dd className="col-span-2">{cookie.description}</dd>
                </dl>
              </div>
            ))
          ) : (
            <p className="py-2 text-sm text-gray-600">No cookies to display.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookieAccordion;
