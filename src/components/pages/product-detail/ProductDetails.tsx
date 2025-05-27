interface ProductDetailsProps {
  isMobile: boolean;
}

const CARE_INSTRUCTIONS = [
  {
    id: 'ironing',
    name: 'Ironing',
    icon: '/src/assets/ironing.svg',
    alt: 'Iron at medium temperature',
  },
  {
    id: 'bleaching',
    name: 'Bleaching',
    icon: '/src/assets/bleaching.svg',
    alt: 'Do not bleach',
  },
  {
    id: 'washing',
    name: 'Washing',
    icon: '/src/assets/washing.svg',
    alt: 'Machine wash cold',
  },
  {
    id: 'hanging',
    name: 'Hanging',
    icon: '/src/assets/hanging.svg',
    alt: 'Hang to dry',
  },
];

const ProductDetails: React.FC<ProductDetailsProps> = ({ isMobile }) => {
  const details = [
    {
      title: 'Details',
      items: [
        'Struttura in mezza maglia inglese',
        'Capo double face',
        'Bandierina logo “AKKE” double face',
        'Collo vulcano con calature a vista',
        '8 fili di lana e cordura 2-48 mixati a 4 fili di puro cashmere 2-28',
      ],
    },
    {
      title: 'Materials and care',
      items: ['50% Cashmere', '30% Lana', '20% Cordura'],
    },
  ];

  return details.map((detail, index) => (
    <div
      key={index}
      className={`${isMobile ? 'mobile' : 'desktop'} relative h-auto w-full flex-col items-start justify-start gap-[1rem] md:flex`}
    >
      <span className="leading-full text-primary text-base font-bold uppercase">
        {detail.title}
      </span>
      <ul className="relative flex h-auto w-full flex-col">
        {detail.items.map((text, index) => (
          <li
            key={index}
            className="text-primary relative flex items-start justify-start gap-[0.3rem] text-base leading-[1.2rem] before:text-[1.5rem] before:leading-[1rem] before:content-['·']"
          >
            {text}
          </li>
        ))}
      </ul>
      {index === 1 && (
        <div className="relative mt-2 flex h-auto w-full items-center justify-start gap-[0.75rem]">
          {CARE_INSTRUCTIONS.map((instruction) => (
            <div
              key={instruction.id}
              className={`bg-primary relative h-6 w-6 mask-no-repeat`}
              title={instruction.alt}
              style={{
                maskImage: `url('${instruction.icon}')`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  ));
};

export default ProductDetails;
