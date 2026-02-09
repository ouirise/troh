import { urlFor } from '../lib/sanity'

function Image({ src, alt, className, width = 800, height, sanity = false }) {
  // Sanity image with CDN transforms
  if (sanity && src) {
    const imageUrl = urlFor(src).width(width)
    if (height) imageUrl.height(height)
    
    return (
      <img
        src={imageUrl.url()}
        alt={alt}
        className={className}
        loading="lazy"
      />
    )
  }

  // Regular image (from public/ or external CDN)
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={(e) => {
        // Fallback to gradient placeholder
        e.target.style.display = 'none'
        e.target.nextSibling.style.display = 'flex'
      }}
    />
  )
}

export default Image
