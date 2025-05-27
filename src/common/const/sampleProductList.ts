import type { Product } from '@/types';

import MenLime from '@/assets/images/men-lime.jpg';
import MenBlue from '@/assets/images/men-blue.jpg';
import MenGray from '@/assets/images/men-gray.jpg';
import WomenLime from '@/assets/images/women-lime.jpg';
import WomenBlack from '@/assets/images/women-black.jpg';
import WomenBlue from '@/assets/images/women-blue.jpg';
import WomenGray from '@/assets/images/women-gray.jpg';

export const menProducts: Product[] = [
  {
    id: 1,
    title: 'Indrasan',
    image: MenLime,
    description: 'Girocollo manica lunga con logo',
    price: { regular: '218.00', sale: '109.00' },
    colors: [
      {
        id: 452,
        hex: '#b9cb5f',
        active: true,
        url: MenLime,
      },
      {
        id: 2377,
        hex: '#003b84',
        url: MenBlue,
      },
      {
        id: 425,
        hex: '#d4ccc8',
        url: MenGray,
      },
    ],
  },
];

export const womenProducts: Product[] = [
  {
    id: 2,
    title: 'Trisul',
    image: WomenBlack,
    description: 'T-shirt manica corta traspirabile',
    price: { regular: '165.00' },
    colors: [
      {
        id: 219,
        hex: '#2d2c2f',
        active: true,
        url: WomenBlack,
      },
      {
        id: 214,
        hex: '#b9cb5f',
        active: false,
        url: WomenLime,
      },
      {
        id: 209,
        hex: '#d4ccc8',
        active: false,
        url: WomenGray,
      },
      {
        id: 195,
        hex: '#324fad',
        active: false,
        url: WomenBlue,
      },
    ],
  },
];
