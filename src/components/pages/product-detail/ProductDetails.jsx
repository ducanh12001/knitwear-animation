export const ProductDetails = ({ isMobile }) => {
  const details = [
    {
      title: "Details",
      items: [
        "Struttura in mezza maglia inglese",
        "Capo double face",
        "Bandierina logo “AKKE” double face",
        "Collo vulcano con calature a vista",
        "8 fili di lana e cordura 2-48 mixati a 4 fili di puro cashmere 2-28",
      ],
    },
    {
      title: "Materials and care",
      items: ["50% Cashmere", "30% Lana", "20% Cordura"],
    },
  ];

  const className = `product-details ${isMobile ? "mobile" : "desktop"} relative h-auto w-full flex-col items-start justify-start gap-[1rem] md:flex`;

  return details.map((detail, index) => (
    <div key={index} className={className}>
      <span className="leading-full text-base font-bold text-[#1d1d1d] uppercase">
        {detail.title}
      </span>
      <ul className="relative flex h-auto w-full flex-col">
        {detail.items.map((text, index) => (
          <li
            key={index}
            className="relative flex items-start justify-start gap-[0.3rem] text-base leading-[1.2rem] text-[#1d1d1d] before:text-[1.5rem] before:leading-[1rem] before:content-['·']"
          >
            {text}
          </li>
        ))}
      </ul>
      {index === 1 && (
        <div className="icons relative mt-2 flex h-auto w-full items-center justify-start gap-[0.75rem]">
          <div className="icon stiro relative h-6 w-6 bg-[#1d1d1d] mask-[url('/src/assets/ironing.svg')] mask-no-repeat" />
          <div className="icon candeggio relative h-6 w-6 bg-[#1d1d1d] mask-[url('/src/assets/bleaching.svg')] mask-no-repeat" />
          <div className="icon lavaggio relative h-6 w-6 bg-[#1d1d1d] mask-[url('/src/assets/washing.svg')] mask-no-repeat" />
          <div className="icon stendere relative h-6 w-6 bg-[#1d1d1d] mask-[url('/src/assets/hanging.svg')] mask-no-repeat" />
        </div>
      )}
    </div>
  ));
};
