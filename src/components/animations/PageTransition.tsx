interface PageTransitionProps {
  title: string;
}

const PageTransition = ({ title }: PageTransitionProps) => {
  return (
    <div
      id="pageTransition"
      className="invisible fixed top-0 left-0 z-200 h-full w-full opacity-0"
      aria-hidden="true"
    >
      <div
        className="color-1 relative h-full w-full bg-[#302F35]"
        style={{ clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0 100%)' }}
      />
      <div
        className="color-2 absolute top-0 left-0 h-full w-full bg-[#e1e1e1]"
        style={{ clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0 100%)' }}
      >
        <div className="title absolute top-1/2 left-1/2 -translate-1/2">
          <h2 className="font-humane leading-full text-[12vw] font-normal text-[#302F35] uppercase">
            {title}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default PageTransition;
