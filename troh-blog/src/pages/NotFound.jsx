import { Link } from 'react-router-dom'
import { Home, Search } from 'lucide-react'

function NotFound() {
  return (
    <div className="pt-16 min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <div className="text-8xl font-bold text-troh-primary mb-4">404</div>
        <h1 className="text-3xl font-bold text-troh-dark mb-2">Page not found</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-troh-primary text-white rounded-lg font-medium hover:bg-red-500 transition-colors"
          >
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Link>
          <Link
            to="/blog"
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-troh-primary text-troh-primary rounded-lg font-medium hover:bg-troh-primary hover:text-white transition-colors"
          >
            <Search className="w-4 h-4 mr-2" />
            Browse Journey
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
