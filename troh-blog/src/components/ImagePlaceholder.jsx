import { Sun } from 'lucide-react'

function ImagePlaceholder({ text = 'TROH', className = '' }) {
  return (
    <div 
      className={`bg-gradient-to-br from-troh-primary to-troh-accent flex items-center justify-center ${className}`}
      style={{ display: 'none' }} // Shown when image fails
    >
      <div className="text-center">
        <Sun className="w-12 h-12 text-troh-gold mx-auto mb-2" />
        <span className="text-gray-400 text-sm">{text}</span>
      </div>
    </div>
  )
}

export default ImagePlaceholder
