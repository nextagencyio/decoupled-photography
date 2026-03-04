'use client'

import { Camera, Aperture, Image, Sun, Film, Star } from 'lucide-react'

const reasons = [
  {
    icon: Camera,
    title: 'Award-Winning',
    description: 'Recognized by industry leaders for creative excellence and technical mastery in photography.',
  },
  {
    icon: Aperture,
    title: 'Premium Equipment',
    description: 'State-of-the-art cameras, lenses, and lighting for stunning image quality every time.',
  },
  {
    icon: Image,
    title: 'Creative Vision',
    description: 'A unique artistic perspective that transforms ordinary moments into extraordinary images.',
  },
  {
    icon: Sun,
    title: 'Natural Light Expert',
    description: 'Mastery of natural and studio lighting to create the perfect mood for every shoot.',
  },
  {
    icon: Film,
    title: 'Full Post-Production',
    description: 'Professional editing, retouching, and color grading included with every session.',
  },
  {
    icon: Star,
    title: 'Client Focused',
    description: 'A personalized approach ensuring your vision is captured exactly as you imagine.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            Why Choose Lumen Studio
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We bring artistic vision and technical excellence to every frame we capture.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason) => {
            const Icon = reason.icon
            return (
              <div
                key={reason.title}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-primary-700" />
                </div>
                <h3 className="font-display text-xl font-bold text-primary-900 mb-3">
                  {reason.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
