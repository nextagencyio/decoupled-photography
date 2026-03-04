'use client'

import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { GET_FEATURED_GALLERIES } from '@/lib/queries'
import { DrupalHomepage, DrupalGallery } from '@/lib/types'
import { MapPin, Images, ArrowRight } from 'lucide-react'
import ResponsiveImage from './ResponsiveImage'

interface GalleriesPreviewProps {
  homepageContent?: DrupalHomepage | null
}

interface FeaturedGalleriesData {
  nodeGalleries: { nodes: DrupalGallery[] }
}

export default function GalleriesPreview({ homepageContent }: GalleriesPreviewProps) {
  const { data, loading, error } = useQuery<FeaturedGalleriesData>(GET_FEATURED_GALLERIES)
  const galleries = data?.nodeGalleries?.nodes || []
  const sectionTitle = homepageContent?.featuredGalleriesTitle || 'Recent Work'

  if (loading) {
    return (
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{sectionTitle}</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (<div key={i} className="bg-white rounded-xl shadow-sm animate-pulse"><div className="h-64 bg-gray-200 rounded-t-xl" /><div className="p-6"><div className="h-6 bg-gray-200 rounded w-3/4 mb-3" /><div className="h-4 bg-gray-200 rounded w-full" /></div></div>))}
          </div>
        </div>
      </section>
    )
  }

  if (error || galleries.length === 0) return null

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{sectionTitle}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Explore our latest photography collections and see the artistry behind every frame.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {galleries.map((gallery) => (
            <Link key={gallery.id} href={gallery.path || `/gallery/${gallery.id}`} className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative h-64 bg-gradient-to-br from-stone-200 to-stone-300">
                {gallery.image?.url ? (
                  <ResponsiveImage src={gallery.image.url} alt={gallery.image.alt || gallery.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" variations={gallery.image.variations} targetWidth={400} />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center"><Images className="w-16 h-16 text-stone-400" /></div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-stone-700 transition-colors">{gallery.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  {gallery.location && <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /><span>{gallery.location}</span></div>}
                  {gallery.imageCount && <div className="flex items-center gap-1"><Images className="w-4 h-4" /><span>{gallery.imageCount} photos</span></div>}
                </div>
                <div className="flex items-center text-stone-700 font-medium group-hover:gap-2 transition-all">View Gallery<ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" /></div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/gallery" className="inline-flex items-center px-8 py-4 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors font-semibold">View All Work<ArrowRight className="w-5 h-5 ml-2" /></Link>
        </div>
      </div>
    </section>
  )
}
