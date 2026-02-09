import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ShoppingBag } from 'lucide-react'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/blog', label: 'Stories' },
  { to: '/about', label: 'About' },
]

function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-troh-dark/95 backdrop-blur-md shadow-xl' : 'bg-troh-dark'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            {/* <span className="text-2xl group-hover:scale-110 transition-transform">🌫️🌒</span> */}
            <div>
              {/* <h1 className="text-xl font-bold text-white tracking-tight">TroH</h1> */}
              <h1 className="text-xl text-gray-400 hidden font-bold sm:block">Tayloring Rays of Hope</h1>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  location.pathname === link.to
                    ? 'text-white bg-white/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {/* Shopify Store Link */}
            <a
              href={`https://${import.meta.env.VITE_SHOPIFY_STORE_DOMAIN}`}
              rel="noopener noreferrer"
              className="ml-2 flex items-center gap-2 px-4 py-2 bg-troh-gold hover:bg-red-600 text-white rounded-md text-sm font-medium transition-all hover:scale-105"
            >
              <ShoppingBag className="w-4 h-4" />
              Store
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <nav className="md:hidden pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.to
                    ? 'text-white bg-troh-gold'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`https://${import.meta.env.VITE_SHOPIFY_STORE_DOMAIN}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 px-4 py-3 bg-troh-gold text-white rounded-md text-base font-medium"
            >
              <ShoppingBag className="w-4 h-4" />
              Visit Store
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
