import type { Product } from '@/types';
import { menColImages, womenColImages } from '@/constant/mock-datas/slides';
import tephra_blu_MS2415PL6_BLU_1 from '@/assets/images/products/tephra_blu_MS2415PL6-BLU-1.jpg';
import tephra_avorio_MS2415PL6_AVORIO_1 from '@/assets/images/products/tephra_avorio_MS2415PL6-AVORIO-1.jpg';
import diorite_bianco_4_SEASON_MS2407CA23_4SE_BIANCO_1 from '@/assets/images/products/diorite_bianco_4-SEASON-MS2407CA23-4SE-BIANCO-1.jpg';
import diorite_nero_4_SEASON_MS2407CA23_4SE_NERO_1 from '@/assets/images/products/diorite_nero_4-SEASON-MS2407CA23-4SE-NERO-1.jpg';
import diorite_blu_4_SEASON_MS2407CA23_4SE_BLU_1 from '@/assets/images/products/diorite_blu_4-SEASON-MS2407CA23-4SE-BLU-1.jpg';
import septaria_blu_4_SEASON_MS2407GC22_4SE_BLU_1 from '@/assets/images/products/septaria_blu_4-SEASON-MS2407GC22-4SE-BLU-1.jpg';
import septaria_nero_4_SEASON_MS2407GC22_4SE_NERO_1 from '@/assets/images/products/septaria_nero_4-SEASON-MS2407GC22-4SE-NERO-1.jpg';
import septaria_bianco_4_SEASON_MS2407GC22_4SE_BIANCO_1 from '@/assets/images/products/septaria_bianco_4-SEASON-MS2407GC22-4SE-BIANCO-1.jpg';
import arenaria_beige_4_SEASON_MS2415GC19_4SE_BEIGE_1 from '@/assets/images/products/arenaria_beige_4-SEASON-MS2415GC19-4SE-BEIGE-1.jpg';
import arenaria_nero_4_SEASON_MS2415GC19_4SE_NERO_1 from '@/assets/images/products/arenaria_nero_4-SEASON-MS2415GC19-4SE-NERO-1.jpg';
import arenaria_blu_4_SEASON_MS2415GC19_4SE_BLU_1 from '@/assets/images/products/arenaria_blu_4-SEASON-MS2415GC19-4SE-BLU-1.jpg';
import arenaria_bianco_4_SEASON_MS2415GC19_4SE_BIANCO_1 from '@/assets/images/products/arenaria_bianco_4-SEASON-MS2415GC19-4SE-BIANCO-1.jpg';
import travertine_bianco_4_SEASON_MS2415GC20_4SE_BIANCO_1 from '@/assets/images/products/travertine_bianco_4-SEASON-MS2415GC20-4SE-BIANCO-1.jpg';
import travertine_beige_4_SEASON_MS2415GC20_4SE_BEIGE_1 from '@/assets/images/products/travertine_beige_4-SEASON-MS2415GC20-4SE-BEIGE-1.jpg';
import travertine_nero_4_SEASON_MS2415GC20_4SE_NERO_1 from '@/assets/images/products/travertine_nero_4-SEASON-MS2415GC20-4SE-NERO-1.jpg';
import travertine_blu_4_SEASON_MS2415GC20_4SE_BLU_1 from '@/assets/images/products/travertine_blu_4-SEASON-MS2415GC20-4SE-BLU-1.jpg';
import slate_nero_4_SEASON_MS2415GC21_4SE_NERO_1 from '@/assets/images/products/slate_nero_4-SEASON-MS2415GC21-4SE-NERO-1.jpg';
import slate_blu_4_SEASON_MS2415GC21_4SE_BLU_1 from '@/assets/images/products/slate_blu_4-SEASON-MS2415GC21-4SE-BLU-1.jpg';
import slate_bianco_4_SEASON_MS2415GC21_4SE_BIANCO_1 from '@/assets/images/products/slate_bianco_4-SEASON-MS2415GC21-4SE-BIANCO-1.jpg';
import slate_beige_4_SEASON_MS2415GC21_4SE_BEIGE_1 from '@/assets/images/products/slate_beige_4-SEASON-MS2415GC21-4SE-BEIGE-1.jpg';
import schist_beige_4_SEASON_MS2418GC32_4SE_BEIGE_1 from '@/assets/images/products/schist_beige_4-SEASON-MS2418GC32-4SE-BEIGE-1.jpg';
import schist_grigio_4_SEASON_MS2418GC32_4SE_GRIGIO_1 from '@/assets/images/products/schist_grigio_4-SEASON-MS2418GC32-4SE-GRIGIO-1.jpg';
import schist_blu_4_SEASON_MS2418GC32_4SE_BLU_1 from '@/assets/images/products/schist_blu_4-SEASON-MS2418GC32-4SE-BLU-1.jpg';
import lava_multi_1_HIGH_ALTITUDE_MS2403GC27_HI_1 from '@/assets/images/products/lava_multi-1_HIGH-ALTITUDE-MS2403GC27-HI-1.jpg';
import lava_multi_2_HIGH_ALTITUDE_MS2403GC28_HI_1 from '@/assets/images/products/lava_multi-2_HIGH-ALTITUDE-MS2403GC28-HI-1.jpg';
import basalt_azzurro_HIGH_ALTITUDE_MS2405GC25_HI_AZZURRO_1 from '@/assets/images/products/basalt_azzurro_HIGH-ALTITUDE-MS2405GC25-HI-AZZURRO-1.jpg';
import basalt_arancione_HIGH_ALTITUDE_MS2405GC25_HI_ARANCIONE_1 from '@/assets/images/products/basalt_arancione_HIGH-ALTITUDE-MS2405GC25-HI-ARANCIONE-1.jpg';
import basalt_marrone_HIGH_ALTITUDE_MS2405GC25_HI_MARRONE_1 from '@/assets/images/products/basalt_marrone_HIGH-ALTITUDE-MS2405GC25-HI-MARRONE-1.jpg';
import gabbro_blu_HIGH_ALTITUDE_MS2405LU26_HI_BLU_1 from '@/assets/images/products/gabbro_blu_HIGH-ALTITUDE-MS2405LU26-HI-BLU-1.jpg';
import gabbro_beige_HIGH_ALTITUDE_MS2405LU26_HI_BEIGE_1 from '@/assets/images/products/gabbro_beige_HIGH-ALTITUDE-MS2405LU26-HI-BEIGE-1.jpg';
import lopolith_azzurro_MS2405GC17_AZZURRO_1 from '@/assets/images/products/lopolith_azzurro_MS2405GC17-AZZURRO-1.jpg';
import lopolith_beige_MS2405GC17_BEIGE_1 from '@/assets/images/products/lopolith_beige_MS2405GC17-BEIGE-1.jpg';
import lopolith_arancio_MS2405GC17_ARANCIO_1 from '@/assets/images/products/lopolith_arancio_MS2405GC17-ARANCIO-1.jpg';
import catlinite_arancio_MS2407GC9_ARANCIO_1 from '@/assets/images/products/catlinite_arancio_MS2407GC9-ARANCIO-1.jpg';
import catlinite_azzurro_MS2407GC9_AZZURRO_1 from '@/assets/images/products/catlinite_azzurro_MS2407GC9-AZZURRO-1.jpg';
import catlinite_marrone_MS2407GC9_MARRONE_1 from '@/assets/images/products/catlinite_marrone_MS2407GC9-MARRONE-1.jpg';
import palagonite_marrone_MS2407GC10_MARRONE_1 from '@/assets/images/products/palagonite_marrone_MS2407GC10-MARRONE-1.jpg';
import palagonite_avorio_MS2407GC10_AVORIO_1 from '@/assets/images/products/palagonite_avorio_MS2407GC10-AVORIO-1.jpg';
import skarn_blu_MS2415GC1_BLU_1 from '@/assets/images/products/skarn_blu_MS2415GC1-BLU-1.jpg';
import skarn_avorio_MS2415GC1_AVORIO_1 from '@/assets/images/products/skarn_avorio_MS2415GC1-AVORIO-1.jpg';
import akrose_azzurro_MS2415GC7_AZZURRO_1 from '@/assets/images/products/akrose_azzurro_MS2415GC7-AZZURRO-1.jpg';
import akrose_marrone_MS2415GC7_MARRONE_1 from '@/assets/images/products/akrose_marrone_MS2415GC7-MARRONE-1.jpg';
import akrose_blu_MS2415GC7_BLU_1 from '@/assets/images/products/akrose_blu_MS2415GC7-BLU-1.jpg';
import akrose_avorio_MS2415GC7_AVORIO_1 from '@/assets/images/products/akrose_avorio_MS2415GC7-AVORIO-1.jpg';
import lhotse_turtledove_MF2415GC2_Turtledove_1_1 from '@/assets/images/products/lhotse_turtledove_MF2415GC2_Turtledove_1-1.jpg';
import lhotse_indigo_LHOTSE_INDIGO_1 from '@/assets/images/products/lhotse_indigo_LHOTSE-INDIGO-1.jpg';
import lhotse_asphalt_MF2415GC2_Asphalt_1_1 from '@/assets/images/products/lhotse_asphalt_MF2415GC2_Asphalt_1-1.jpg';
import kaolinite_arancio_MS2407SH14_ARANCIO_1 from '@/assets/images/products/kaolinite_arancio_MS2407SH14-ARANCIO-1.jpg';
import kaolinite_multicolor_MS2407SH14_MULTICOLOR_1 from '@/assets/images/products/kaolinite_multicolor_MS2407SH14-MULTICOLOR-1.jpg';
import kaolinite_marrone_MS2407SH14_MARRONE_1 from '@/assets/images/products/kaolinite_marrone_MS2407SH14-MARRONE-1.jpg';
import kaolinite_azzurro_MS2407SH14_AZZURRO_1 from '@/assets/images/products/kaolinite_azzurro_MS2407SH14-AZZURRO-1.jpg';
import unakite_azzurro_MS2415GC2_AZZURRO_1 from '@/assets/images/products/unakite_azzurro_MS2415GC2-AZZURRO-1.jpg';
import unakite_avorio_MS2415GC2_AVORIO_1 from '@/assets/images/products/unakite_avorio_MS2415GC2-AVORIO-1.jpg';
import unakite_blu_MS2415GC2_BLU_1 from '@/assets/images/products/unakite_blu_MS2415GC2-BLU-1.jpg';
import moonmilk_arancio_WS2407SK13_ARANCIO_1 from '@/assets/images/products/moonmilk_arancio_WS2407SK13-ARANCIO-1.jpg';
import moonmilk_multicolor_WS2407SK13_MULTICOLOR_1 from '@/assets/images/products/moonmilk_multicolor_WS2407SK13-Multicolor-1.jpg';
import moonmilk_azzurro_WS2407SK13_AZZURRO_1 from '@/assets/images/products/moonmilk_azzurro_WS2407SK13-Azzurro-1.jpg';
import dunite_arancio_WS2415TOP5_ARANCIO_1 from '@/assets/images/products/dunite_arancio_WS2415TOP5-ARANCIO-1.jpg';
import dunite_blu_WS2415TOP5_BLU_1 from '@/assets/images/products/dunite_blu_WS2415TOP5-BLU-1.jpg';
import lopolith_arancio_WS2405GC18_ARANCIO_1 from '@/assets/images/products/lopolith_arancio_WS2405GC18-ARANCIO-1.jpg';
import lopolith_beige_WS2405GC18_BEIGE_1 from '@/assets/images/products/lopolith_beige_WS2405GC18-BEIGE-1.jpg';
import lopolith_azzurro_WS2405GC18_AZZURRO_1 from '@/assets/images/products/lopolith_azzurro_WS2405GC18-AZZURRO-1.jpg';
import kaolinite_marrone_WS2415DR4_MARRONE_1 from '@/assets/images/products/kaolinite_marrone_WS2415DR4-MARRONE-1.jpg';
import kaolinite_azzurro_WS2415DR4_AZZURRO_1 from '@/assets/images/products/kaolinite_azzurro_WS2415DR4-AZZURRO-1.jpg';
import grisein_blu_WS2407PA15_BLU_1 from '@/assets/images/products/grisein_blu_WS2407PA15-BLU-1.jpg';
import grisein_marrone_WS2407PA15_MARRONE_1 from '@/assets/images/products/grisein_marrone_WS2407PA15-MARRONE-1.jpg';
import unakite_avorio_WS2415GC2_AVORIO_1 from '@/assets/images/products/unakite_avorio_WS2415GC2-AVORIO-1.jpg';
import unakite_blu_WS2415GC2_BLU_1 from '@/assets/images/products/unakite_blu_WS2415GC2-BLU-1.jpg';
import unakite_azzurro_WS2415GC2_AZZURRO_1 from '@/assets/images/products/unakite_azzurro_WS2415GC2-AZZURRO-1.jpg';
import dolomia_arancio_WS2415GC3_ARANCIO_1 from '@/assets/images/products/dolomia_arancio_WS2415GC3-ARANCIO-1.jpg';
import dolomia_marrone_WS2415GC3_MARRONE_1 from '@/assets/images/products/dolomia_marrone_WS2415GC3-MARRONE-1-1.jpg';

