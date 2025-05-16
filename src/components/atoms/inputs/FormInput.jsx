export const FormInput = ({
  type = "text",
  name,
  placeholder,
  register,
  validation,
  errors,
  showPasswordToggle,
  showPassword,
  setShowPassword,
  showErrors = true,
}) => {
  return (
    <div className="relative flex h-auto w-full flex-col">
      <input
        className="leading-full relative z-2 box-border h-[48px] w-full resize-none rounded-[14px] border-none bg-white px-[1rem] text-base text-[#1d1d1d] outline-none md:h-[5rem] md:px-[3rem] md:text-[1.25rem]"
        type={showPasswordToggle && showPassword ? "text" : type}
        placeholder={placeholder}
        {...register(name, validation)}
      />
      {showPasswordToggle && (
        <div
          className="show-hide absolute top-1/2 right-[1rem] z-15 -translate-y-1/2 cursor-pointer md:right-[3rem]"
          onClick={() => setShowPassword(!showPassword)}
        >
          <span className="leading-full text-[10px] text-[#1d1d1d] uppercase md:text-[0.75rem]">
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>
      )}
      {showErrors && (
        <div className="errors absolute right-[3rem] bottom-4">
          {errors[name] && (
            <span className="error leading-full absolute right-0 bottom-0 text-[0.75rem] whitespace-nowrap text-[#FD7453] opacity-100 transition-all duration-300 ease-in-out">
              {errors[name].message}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
