import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const images = [
  // { src: '/images/uploads/IMG_20260208_094749.jpg', alt: 'Gallery Image 1' },
  // { src: '/images/uploads/IMG_20260208_094756.png', alt: 'Gallery Image 2' },
  { src: '/images/uploads/IMG_20260208_094805.jpg', alt: 'Gallery Image 3' },
  // { src: '/images/uploads/IMG_20260208_094812.png', alt: 'Gallery Image 4' },
  // { src: '/images/uploads/IMG_20260208_094815.jpg', alt: 'Gallery Image 5' },
  { src: '/images/uploads/IMG_20260208_094821.jpg', alt: 'Gallery Image 6' },
  { src: '/images/uploads/IMG_20260208_094825.jpg', alt: 'Gallery Image 7' },
  { src: '/images/uploads/IMG_20260208_094830.jpg', alt: 'Gallery Image 8' },
  { src: '/images/uploads/IMG_20260208_094834.jpg', alt: 'Gallery Image 9' },
]

function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  function goToPrevious() {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  function goToNext() {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  return (
    <section className="py-24 bg-gradient-to-br from-orange-400 via-orange-300 to-pink-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-md">Our Journey in Photos</h2>
          <p className="text-white/90 max-w-2xl mx-auto">
            Moments of hope, resilience, and community from the Tayloring Rays of Hope family.
          </p>
        </div>

        {/* Main Carousel - Taller aspect ratio */}
        <div className="relative max-w-2xl mx-auto">
          <div className="relative aspect-[3/4] bg-white/20 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-white/30">
            {images.map((image, index) => (
              <img
                key={image.src}
                src={image.src}
                alt={image.alt}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
            
            {/* Navigation arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-troh-dark" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-troh-dark" />
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-white w-8 shadow-lg' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        {/* <div className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center drop-shadow-md">Full Gallery</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div
                key={image.src}
                onClick={() => setCurrentIndex(index)}
                className="relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer group border-2 border-white/30"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className={`absolute inset-0 border-4 transition-colors ${
                  index === currentIndex ? 'border-white shadow-lg' : 'border-transparent'
                }`} />
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  )
}

export default ImageCarousel
