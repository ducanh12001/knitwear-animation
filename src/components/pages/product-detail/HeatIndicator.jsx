export const HeatIndicator = ({ isMobile }) => {
  const className = `product-heat ${isMobile ? "mobile" : "desktop"} relative h-auto w-full flex-col items-start justify-start gap-[1rem] md:flex`;

  return (
    <div className={className}>
      <span className="leading-full text-base font-bold text-[#1d1d1d] uppercase">
        Calore
      </span>
      <div className="circles relative flex h-auto w-full items-center justify-start gap-[0.25rem]">
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className="relative box-border flex h-4 w-4 items-center justify-center rounded-full border border-[#93A7A8] after:h-3 after:w-3 after:rounded-full after:bg-[#93A7A8] after:content-['']"
            aria-hidden="true"
          />
        ))}
        {!isMobile && (
          <div className="circle_plus">
            <span className="leading-full flex items-center justify-center text-base font-bold text-[#1d1d1d] uppercase">
              +
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
