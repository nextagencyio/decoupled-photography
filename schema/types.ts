// Auto-generated TypeScript types from Drupal GraphQL schema.
// Run `decoupled-cli schema sync` to regenerate.

export interface NodeGallery {
  id: string;
  body: { value: string; summary?: string };
  image: { url: string; alt: string; width: number; height: number };
  imageCount: number;
  location: string;
  path: string;
  photographyStyle: any[];
  shootDate: { time: string };
  title: string;
}

export interface NodeHomepage {
  id: string;
  ctaDescription: { value: string };
  ctaPrimary: string;
  ctaSecondary: string;
  ctaTitle: string;
  featuredGalleriesTitle: string;
  heroDescription: { value: string };
  heroSubtitle: string;
  heroTitle: string;
  path: string;
  statsItems: any[];
  title: string;
}

export interface ParagraphStatItem {
  id: string;
  label: string;
  number: string;
}

export interface NodePage {
  id: string;
  body: { value: string; summary?: string };
  path: string;
  title: string;
}

export interface NodeService {
  id: string;
  body: { value: string; summary?: string };
  duration: string;
  image: { url: string; alt: string; width: number; height: number };
  path: string;
  serviceType: any[];
  startingPrice: string;
  title: string;
}

export interface NodeTestimonial {
  id: string;
  body: { value: string; summary?: string };
  clientName: string;
  path: string;
  photo: { url: string; alt: string; width: number; height: number };
  rating: number;
  serviceTypeName: string;
  title: string;
}