export const menProducts: Product[] = [
  {
    id: 1,
    gender: 'male',
    title: 'Tephra',
    image: tephra_blu_MS2415PL6_BLU_1,
    description: 'Essential polo in organic cotton.',
    price: {
      regular: '69.00',
    },
    colors: [
      {
        id: 'blu',
        image: tephra_blu_MS2415PL6_BLU_1,
        hex: '#1E40AF',
        name: 'Blu',
      },
      {
        id: 'avorio',
        image: tephra_avorio_MS2415PL6_AVORIO_1,
        hex: '#FEF7ED',
        name: 'Avorio',
      },
    ],
    slides: menColImages,
  },
  {
    id: 2,
    gender: 'male',
    title: 'Diorite',
    image: diorite_bianco_4_SEASON_MS2407CA23_4SE_BIANCO_1,
    description: 'Cotton and cashmere cardigan.',
    price: {
      regular: '129.00',
    },
    colors: [
      {
        id: 'bianco',
        image: diorite_bianco_4_SEASON_MS2407CA23_4SE_BIANCO_1,
        hex: '#FFFFFF',
        name: 'Bianco',
      },
      {
        id: 'nero',
        image: diorite_nero_4_SEASON_MS2407CA23_4SE_NERO_1,
        hex: '#000000',
        name: 'Nero',
      },
      {
        id: 'blu',
        image: diorite_blu_4_SEASON_MS2407CA23_4SE_BLU_1,
        hex: '#1E40AF',
        name: 'Blu',
      },
    ],
    slides: menColImages,
  },
  {
    id: 3,
    gender: 'male',
    title: 'Septaria',
    image: septaria_blu_4_SEASON_MS2407GC22_4SE_BLU_1,
    description: 'Crewneck sweater in cotton and cashmere.',
    price: {
      regular: '109.00',
    },
    colors: [
      {
        id: 'blu',
        image: septaria_blu_4_SEASON_MS2407GC22_4SE_BLU_1,
        hex: '#1E40AF',
        name: 'Blu',
      },
      {
        id: 'nero',
        image: septaria_nero_4_SEASON_MS2407GC22_4SE_NERO_1,
        hex: '#000000',
        name: 'Nero',
      },
      {
        id: 'bianco',
        image: septaria_bianco_4_SEASON_MS2407GC22_4SE_BIANCO_1,
        hex: '#FFFFFF',
        name: 'Bianco',
      },
    ],
    slides: menColImages,
  },
  {
    id: 4,
    gender: 'male',
    title: 'Arenaria',
    image: arenaria_beige_4_SEASON_MS2415GC19_4SE_BEIGE_1,
    description: 'Lightweight crewneck sweater.',
    price: {
      regular: '95.00',
    },
    colors: [
      {
        id: 'beige',
        image: arenaria_beige_4_SEASON_MS2415GC19_4SE_BEIGE_1,
        hex: '#F5F5DC',
        name: 'Beige',
      },
      {
        id: 'nero',
        image: arenaria_nero_4_SEASON_MS2415GC19_4SE_NERO_1,
        hex: '#000000',
        name: 'Nero',
      },
      {
        id: 'blu',
        image: arenaria_blu_4_SEASON_MS2415GC19_4SE_BLU_1,
        hex: '#1E40AF',
        name: 'Blu',
      },
      {
        id: 'bianco',
        image: arenaria_bianco_4_SEASON_MS2415GC19_4SE_BIANCO_1,
        hex: '#FFFFFF',
        name: 'Bianco',
      },
    ],
    slides: menColImages,
  },
  {
    id: 5,
    gender: 'male',
    title: 'Travertine',
    image: travertine_bianco_4_SEASON_MS2415GC20_4SE_BIANCO_1,
    description: 'Cotton and cashmere T-shirt.',
    price: {
      regular: '82.00',
    },
    colors: [
      {
        id: 'bianco',
        image: travertine_bianco_4_SEASON_MS2415GC20_4SE_BIANCO_1,
        hex: '#FFFFFF',
        name: 'Bianco',
      },
      {
        id: 'beige',
        image: travertine_beige_4_SEASON_MS2415GC20_4SE_BEIGE_1,
        hex: '#F5F5DC',
        name: 'Beige',
      },
      {
        id: 'nero',
        image: travertine_nero_4_SEASON_MS2415GC20_4SE_NERO_1,
        hex: '#000000',
        name: 'Nero',
      },
      {
        id: 'blu',
        image: travertine_blu_4_SEASON_MS2415GC20_4SE_BLU_1,
        hex: '#1E40AF',
        name: 'Blu',
      },
    ],
    slides: menColImages,
  },
  {
    id: 6,
    gender: 'male',
    title: 'Slate',
    image: slate_nero_4_SEASON_MS2415GC21_4SE_NERO_1,
    description: 'Crewneck sweater in cotton and cashmere.',
    price: {
      regular: '95.00',
    },
    colors: [
      {
        id: 'nero',
        image: slate_nero_4_SEASON_MS2415GC21_4SE_NERO_1,
        hex: '#000000',
        name: 'Nero',
      },
      {
        id: 'blu',
        image: slate_blu_4_SEASON_MS2415GC21_4SE_BLU_1,
        hex: '#1E40AF',
        name: 'Blu',
      },
      {
        id: 'bianco',
        image: slate_bianco_4_SEASON_MS2415GC21_4SE_BIANCO_1,
        hex: '#FFFFFF',
        name: 'Bianco',
      },
      {
        id: 'beige',
        image: slate_beige_4_SEASON_MS2415GC21_4SE_BEIGE_1,
        hex: '#F5F5DC',
        name: 'Beige',
      },
    ],
    slides: menColImages,
  },
  {
    id: 7,
    gender: 'male',
    title: 'Schist',
    image: schist_beige_4_SEASON_MS2418GC32_4SE_BEIGE_1,
    description: 'Crewneck sweater in ultrafine wool.',
    price: {
      regular: '95.00',
    },
    colors: [
      {
        id: 'beige',
        image: schist_beige_4_SEASON_MS2418GC32_4SE_BEIGE_1,
        hex: '#F5F5DC',
        name: 'Beige',
      },
      {
        id: 'grigio',
        image: schist_grigio_4_SEASON_MS2418GC32_4SE_GRIGIO_1,
        hex: '#808080',
        name: 'Grigio',
      },
      {
        id: 'blu',
        image: schist_blu_4_SEASON_MS2418GC32_4SE_BLU_1,
        hex: '#1E40AF',
        name: 'Blu',
      },
    ],
    slides: menColImages,
  },
  {
    id: 8,
    gender: 'male',
    title: 'Lava',
    image: lava_multi_1_HIGH_ALTITUDE_MS2403GC27_HI_1,
    description: 'Multicolor silk and cotton sweater.',
    price: {
      regular: '189.00',
    },
    colors: [
      {
        id: 'multi-1',
        image: lava_multi_1_HIGH_ALTITUDE_MS2403GC27_HI_1,
        hex: '#FF6B35',
        name: 'Multi',
      },
      {
        id: 'multi-2',
        image: lava_multi_2_HIGH_ALTITUDE_MS2403GC28_HI_1,
        hex: '#8B5A3C',
        name: 'Multi',
      },
    ],
    slides: menColImages,
  },
  {
    id: 9,
    gender: 'male',
    title: 'Basalt',
    image: basalt_azzurro_HIGH_ALTITUDE_MS2405GC25_HI_AZZURRO_1,
    description: 'Hand-dyed cashmere crewneck sweater.',
    price: {
      regular: '189.00',
    },
    colors: [
      {
        id: 'azzurro',
        image: basalt_azzurro_HIGH_ALTITUDE_MS2405GC25_HI_AZZURRO_1,
        hex: '#87CEEB',
        name: 'Azzurro',
      },
      {
        id: 'arancione',
        image: basalt_arancione_HIGH_ALTITUDE_MS2405GC25_HI_ARANCIONE_1,
        hex: '#FF8C00',
        name: 'Arancione',
      },
      {
        id: 'marrone',
        image: basalt_marrone_HIGH_ALTITUDE_MS2405GC25_HI_MARRONE_1,
        hex: '#8B4513',
        name: 'Marrone',
      },
    ],
    slides: menColImages,
  },
  {
    id: 10,
    gender: 'male',
    title: 'Gabbro',
    image: gabbro_blu_HIGH_ALTITUDE_MS2405LU26_HI_BLU_1,
    description: 'Zip-up mock neck sweater in cotton with contrast details.',
    price: {
      regular: '129.00',
    },
    colors: [
      {
        id: 'blu',
        image: gabbro_blu_HIGH_ALTITUDE_MS2405LU26_HI_BLU_1,
        hex: '#1E40AF',
        name: 'Blu',
      },
      {
        id: 'beige',
        image: gabbro_beige_HIGH_ALTITUDE_MS2405LU26_HI_BEIGE_1,
        hex: '#F5F5DC',
        name: 'Beige',
      },
    ],
    slides: menColImages,
  },
  {
    id: 11,
    gender: 'male',
    title: 'lopolith',
    image: lopolith_azzurro_MS2405GC17_AZZURRO_1,
    description: 'Crewneck in hemp and bamboo.',
    price: {
      regular: '99.00',
    },
    colors: [
      {
        id: 'azzurro',
        image: lopolith_azzurro_MS2405GC17_AZZURRO_1,
        hex: '#87CEEB',
        name: 'Azzurro',
      },
      {
        id: 'beige',
        image: lopolith_beige_MS2405GC17_BEIGE_1,
        hex: '#F5F5DC',
        name: 'Beige',
      },
      {
        id: 'arancio',
        image: lopolith_arancio_MS2405GC17_ARANCIO_1,
        hex: '#FF6B35',
        name: 'Arancio',
      },
    ],
    slides: menColImages,
  },
  {
    id: 12,
    gender: 'male',
    title: 'Catlinite',
    image: catlinite_arancio_MS2407GC9_ARANCIO_1,
    description: 'Crewneck sweater with contrast detail.',
    price: {
      regular: '109.00',
    },
    colors: [
      {
        id: 'arancio',
        image: catlinite_arancio_MS2407GC9_ARANCIO_1,
        hex: '#FF6B35',
        name: 'Arancio',
      },
      {
        id: 'azzurro',
        image: catlinite_azzurro_MS2407GC9_AZZURRO_1,
        hex: '#87CEEB',
        name: 'Azzurro',
      },
      {
        id: 'marrone',
        image: catlinite_marrone_MS2407GC9_MARRONE_1,
        hex: '#8B4513',
        name: 'Marrone',
      },
    ],
    slides: menColImages,
  },
  {
    id: 13,
    gender: 'male',
    title: 'Palagonite',
    image: palagonite_marrone_MS2407GC10_MARRONE_1,
    description: 'Structured crewneck with a technical detail.',
    price: {
      regular: '99.00',
    },
    colors: [
      {
        id: 'marrone',
        image: palagonite_marrone_MS2407GC10_MARRONE_1,
        hex: '#8B4513',
        name: 'Marrone',
      },
      {
        id: 'avorio',
        image: palagonite_avorio_MS2407GC10_AVORIO_1,
        hex: '#FEF7ED',
        name: 'Avorio',
      },
    ],
    slides: menColImages,
  },
  {
    id: 14,
    gender: 'male',
    title: 'Skarn',
    image: skarn_blu_MS2415GC1_BLU_1,
    description: 'Crewneck in organic cotton with lace-like details',
    price: {
      regular: '85.00',
    },
    colors: [
      {
        id: 'blu',
        image: skarn_blu_MS2415GC1_BLU_1,
        hex: '#1E40AF',
        name: 'Blu',
      },
      {
        id: 'avorio',
        image: skarn_avorio_MS2415GC1_AVORIO_1,
        hex: '#FEF7ED',
        name: 'Avorio',
      },
    ],
    slides: menColImages,
  },
  {
    id: 15,
    gender: 'male',
    title: 'Akrose',
    image: akrose_azzurro_MS2415GC7_AZZURRO_1,
    description: 'Crewneck sweater in organic cotton.',
    price: {
      regular: '72.00',
    },
    colors: [
      {
        id: 'azzurro',
        image: akrose_azzurro_MS2415GC7_AZZURRO_1,
        hex: '#87CEEB',
        name: 'Azzurro',
      },
      {
        id: 'marrone',
        image: akrose_marrone_MS2415GC7_MARRONE_1,
        hex: '#8B4513',
        name: 'Marrone',
      },
      {
        id: 'blu',
        image: akrose_blu_MS2415GC7_BLU_1,
        hex: '#1E40AF',
        name: 'Blu',
      },
      {
        id: 'avorio',
        image: akrose_avorio_MS2415GC7_AVORIO_1,
        hex: '#FEF7ED',
        name: 'Avorio',
      },
    ],
    slides: menColImages,
  },
  {
    id: 16,
    gender: 'male',
    title: 'Lhotse',
    image: lhotse_turtledove_MF2415GC2_Turtledove_1_1,
    description: 'Long-sleeve crew-neck pullover with patch',
    price: {
      regular: '',
    },
    colors: [
      {
        id: 'turtledove',
        image: lhotse_turtledove_MF2415GC2_Turtledove_1_1,
        hex: '#D3D3D3',
        name: 'Turtledove',
      },
      {
        id: 'indigo',
        image: lhotse_indigo_LHOTSE_INDIGO_1,
        hex: '#4B0082',
        name: 'Indigo',
      },
      {
        id: 'asphalt',
        image: lhotse_asphalt_MF2415GC2_Asphalt_1_1,
        hex: '#2F2F2F',
        name: 'Asphalt',
      },
    ],
    slides: menColImages,
  },
  {
    id: 17,
    gender: 'male',
    title: 'Kaolinite',
    image: kaolinite_arancio_MS2407SH14_ARANCIO_1,
    description: 'Organic cotton shorts with perforated details.',
    price: {
      regular: '72.00',
    },
    colors: [
      {
        id: 'arancio',
        image: kaolinite_arancio_MS2407SH14_ARANCIO_1,
        hex: '#FF6B35',
        name: 'Arancio',
      },
      {
        id: 'multicolor',
        image: kaolinite_multicolor_MS2407SH14_MULTICOLOR_1,
        hex: '#FF6B6B',
        name: 'Multicolor',
      },
      {
        id: 'marrone',
        image: kaolinite_marrone_MS2407SH14_MARRONE_1,
        hex: '#8B4513',
        name: 'Marrone',
      },
      {
        id: 'azzurro',
        image: kaolinite_azzurro_MS2407SH14_AZZURRO_1,
        hex: '#87CEEB',
        name: 'Azzurro',
      },
    ],
    slides: menColImages,
  },
  {
    id: 18,
    gender: 'male',
    title: 'Unakite',
    image: unakite_azzurro_MS2415GC2_AZZURRO_1,
    description: 'Organic cotton T-shirt with front logo.',
    price: {
      regular: '62.00',
    },
    colors: [
      {
        id: 'azzurro',
        image: unakite_azzurro_MS2415GC2_AZZURRO_1,
        hex: '#87CEEB',
        name: 'Azzurro',
      },
      {
        id: 'avorio',
        image: unakite_avorio_MS2415GC2_AVORIO_1,
        hex: '#FEF7ED',
        name: 'Avorio',
      },
      {
        id: 'blu',
        image: unakite_blu_MS2415GC2_BLU_1,
        hex: '#1E40AF',
        name: 'Blu',
      },
    ],
    slides: menColImages,
  },
];

