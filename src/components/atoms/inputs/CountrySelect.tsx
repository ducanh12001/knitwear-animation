import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { FieldValues } from 'react-hook-form';
import type { CountryOption, CountrySelectProps } from '@/types';

const FALLBACK_COUNTRIES: CountryOption[] = [
  { value: 'US', label: 'United States' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'FR', label: 'France' },
  { value: 'IT', label: 'Italy' },
  { value: 'VN', label: 'Vietnam' },
];

export const CountrySelect = <TFormData extends FieldValues = FieldValues>({
  name,
  id,
  onChange,
  register,
  validation = {},
  errors = {},
}: CountrySelectProps<TFormData>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCountries = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const response = await fetch(
          'https://restcountries.com/v3.1/all?fields=name,cca2',
        );

        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }

        const data = await response.json();

        const formattedCountries: CountryOption[] = data
          .map(
            (country: {
              name: { common: string; official: string };
              cca2: string;
            }) => ({
              value: country.cca2,
              label: country.name.common,
            }),
          )
          .sort((a: CountryOption, b: CountryOption) =>
            a.label.localeCompare(b.label),
          );

        setCountries(formattedCountries);
      } catch (error) {
        console.error('Error fetching countries:', error);
        setCountries(FALLBACK_COUNTRIES);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleSelect = (country: CountryOption): void => {
    setSelectedCountry(country.label);
    if (onChange) {
      onChange(country.value);
    }
    setIsOpen(false);
  };

  const filteredCountries = countries.filter((country) =>
    country.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    const dropdown = dropdownRef.current;
    if (!dropdown) return;

    let tween: gsap.core.Tween;

    if (isOpen) {
      gsap.set(dropdown, {
        height: 0,
        overflow: 'hidden',
        opacity: 0,
      });

      tween = gsap.to(dropdown, {
        height: '15rem',
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => {
          gsap.set(dropdown, { overflow: 'visible' });
        },
      });
    } else {
      gsap.set(dropdown, { overflow: 'hidden' });

      tween = gsap.to(dropdown, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    }

    return () => {
      if (tween) tween.kill();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as HTMLElement;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        !target.closest('.select--top')
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
  };

  return (
    <div className="custom--select relative h-auto w-full">
      <div
        className={`select--top relative box-border flex h-[48px] w-full cursor-pointer items-center justify-start rounded-[14px] bg-white px-[1rem] md:h-[5rem] md:rounded-[25px] md:px-[3rem] ${!selectedCountry ? 'unselected' : ''}`}
        onClick={handleDropdownClick}
      >
        <input
          type="hidden"
          id={id}
          {...(register ? register(name, validation) : {})}
        />
        <span className={`${isLoading ? 'text-gray-400' : ''}`}>
          {selectedCountry ||
            (isLoading ? 'Loading countries...' : 'Select country')}
        </span>
        <div
          className={`select--arrow absolute top-1/2 right-[1rem] h-[12px] w-[12px] -translate-y-1/2 ${isOpen ? 'rotate-0' : '-rotate-90'} bg-primary mask-[url('/src/assets/arrow.svg')] mask-no-repeat transition-transform duration-300 md:right-[2rem] md:h-4 md:w-4`}
        />
      </div>

      {errors[name] && (
        <div className="absolute bottom-[-1rem] left-0">
          <span className="leading-full text-secondary absolute bottom-0 left-0 text-xs whitespace-nowrap opacity-100 transition-all duration-300 ease-in-out">
            {errors[name].message as string}
          </span>
        </div>
      )}

      <div
        ref={dropdownRef}
        className="select--bottom absolute top-[calc(100%+0.5rem)] left-0 z-20 w-full rounded-[25px] bg-white"
        style={{
          height: 0,
          opacity: 0,
          overflow: 'hidden',
        }}
      >
        <div className="sel-inner relative box-border flex h-[15rem] w-full flex-col items-start justify-start gap-[0.75rem] border-0 p-[0.75rem]">
          <div className="search-on-select relative h-auto w-full">
            <input
              type="text"
              className="search-on-select-input text-primary relative box-border h-[3rem] w-full rounded-[15px] border-0 bg-[#e1e1e1] px-[2rem] py-4 leading-[1rem] outline-none"
              placeholder="Search"
              value={searchTerm}
              onChange={handleInputChange}
              onClick={handleSearchClick}
            />
          </div>
          <div
            className="select--list relative h-[11.25rem] w-full overflow-y-auto"
            data-lenis-prevent
            style={{ scrollbarWidth: 'none' }}
            onClick={handleSearchClick}
          >
            {isLoading ? (
              <div className="flex h-full w-full items-center justify-center">
                <span className="text-gray-500">Loading...</span>
              </div>
            ) : filteredCountries.length > 0 ? (
              <div className="relative flex h-auto w-full flex-col items-start justify-start">
                {filteredCountries.map((country) => (
                  <span
                    key={country.value}
                    className="text-primary relative box-border w-full cursor-pointer bg-transparent px-[2rem] py-[0.75rem] leading-[1rem] hover:bg-[#f5f5f5]"
                    onClick={() => handleSelect(country)}
                  >
                    {country.label}
                  </span>
                ))}
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="text-gray-500">No countries found</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
