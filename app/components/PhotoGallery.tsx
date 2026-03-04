'use client'

const photos = [
  {
    src: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=600&q=80&fit=crop',
    alt: 'Portrait photography',
  },
  {
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80&fit=crop',
    alt: 'Wedding photography',
  },
  {
    src: 'https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=600&q=80&fit=crop',
    alt: 'Landscape photography',
  },
  {
    src: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&q=80&fit=crop',
    alt: 'Event photography',
  },
]

export default function PhotoGallery() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            Recent Work
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A glimpse into our latest photography sessions and projects.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((photo, i) => (
            <div key={i} className="relative overflow-hidden rounded-xl group aspect-square">
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
