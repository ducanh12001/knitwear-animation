import { Helmet } from 'react-helmet';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'product' | 'article';
  noIndex?: boolean;
}

export const SEO: React.FC<SEOProps> = ({
  title = 'OKKE Knitwear - Premium Italian Fashion',
  description = 'Discover OKKE Knitwear premium collection. High-quality Italian fashion with sustainable materials and timeless design.',
  keywords = 'OKKE knitwear, Italian fashion, premium clothing, sustainable fashion, luxury knitwear',
  image = 'https://yourdomain.com/og-image.jpg',
  url = window.location.href,
  type = 'website',
  noIndex = false,
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="OKKE Knitwear" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <link rel="canonical" href={url} />
    </Helmet>
  );
};