export const womenProducts: Product[] = [
  {
    id: 19,
    gender: 'female',
    title: 'Moonmilk',
    image: moonmilk_arancio_WS2407SK13_ARANCIO_1,
    description: 'Gonna in maglia con dettagli traforati.',
    price: {
      regular: '49.00',
    },
    colors: [
      {
        id: 'arancio',
        image: moonmilk_arancio_WS2407SK13_ARANCIO_1,
        hex: '#FF6B35',
        name: 'Arancio',
      },
      {
        id: 'multicolor',
        image: moonmilk_multicolor_WS2407SK13_MULTICOLOR_1,
        hex: '#FF6B6B',
        name: 'Multicolor',
      },
      {
        id: 'azzurro',
        image: moonmilk_azzurro_WS2407SK13_AZZURRO_1,
        hex: '#87CEEB',
        name: 'Azzurro',
      },
    ],
    slides: womenColImages,
  },
  {
    id: 20,
    gender: 'female',
    title: 'Moonmilk',
    image: moonmilk_azzurro_WS2407SK13_AZZURRO_1,
    description: 'Gonna in maglia con dettagli traforati.',
    price: {
      regular: '49.00',
    },
    colors: [
      {
        id: 'azzurro',
        image: moonmilk_azzurro_WS2407SK13_AZZURRO_1,
        hex: '#87CEEB',
        name: 'Azzurro',
      },
      {
        id: 'multicolor',
        image: moonmilk_multicolor_WS2407SK13_MULTICOLOR_1,
        hex: '#FF6B6B',
        name: 'Multicolor',
      },
      {
        id: 'arancio',
        image: moonmilk_arancio_WS2407SK13_ARANCIO_1,
        hex: '#FF6B35',
        name: 'Arancio',
      },
    ],
    slides: womenColImages,
  },
  {
    id: 21,
    gender: 'female',
    title: 'Dunite',
    image: dunite_arancio_WS2415TOP5_ARANCIO_1,
    description: 'Top corto con dettagli traforati.',
    price: {
      regular: '49.00',
    },
    colors: [
      {
        id: 'arancio',
        image: dunite_arancio_WS2415TOP5_ARANCIO_1,
        hex: '#FF6B35',
        name: 'Arancio',
      },
      {
        id: 'blu',
        image: dunite_blu_WS2415TOP5_BLU_1,
        hex: '#1E40AF',
        name: 'Blu',
      },
    ],
    slides: womenColImages,
  },
  {
    id: 22,
    gender: 'female',
    title: 'Dunite',
    image: dunite_blu_WS2415TOP5_BLU_1,
    description: 'Top corto con dettagli traforati.',
    price: {
      regular: '49.00',
    },
    colors: [
      {
        id: 'blu',
        image: dunite_blu_WS2415TOP5_BLU_1,
        hex: '#1E40AF',
        name: 'Blu',
      },
      {
        id: 'arancio',
        image: dunite_arancio_WS2415TOP5_ARANCIO_1,
        hex: '#FF6B35',
        name: 'Arancio',
      },
    ],
    slides: womenColImages,
  },
  {
    id: 23,
    gender: 'female',
    title: 'Lopolith',
    image: lopolith_arancio_WS2405GC18_ARANCIO_1,
    description: 'Maglia in canapa e viscosa bamboo.',
    price: {
      regular: '99.00',
    },
    colors: [
      {
        id: 'arancio',
        image: lopolith_arancio_WS2405GC18_ARANCIO_1,
        hex: '#FF6B35',
        name: 'Arancio',
      },
      {
        id: 'beige',
        image: lopolith_beige_WS2405GC18_BEIGE_1,
        hex: '#F5F5DC',
        name: 'Beige',
      },
      {
        id: 'azzurro',
        image: lopolith_azzurro_WS2405GC18_AZZURRO_1,
        hex: '#87CEEB',
        name: 'Azzurro',
      },
    ],
    slides: womenColImages,
  },
  {
    id: 24,
    gender: 'female',
    title: 'Lopolith',
    image: lopolith_azzurro_WS2405GC18_AZZURRO_1,
    description: 'Maglia in canapa e viscosa bamboo.',
    price: {
      regular: '99.00',
    },
    colors: [
      {
        id: 'azzurro',
        image: lopolith_azzurro_WS2405GC18_AZZURRO_1,
        hex: '#87CEEB',
        name: 'Azzurro',
      },
      {
        id: 'beige',
        image: lopolith_beige_WS2405GC18_BEIGE_1,
        hex: '#F5F5DC',
        name: 'Beige',
      },
      {
        id: 'arancio',
        image: lopolith_arancio_WS2405GC18_ARANCIO_1,
        hex: '#FF6B35',
        name: 'Arancio',
      },
    ],
    slides: womenColImages,
  },
  {
    id: 25,
    gender: 'female',
    title: 'Lopolith',
    image: lopolith_beige_WS2405GC18_BEIGE_1,
    description: 'Maglia in canapa e viscosa bamboo.',
    price: {
      regular: '99.00',
    },
    colors: [
      {
        id: 'beige',
        image: lopolith_beige_WS2405GC18_BEIGE_1,
        hex: '#F5F5DC',
        name: 'Beige',
      },
      {
        id: 'azzurro',
        image: lopolith_azzurro_WS2405GC18_AZZURRO_1,
        hex: '#87CEEB',
        name: 'Azzurro',
      },
      {
        id: 'arancio',
        image: lopolith_arancio_WS2405GC18_ARANCIO_1,
        hex: '#FF6B35',
        name: 'Arancio',
      },
    ],
    slides: womenColImages,
  },
  {
    id: 26,
    gender: 'female',
    title: 'Kaolinite',
    image: kaolinite_marrone_WS2415DR4_MARRONE_1,
    description: 'Abito smanicato con dettagli traforati.',
    price: {
      regular: '72.00',
    },
    colors: [
      {
        id: 'marrone',
        image: kaolinite_marrone_WS2415DR4_MARRONE_1,
        hex: '#8B4513',
        name: 'Marrone',
      },
      {
        id: 'azzurro',
        image: kaolinite_azzurro_WS2415DR4_AZZURRO_1,
        hex: '#87CEEB',
        name: 'Azzurro',
      },
    ],
    slides: womenColImages,
  },
  {
    id: 27,
    gender: 'female',
    title: 'Kaolinite',
    image: kaolinite_azzurro_WS2415DR4_AZZURRO_1,
    description: 'Abito smanicato con dettagli traforati.',
    price: {
      regular: '72.00',
    },
    colors: [
      {
        id: 'azzurro',
        image: kaolinite_azzurro_WS2415DR4_AZZURRO_1,
        hex: '#87CEEB',
        name: 'Azzurro',
      },
      {
        id: 'marrone',
        image: kaolinite_marrone_WS2415DR4_MARRONE_1,
        hex: '#8B4513',
        name: 'Marrone',
      },
    ],
    slides: womenColImages,
  },
  {
    id: 28,
    gender: 'female',
    title: 'Grisein',
    image: grisein_blu_WS2407PA15_BLU_1,
    description: 'Pantalone morbido con tasche.',
    price: {
      regular: '89.00',
    },
    colors: [
      {
        id: 'blu',
        image: grisein_blu_WS2407PA15_BLU_1,
        hex: '#1E40AF',
        name: 'Blu',
      },
      {
        id: 'marrone',
        image: grisein_marrone_WS2407PA15_MARRONE_1,
        hex: '#8B4513',
        name: 'Marrone',
      },
    ],
    slides: womenColImages,
  },
  {
    id: 29,
    gender: 'female',
    title: 'Grisein',
    image: grisein_marrone_WS2407PA15_MARRONE_1,
    description: 'Pantalone morbido con tasche.',
    price: {
      regular: '89.00',
    },
    colors: [
      {
        id: 'marrone',
        image: grisein_marrone_WS2407PA15_MARRONE_1,
        hex: '#8B4513',
        name: 'Marrone',
      },
      {
        id: 'blu',
        image: grisein_blu_WS2407PA15_BLU_1,
        hex: '#1E40AF',
        name: 'Blu',
      },
    ],
    slides: womenColImages,
  },
  {
    id: 30,
    gender: 'female',
    title: 'Unakite',
    image: unakite_avorio_WS2415GC2_AVORIO_1,
    description: 'T-shirt minimal con logo ricamato.',
    price: {
      regular: '62.00',
    },
    colors: [
      {
        id: 'avorio',
        image: unakite_avorio_WS2415GC2_AVORIO_1,
        hex: '#FEF7ED',
        name: 'Avorio',
      },
      {
        id: 'blu',
        image: unakite_blu_WS2415GC2_BLU_1,
        hex: '#1E40AF',
        name: 'Blu',
      },
      {
        id: 'azzurro',
        image: unakite_azzurro_WS2415GC2_AZZURRO_1,
        hex: '#87CEEB',
        name: 'Azzurro',
      },
    ],
    slides: womenColImages,
  },
  {
    id: 31,
    gender: 'female',
    title: 'Unakite',
    image: unakite_azzurro_WS2415GC2_AZZURRO_1,
    description: 'T-shirt minimal con logo ricamato.',
    price: {
      regular: '62.00',
    },
    colors: [
      {
        id: 'azzurro',
        image: unakite_azzurro_WS2415GC2_AZZURRO_1,
        hex: '#87CEEB',
        name: 'Azzurro',
      },
      {
        id: 'blu',
        image: unakite_blu_WS2415GC2_BLU_1,
        hex: '#1E40AF',
        name: 'Blu',
      },
      {
        id: 'avorio',
        image: unakite_avorio_WS2415GC2_AVORIO_1,
        hex: '#FEF7ED',
        name: 'Avorio',
      },
    ],
    slides: womenColImages,
  },
  {
    id: 32,
    gender: 'female',
    title: 'Unakite',
    image: unakite_blu_WS2415GC2_BLU_1,
    description: 'T-shirt minimal con logo ricamato.',
    price: {
      regular: '62.00',
    },
    colors: [
      {
        id: 'blu',
        image: unakite_blu_WS2415GC2_BLU_1,
        hex: '#1E40AF',
        name: 'Blu',
      },
      {
        id: 'azzurro',
        image: unakite_azzurro_WS2415GC2_AZZURRO_1,
        hex: '#87CEEB',
        name: 'Azzurro',
      },
      {
        id: 'avorio',
        image: unakite_avorio_WS2415GC2_AVORIO_1,
        hex: '#FEF7ED',
        name: 'Avorio',
      },
    ],
    slides: womenColImages,
  },
  {
    id: 33,
    gender: 'female',
    title: 'Dolomia',
    image: dolomia_arancio_WS2415GC3_ARANCIO_1,
    description: 'T-shirt ampia con grafica ispirata alla montagna.',
    price: {
      regular: '69.00',
    },
    colors: [
      {
        id: 'arancio',
        image: dolomia_arancio_WS2415GC3_ARANCIO_1,
        hex: '#FF6B35',
        name: 'Arancio',
      },
      {
        id: 'marrone',
        image: dolomia_marrone_WS2415GC3_MARRONE_1,
        hex: '#8B4513',
        name: 'Marrone',
      },
    ],
    slides: womenColImages,
  },
  {
    id: 34,
    gender: 'female',
    title: 'Dolomia',
    image: dolomia_marrone_WS2415GC3_MARRONE_1,
    description: 'T-shirt ampia con grafica ispirata alla montagna.',
    price: {
      regular: '69.00',
    },
    colors: [
      {
        id: 'marrone',
        image: dolomia_marrone_WS2415GC3_MARRONE_1,
        hex: '#8B4513',
        name: 'Marrone',
      },
      {
        id: 'arancio',
        image: dolomia_arancio_WS2415GC3_ARANCIO_1,
        hex: '#FF6B35',
        name: 'Arancio',
      },
    ],
    slides: womenColImages,
  },
];
