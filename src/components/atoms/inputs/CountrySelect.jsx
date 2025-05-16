import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

export const CountrySelect = ({
  name,
  id,
  value,
  onChange,
  register,
  validation = {},
  errors = {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,cca2",
        );
        const data = await response.json();

        const formattedCountries = data
          .map((country) => ({
            value: country.cca2,
            label: country.name.common,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));

        setCountries(formattedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setCountries([
          { value: "US", label: "United States" },
          { value: "GB", label: "United Kingdom" },
          { value: "FR", label: "France" },
          { value: "IT", label: "Italy" },
          { value: "VN", label: "Vietnam" },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleSelect = (country) => {
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
    if (!dropdownRef.current) return;

    let tween;

    if (isOpen) {
      gsap.set(dropdownRef.current, {
        height: 0,
        overflow: "hidden",
        opacity: 0,
      });

      tween = gsap.to(dropdownRef.current, {
        height: "15rem",
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          gsap.set(dropdownRef.current, { overflow: "visible" });
        },
      });
    } else {
      gsap.set(dropdownRef.current, { overflow: "hidden" });

      tween = gsap.to(dropdownRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }

    return () => {
      if (tween) tween.kill();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest(".select--top")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
          {...(register ? register(name, validation) : {})}
        />
        <span className={`${isLoading ? "text-gray-400" : ""}`}>
          {selectedCountry ||
            (isLoading ? "Loading countries..." : "Select country")}
        </span>
        <div
          className={`select--arrow absolute top-1/2 right-[1rem] h-[12px] w-[12px] -translate-y-1/2 ${isOpen ? "rotate-0" : "-rotate-90"} bg-[#1d1d1d] mask-[url('/src/assets/arrow.svg')] mask-no-repeat transition-transform duration-300 md:right-[2rem] md:h-4 md:w-4`}
        />
      </div>

      {errors[name] && (
        <div className="errors absolute bottom-[-1rem] left-0">
          <span className="error leading-full absolute bottom-0 left-0 text-[0.75rem] whitespace-nowrap text-[#FD7453] opacity-100 transition-all duration-300 ease-in-out">
            {errors[name].message}
          </span>
        </div>
      )}

      <div
        ref={dropdownRef}
        className="select--bottom absolute top-[calc(100%+0.5rem)] left-0 z-20 w-full rounded-[25px] bg-white"
        style={{
          height: 0,
          opacity: 0,
          overflow: "hidden",
        }}
      >
        <div className="sel-inner relative box-border flex h-[15rem] w-full flex-col items-start justify-start gap-[0.75rem] border-0 p-[0.75rem]">
          <div className="search-on-select relative h-auto w-full">
            <input
              type="text"
              className="search-on-select-input relative box-border h-[3rem] w-full rounded-[15px] border-0 bg-[#e1e1e1] px-[2rem] py-4 leading-[1rem] text-[#1d1d1d] outline-none"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div
            className="select--list relative h-[11.25rem] w-full overflow-y-auto"
            data-lenis-prevent
            style={{ scrollbarWidth: "none" }}
            onClick={(e) => e.stopPropagation()}
          >
            {isLoading ? (
              <div className="flex h-full w-full items-center justify-center">
                <span className="text-gray-500">Loading...</span>
              </div>
            ) : filteredCountries.length > 0 ? (
              <div className="wrp relative flex h-auto w-full flex-col items-start justify-start">
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
