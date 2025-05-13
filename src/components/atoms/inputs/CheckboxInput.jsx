export const CheckboxInput = ({
  name,
  register,
  validation,
  errors,
  isChecked,
  setIsChecked,
  label,
  errorPosition = "left-0",
}) => {
  return (
    <div className="relative h-auto w-full">
      <label className="relative flex h-auto w-full cursor-pointer items-center justify-start gap-2 md:gap-[1rem]">
        <input
          type="checkbox"
          {...register(name, validation)}
          className="invisible z-2 box-border hidden p-0 opacity-0"
          onChange={() => setIsChecked(!isChecked)}
        />
        <div className="custom-check relative flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-[#1d1d1d] md:h-[2rem] md:w-[2rem] md:rounded-[0.6rem]">
          <div
            className={`inner-check relative h-3 w-3 bg-[#1d1d1d] mask-[url('/src/assets/check.svg')] mask-no-repeat opacity-0 transition-opacity duration-200 ease-in-out md:h-[1.5rem] md:w-[1.5rem] ${isChecked ? "opacity-100" : "opacity-0"}`}
          />
        </div>
        <span className="leading-full flex-1 basis-[100%] text-[14px] text-[#1d1d1d] md:basis-auto md:text-base">
          {label}
        </span>
        <div className={`errors absolute bottom-[-1rem] ${errorPosition}`}>
          {errors[name] && (
            <span className="error leading-full absolute bottom-0 left-0 text-[0.75rem] whitespace-nowrap text-[#FD7453] opacity-100 transition-all duration-300 ease-in-out">
              {errors[name].message}
            </span>
          )}
        </div>
      </label>
    </div>
  );
};
