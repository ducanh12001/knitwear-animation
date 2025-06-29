interface Feature {
  id: string;
  label: string;
  desktop: { top: string; left: string };
  mobile: { top: string; left: string };
  des: string;
}

export const FEATURES_DATA: Feature[] = [
  {
    id: 'wholegarment',
    label: 'Wholegarment®',
    desktop: { top: '15vh', left: '35%' },
    mobile: { top: 'calc(3.75rem + 48px + 80px)', left: '2.5vw' },
    des: "WHOLEGARMENT® is the world's first seam-free knitwear technology. It can be described as a 3D printer for textiles. The garments that come out of the machine need only some finishing, but they are almost ready to be worn. This technology allows us to reduce the number of steps that were necessary in traditional knitwear. This means that we are able to reduce yarn waste, as we only order and use as much yarn as we need.",
  },
  {
    id: 'dyeing-process',
    label: 'Dyeing Process',
    desktop: { top: '20vh', left: '56%' },
    mobile: { top: 'calc(3.75rem + 72px + 80px)', left: 'auto' },
    des: 'Our garments have been dyed following the DARKNESS technique which gives an iridescent effect of light-dark shadows. The dye gives each garment deep and always different shades. For this reason each piece is one of a kind. We focused our attention on 4 colors in particular, making sure that each color worked when combined with all the others.',
  },
  {
    id: 'yarn',
    label: 'Yarn',
    desktop: { top: '50vh', left: '54%' },
    mobile: { top: `calc(3.75rem + ${625 / 3}vw + 120px)`, left: '35vw' },
    des: 'The long research conducted by our team led us to the discovery of a yarn that combines wool and Cordura. The latter is a fabric that derives from a particular processing of nylon, thanks to which the material acquires a very resistant grid structure with specific properties. Its main characteristic is that of being considered a highly robust fabric, and therefore resistant to wear and tear with the ability to last over time. The grid structure offers high breathability to water vapor, not generating overheating of the body, but with a limit to its waterproof capacity. In fact, it can be considered a fabric that has the ability to repel medium water, having passed the water column test with a value of 5,000 mm. Its combination with wool has allowed us to create extremely warm, soft and resistant garments, perfect for outdoor clothing.',
  },
  {
    id: 'gorpcore',
    label: 'Gorpcorec',
    desktop: { top: '75vh', left: '55%' },
    mobile: { top: `calc(3.75rem + ${625 / 3}vw + 80px)`, left: '60vw' },
    des: 'Gorpcore is a style inspired by hiking and climbing clothing, but is designed for the city. "Gorp" comes from "Good ol\' Raisins and Peanuts", alluding to the classic dried fruit snacks, which have always been faithful travel companions for hikers. The aesthetic movement took hold during the lockdown periods, when everyone - and especially those who live in the city - expressed, even in style, the need to reconnect with nature. Another fundamental aspect of the Gorpcore style, beyond the ideal techwear for escaping the rain or trekking in style, is its unisex essence: the boundaries between men\'s and women\'s clothing are blurred to a new level. ',
  },
];
