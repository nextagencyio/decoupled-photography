// Base node type
export interface DrupalNode {
  id: string
  title: string
  path: string
  created: { timestamp: number }
  changed: { timestamp: number }
}

export interface DrupalStatItem {
  id: string
  number: string
  label: string
}

export interface DrupalHomepage extends DrupalNode {
  heroTitle?: string
  heroSubtitle?: string
  heroDescription?: { processed: string }
  statsItems?: DrupalStatItem[]
  featuredGalleriesTitle?: string
  ctaTitle?: string
  ctaDescription?: { processed: string }
  ctaPrimary?: string
  ctaSecondary?: string
}

export interface HomepageData {
  nodeHomepages: { nodes: DrupalHomepage[] }
}

export interface DrupalGallery extends DrupalNode {
  body?: { processed: string; summary?: string }
  photographyStyle?: DrupalTerm[]
  shootDate?: { timestamp: number }
  location?: string
  image?: DrupalImage
  imageCount?: number
}

export interface GalleriesData {
  nodeGalleries: { nodes: DrupalGallery[] }
}

export interface DrupalService extends DrupalNode {
  body?: { processed: string; summary?: string }
  serviceType?: DrupalTerm[]
  startingPrice?: string
  duration?: string
  image?: DrupalImage
}

export interface ServicesData {
  nodeServices: { nodes: DrupalService[] }
}

export interface DrupalTestimonial extends DrupalNode {
  body?: { processed: string }
  clientName?: string
  serviceTypeName?: string
  photo?: DrupalImage
  rating?: number
}

export interface TestimonialsData {
  nodeTestimonials: { nodes: DrupalTestimonial[] }
}

export interface DrupalPage extends DrupalNode {
  body?: { processed: string }
}

export interface DrupalImage {
  url: string
  alt?: string
  width?: number
  height?: number
  variations?: Array<{ name: string; url: string; width: number; height: number }>
}

export interface DrupalTerm {
  id: string
  name: string
  path?: string
}

export type FeatureColor = 'blue' | 'green' | 'purple' | 'yellow' | 'red' | 'indigo'
