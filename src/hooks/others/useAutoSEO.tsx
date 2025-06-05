import { useLocation } from 'react-router';
import { SEO } from '@/components/others/SEO';

const seoData = {
  '/': {
    title: 'OKKE Knitwear - Premium Italian Fashion',
    description:
      'Discover OKKE Knitwear premium collection. High-quality Italian fashion with sustainable materials and timeless design.',
    keywords:
      'OKKE knitwear, Italian fashion, premium clothing, sustainable fashion',
  },
  '/product-category/menswear-collection': {
    title: "Men's Collection - OKKE Knitwear",
    description:
      "Explore OKKE's premium men's knitwear collection. Italian craftsmanship meets modern design.",
    keywords:
      'men knitwear, Italian menswear, premium men clothing, OKKE men collection',
  },
  '/product-category/womenswear-collection': {
    title: "Women's Collection - OKKE Knitwear",
    description:
      "Discover OKKE's elegant women's knitwear collection. Timeless pieces for the modern woman.",
    keywords:
      'women knitwear, Italian womenswear, premium women clothing, OKKE women collection',
  },
  '/everest-okke-limited': {
    title: 'Everest Okke Limited - OKKE Knitwear',
    description:
      'Explore the Everest Okke Limited collection. Exclusive knitwear inspired by the spirit of adventure.',
    keywords: 'Everest Okke, limited edition, exclusive knitwear, OKKE limited',
  },
  '/okkeworld': {
    title: 'OKKE World - OKKE Knitwear',
    description:
      'Welcome to OKKE World. Discover our brand story, values, and commitment to sustainability.',
    keywords: 'OKKE World, brand story, sustainability, Italian fashion',
  },
  '/contacts': {
    title: 'Contact Us - OKKE Knitwear',
    description:
      'Get in touch with OKKE Knitwear. Customer service available Monday to Thursday.',
    keywords: 'contact OKKE, customer service, Italian fashion contact',
  },
  '/privacy-policy': {
    title: 'Privacy Policy - OKKE Knitwear',
    description:
      'Read OKKE Knitwear privacy policy and data protection information.',
    keywords: 'OKKE privacy policy, data protection, privacy rights',
    noIndex: true,
  },
  '/terms-of-sale': {
    title: 'Terms of Sale - OKKE Knitwear',
    description: 'Read OKKE Knitwear terms of sale and purchase conditions.',
    keywords: 'OKKE terms of sale, purchase conditions, sales terms',
    noIndex: true,
  },
  '/password-recovery': {
    title: 'Password Recovery - OKKE Knitwear',
    description: 'Recover your password for OKKE Knitwear account.',
    keywords: 'OKKE password recovery, account recovery, reset password',
    noIndex: true,
  },
};

export const useAutoSEO = () => {
  const location = useLocation();
  const currentSEO =
    seoData[location.pathname as keyof typeof seoData] || seoData['/'];

  return <SEO {...currentSEO} />;
};
