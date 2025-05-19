// src/components/CookieConsent/AnimatedToggle.jsx
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const AnimatedToggle = ({
  id,
  isChecked,
  onChange,
  disabled = false,
  label = "",
  className = "",
}) => {
  const toggleRef = useRef(null);
  const knobRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize the toggle based on isChecked
  useEffect(() => {
    if (toggleRef.current && knobRef.current) {
      if (isChecked) {
        gsap.to(knobRef.current, {
          x: 16,
          duration: 0.1,
          ease: "power2.out",
        });

        gsap.to(toggleRef.current, {
          backgroundColor: "rgb(74, 222, 128)",
          duration: 0.1,
        });
      } else {
        gsap.to(knobRef.current, {
          x: 0,
          duration: 0.1,
          ease: "power2.out",
        });

        gsap.to(toggleRef.current, {
          backgroundColor: "rgb(209, 213, 219)",
          duration: 0.1,
        });
      }
    }
  }, [isChecked]);

  const handleToggle = (e) => {
    e.stopPropagation();
    if (!disabled && onChange) {
      onChange(!isChecked);

      if (inputRef.current) {
        inputRef.current.checked = !isChecked;
      }
    }
  };

  return (
    <div className={`flex items-center ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className={`mr-2 text-sm ${disabled ? "text-gray-400" : "text-gray-700"}`}
        >
          {label}
        </label>
      )}

      <div
        ref={toggleRef}
        className={`relative h-6 w-10 rounded-full ${isChecked ? "bg-green-400" : "bg-gray-300"} cursor-pointer transition-colors ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
        onClick={disabled ? undefined : handleToggle}
      >
        <div
          ref={knobRef}
          className="absolute top-1 left-1 h-4 w-4 transform rounded-full bg-white shadow-md transition-transform"
        ></div>

        <input
          ref={inputRef}
          type="checkbox"
          id={id}
          className="sr-only"
          checked={isChecked}
          onChange={handleToggle}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default AnimatedToggle;
