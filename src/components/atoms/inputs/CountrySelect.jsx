import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

export const CountrySelect = ({
  name,
  id,
  value,
  onChange,
  countries = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const dropdownRef = useRef(null);

  const handleSelect = (country) => {
    setSelectedCountry(country.label);
    onChange(country.value);
    setIsOpen(false);
  };

  const filteredCountries = countries.filter((country) =>
    country.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    if (!dropdownRef.current) return;

    let tween;

    if (isOpen) {
      gsap.set(dropdownRef.current, {
        height: 0,
      });

      tween = gsap.to(dropdownRef.current, {
        height: "15rem",
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      tween = gsap.to(dropdownRef.current, {
        height: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }

    return () => {
      if (tween) tween.kill();
    };
  }, [isOpen]);

  return (
    <div className="custom--select relative h-auto w-full">
      <div
        className={`select--top relative box-border flex h-[48px] w-full cursor-pointer items-center justify-start rounded-[14px] bg-white px-[1rem] md:h-[5rem] md:rounded-[25px] md:px-[3rem] ${!selectedCountry ? "unselected" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <input
          type="hidden"
          name={name}
          id={id}
          value={value}
          className="leading-full z-2 text-base text-[#1d1d1d] md:text-[1.25rem]"
        />
        <span>{selectedCountry || "Select an option"}</span>
        <div className="select--arrow absolute top-1/2 right-[1rem] h-[12px] w-[12px] -translate-y-1/2 -rotate-90 bg-[#1d1d1d] mask-[url('/src/assets/arrow.svg')] mask-no-repeat md:right-[2rem] md:h-4 md:w-4" />
      </div>

      <div
        ref={dropdownRef}
        className="select--bottom absolute top-[calc(100%+0.5rem)] left-0 h-0 w-full overflow-hidden rounded-[25px] bg-white"
      >
        <div className="sel-inner relative box-border flex h-[15rem] w-full flex-col items-start justify-start gap-[0.75rem] border-0 p-[0.75rem]">
          <div className="search-on-select relative h-auto w-full">
            <input
              type="text"
              className="search-on-select-input relative box-border h-[3rem] w-full rounded-[15px] border-0 bg-[#e1e1e1] px-[2rem] py-4 leading-[1rem] text-[#1d1d1d] outline-none"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div
            className="select--list relative h-[11.25rem] w-full overflow-y-auto"
            data-lenis-prevent
            style={{ scrollbarWidth: "none" }}
          >
            <div className="relative flex h-auto w-full flex-col items-start justify-start">
              {filteredCountries.map((country) => (
                <span
                  key={country.value}
                  className="relative box-border w-full cursor-pointer bg-transparent px-[2rem] py-[0.75rem] leading-[1rem] text-[#1d1d1d] hover:bg-[#f5f5f5]"
                  onClick={() => handleSelect(country)}
                >
                  {country.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
