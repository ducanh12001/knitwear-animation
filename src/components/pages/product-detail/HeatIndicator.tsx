interface HeatIndicatorProps {
  isMobile: boolean;
}

const HeatIndicator: React.FC<HeatIndicatorProps> = ({ isMobile }) => {
  return (
    <div
      className={`${isMobile ? 'mobile' : 'desktop'} relative h-auto w-full flex-col items-start justify-start gap-[1rem] md:flex`}
    >
      <span className="leading-full text-primary text-base font-bold uppercase">
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
            <span className="leading-full text-primary flex items-center justify-center text-base font-bold uppercase">
              +
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeatIndicator;
