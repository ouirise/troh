import { Link } from 'react-router-dom'
import { Heart, Twitter, Instagram, Linkedin } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-600 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Tayloring Rays of Hope — A light in the darkness for those facing life-changing diagnoses.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Founded by Elaine Taylor<br/>
              501(c)(3) Nonprofit Organization
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="w-10 h-10 bg-troh-primary/10 rounded-full flex items-center justify-center hover:bg-troh-primary hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-troh-primary/10 rounded-full flex items-center justify-center hover:bg-troh-primary hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-troh-primary/10 rounded-full flex items-center justify-center hover:bg-troh-primary hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-troh-dark font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-troh-primary transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-troh-primary transition-colors">My Journey</Link></li>
              <li><Link to="/about" className="hover:text-troh-primary transition-colors">About</Link></li>
              <li><a href={`https://${import.meta.env.VITE_SHOPIFY_STORE_DOMAIN}`} className="hover:text-troh-primary transition-colors font-semibold text-troh-primary">Shop (Support Our Mission)</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-troh-dark font-semibold mb-4">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/colors" className="hover:text-troh-primary transition-colors">Colors of Cancer</Link></li>
              <li><Link to="/blog" className="hover:text-troh-primary transition-colors">Blog</Link></li>
              <li><Link to="/about" className="hover:text-troh-primary transition-colors">About Mrs. Taylor</Link></li>
              <li><Link to="/admin" className="hover:text-troh-primary transition-colors text-troh-primary font-semibold">Admin Panel</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-troh-dark font-semibold mb-4">Connect</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-troh-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-troh-primary transition-colors">Newsletter</a></li>
              <li><a href="#" className="hover:text-troh-primary transition-colors">Volunteer</a></li>
              <li><a href="#" className="hover:text-troh-primary transition-colors">Partner With Us</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 grid md:grid-cols-2 gap-6 items-start">
          <div>
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Tayloring Rays of Hope. 501(c)(3) Nonprofit.
            </p>
            <p className="text-xs text-gray-500 mt-1">Founded by Elaine Taylor • EIN Available Upon Request</p>
            <p className="text-xs text-troh-primary/60 mt-1">Made with love for Mrs. Taylor 💜</p>
          </div>
          <div className="md:text-right">
            <p className="text-xs text-gray-400">
              Built with care by <a href="https://ouirise.ai" target="_blank" rel="noopener noreferrer" className="text-troh-primary/70 hover:text-troh-primary transition-colors">Ouirise</a> & <a href="https://www.moonshot.ai" target="_blank" rel="noopener noreferrer" className="text-troh-primary/70 hover:text-troh-primary transition-colors">Moonshot AI</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
