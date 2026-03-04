'use client'

import Header from './Header'
import HeroSection from './HeroSection'
import StatsSection from './StatsSection'
import CTASection from './CTASection'
import WhyChooseUs from './WhyChooseUs'
import PhotoGallery from './PhotoGallery'
import FeaturedGalleries from './FeaturedGalleries'
import ErrorBoundary from './ErrorBoundary'
import { DrupalHomepage } from '@/lib/types'
import { Camera } from 'lucide-react'

interface HomepageRendererProps {
  homepageContent: DrupalHomepage | null | undefined
}

export default function HomepageRenderer({ homepageContent }: HomepageRendererProps) {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <ErrorBoundary>
        <HeroSection homepageContent={homepageContent} />
      </ErrorBoundary>

      <ErrorBoundary>
        <StatsSection homepageContent={homepageContent} />
      </ErrorBoundary>

      <ErrorBoundary>
        <FeaturedGalleries />
      </ErrorBoundary>

      <ErrorBoundary>
        <WhyChooseUs />
      </ErrorBoundary>

      <ErrorBoundary>
        <PhotoGallery />
      </ErrorBoundary>

      <ErrorBoundary>
        <CTASection homepageContent={homepageContent} />
      </ErrorBoundary>

      <footer className="border-t border-gray-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-primary-900 rounded-md flex items-center justify-center">
                <Camera className="w-4 h-4 text-accent-400" />
              </div>
              <span className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Lumen Studio. All rights reserved.
              </span>
            </div>
            <nav className="flex items-center space-x-6 text-sm text-gray-500">
              <a href="/gallery" className="hover:text-primary-700 transition-colors">Gallery</a>
              <a href="/services" className="hover:text-primary-700 transition-colors">Services</a>
              <a href="/testimonials" className="hover:text-primary-700 transition-colors">Testimonials</a>
              <a href="/about" className="hover:text-primary-700 transition-colors">About</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
