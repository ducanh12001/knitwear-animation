import { useLocation } from 'react-router';
import { SEO } from '@/components/others/SEO';

const seoData = {
  '/': {
    title: 'AKKE Knitwear - Premium Italian Fashion',
    description:
      'Discover AKKE Knitwear premium collection. High-quality Italian fashion with sustainable materials and timeless design.',
    keywords:
      'AKKE knitwear, Italian fashion, premium clothing, sustainable fashion',
  },
  '/product-category/menswear-collection': {
    title: "Men's Collection - AKKE Knitwear",
    description:
      "Explore AKKE's premium men's knitwear collection. Italian craftsmanship meets modern design.",
    keywords:
      'men knitwear, Italian menswear, premium men clothing, AKKE men collection',
  },
  '/product-category/womenswear-collection': {
    title: "Women's Collection - AKKE Knitwear",
    description:
      "Discover AKKE's elegant women's knitwear collection. Timeless pieces for the modern woman.",
    keywords:
      'women knitwear, Italian womenswear, premium women clothing, AKKE women collection',
  },
  '/everest-akke-limited': {
    title: 'Everest Akke Limited - AKKE Knitwear',
    description:
      'Explore the Everest Akke Limited collection. Exclusive knitwear inspired by the spirit of adventure.',
    keywords: 'Everest Akke, limited edition, exclusive knitwear, AKKE limited',
  },
  '/akkeworld': {
    title: 'AKKE World - AKKE Knitwear',
    description:
      'Welcome to AKKE World. Discover our brand story, values, and commitment to sustainability.',
    keywords: 'AKKE World, brand story, sustainability, Italian fashion',
  },
  '/contacts': {
    title: 'Contact Us - AKKE Knitwear',
    description:
      'Get in touch with AKKE Knitwear. Customer service available Monday to Thursday.',
    keywords: 'contact AKKE, customer service, Italian fashion contact',
  },
  '/privacy-policy': {
    title: 'Privacy Policy - AKKE Knitwear',
    description:
      'Read AKKE Knitwear privacy policy and data protection information.',
    keywords: 'AKKE privacy policy, data protection, privacy rights',
    noIndex: true,
  },
  '/terms-of-sale': {
    title: 'Terms of Sale - AKKE Knitwear',
    description: 'Read AKKE Knitwear terms of sale and purchase conditions.',
    keywords: 'AKKE terms of sale, purchase conditions, sales terms',
    noIndex: true,
  },
  '/password-recovery': {
    title: 'Password Recovery - AKKE Knitwear',
    description: 'Recover your password for AKKE Knitwear account.',
    keywords: 'AKKE password recovery, account recovery, reset password',
    noIndex: true,
  },
};

export const useAutoSEO = () => {
  const location = useLocation();
  const currentSEO =
    seoData[location.pathname as keyof typeof seoData] || seoData['/'];

  return <SEO {...currentSEO} />;
};
