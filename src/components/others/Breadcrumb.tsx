import { type FC } from 'react';
import { Link } from 'react-router';

import { useBreadcrumb } from '@/utils/breadcrumbUtils';

interface BreadcrumbProps {
  textStyle: React.CSSProperties;
  isHomePage: boolean;
}

export const Breadcrumb: FC<BreadcrumbProps> = ({ textStyle, isHomePage }) => {
  const breadcrumbItems = useBreadcrumb();

  if (isHomePage) {
    return null;
  }

  return (
    <div className="breadcrumb relative hidden h-auto w-auto xl:block">
      <nav aria-label="Breadcrumb">
        <ul className="relative flex items-center justify-start gap-2">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              {item.path ? (
                <Link
                  to={item.path}
                  style={textStyle}
                  className="transition-opacity duration-200 hover:opacity-70"
                >
                  {item.label}
                </Link>
              ) : (
                <span style={textStyle} aria-current="page">
                  {item.label}
                </span>
              )}

              {index < breadcrumbItems.length - 1 && (
                <span className="separator" style={textStyle}>
                  /
                </span>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
