import Head from 'next/head';
import { usePathname } from 'next/navigation';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;           // for social sharing
  author?: string;
  canonical?: string;       // preferred URL
}

export default function SEO({
  title,
  description,
  keywords = [],
  image,
  author = 'wallscreet',
  canonical,
}: SEOProps) {
  const pathname = usePathname();
  const siteUrl = 'https://www.discorover.com';
  const url = canonical || `${siteUrl}${pathname}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      <meta name="author" content={author} />
      <link rel="canonical" href={url} />

      {/* Open Graph / social sharing */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter card */}
      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Head>
  );
}
